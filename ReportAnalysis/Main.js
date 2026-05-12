import fs from "fs";
import path from "path";
import {REPORTS_DIR} from "../MetricsCollection/Constants.js";
import {saveReport} from "../MetricsCollection/Utils/SaveReport.js";
import {OUTPUT_FILENAME, PCA_FORMULAS_FILENAME, REPORT_FILENAME} from "./Config.js";

/**
 * Apply mapFn to all object values
 * @param obj {object}
 * @param mapFn {(value: unknown) => unknown}
 * @return {Record<PropertyKey, unknown>}
 */
const mapValues = (obj, mapFn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, mapFn(v)]));

/**
 * Round value
 * @param value {number}
 * @param fractionDigits {number?}
 * @return {number}
 */
const round = (value, fractionDigits = 3) => parseFloat(value.toFixed(fractionDigits));

/**
 * Round all object values
 * @param obj {Record<PropertyKey, number>}
 * @param fractionDigits {number?}
 * @return {Record<PropertyKey, number>}
 */
const roundValues = (obj, fractionDigits = 3) => mapValues(obj, (v) => round(v, fractionDigits));

/**
 * Calculates array sum
 * @param arr {number[]}
 * @return {number}
 */
const calculateSum = (arr) => arr.reduce((sum, n) => sum + n, 0);

/**
 * Calculates array average
 * @param arr {number[]}
 * @return {number}
 */
const calculateAvg = (arr) => calculateSum(arr) / arr.length;

/**
 * Calculates web component value gain over react
 * @param reactValue {number}
 * @param wcValue {number}
 * @return {number} gain in percent
 */
const calculateGain = (reactValue, wcValue) => ((reactValue - wcValue) / reactValue) * 100;

const report = fs.readFileSync(path.join(REPORTS_DIR, REPORT_FILENAME), "utf8");
const pcaFormulas = fs.readFileSync(path.join(REPORTS_DIR, PCA_FORMULAS_FILENAME), "utf8");

const {results, lighthouseResults} = JSON.parse(report);

//#region analyze interaction metrics

const statistics = {};

Object.entries(results).forEach(([experiment, operations]) => {
	const experimentStatistics = {};
	Object.entries(operations).forEach(([operation, measurements]) => {
		const amount = measurements.length;
		const sum = calculateSum(measurements);
		const average = sum / amount;
		const sortedMeasurements = measurements.toSorted();
		const median = amount % 2 === 0
			? (sortedMeasurements[amount / 2 - 1] + sortedMeasurements[amount / 2]) / 2
			: sortedMeasurements[Math.ceil(amount / 2)];
		const min = sortedMeasurements[0];
		const max = sortedMeasurements[amount - 1];
		const dispersion = (measurements.reduce((sum, n) => sum + (n * n), 0) / amount) - (average * average);
		const standardDeviation = Math.sqrt(dispersion);

		const metrics = {min, max, average, median, dispersion, standardDeviation};
		experimentStatistics[operation] = roundValues(metrics);
	});
	statistics[experiment] = experimentStatistics;
});

//#endregion

//#region analyze lighthouse metrics

const lighthouseAggregation = {};

Object.entries(lighthouseResults).forEach(([experiment, measurements]) => {
	const initialValues = mapValues(measurements[0], () => []);
	const groupedByMetric = measurements.reduce((grouped, values) => {
		Object.entries(values).forEach(([metricName, metricValue]) => {
			grouped[metricName].push(metricValue);
		});
		return grouped;
	}, initialValues);
	lighthouseAggregation[experiment] = mapValues(groupedByMetric, calculateAvg);
});

//#endregion

//#region calculate gain

const metricNames = Object.keys(statistics.react);
const metricLoadings = Object.fromEntries(JSON.parse(pcaFormulas)[0].loadings.map(({name, value}) => [name, value]));
const metricLoadingsSum = calculateSum(Object.values(metricLoadings));
const weights = mapValues(metricLoadings, (value) => value / metricLoadingsSum);
const gainByMetric = Object.fromEntries(metricNames.map(metricName => [metricName, calculateGain(statistics.react[metricName].average, statistics.webComponents[metricName].average)]));
const totalGain = metricNames.reduce((sum, metricName) => sum + (gainByMetric[metricName] * weights[metricName]), 0);

const lighthouseGain = -calculateGain(lighthouseAggregation.react.performanceScore, lighthouseAggregation.webComponents.performanceScore);

//#endregion

await saveReport({
	info: {for: REPORT_FILENAME},
	interactionMetricsAggregation: statistics,
	interactionMetricsGain: {
		gainByMetric: roundValues(gainByMetric),
		weights: roundValues(weights),
		totalGain: round(totalGain),
	},
	lighthouseAggregation: mapValues(lighthouseAggregation, roundValues),
	lighthouseGain: round(lighthouseGain),
}, OUTPUT_FILENAME);
