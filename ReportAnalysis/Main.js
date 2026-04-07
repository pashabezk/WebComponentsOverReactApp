import fs from "fs";
import path from "path";
import {saveReport} from "../MetricsCollection/Utils/SaveReport.js";

const REPORT_FILENAME = "Report_from_2025_06_26__00_14.json";
const REPORTS_DIR = path.join("MetricsCollection", "Reports");

const OUTPUT_FILENAME = REPORT_FILENAME.split(".json")[0] + "_statistics.json";

const report = fs.readFileSync(path.join(REPORTS_DIR, REPORT_FILENAME), "utf8");

const resultsFromReport = JSON.parse(report).results;

const statistics = {};

Object.entries(resultsFromReport).forEach(([experiment, operations]) => {
	const experimentStatistics = {};
	Object.entries(operations).forEach(([operation, measurements]) => {
		const amount = measurements.length;
		const sum = measurements.reduce((sum, n) => sum + n, 0);
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
		Object.entries(metrics).forEach(([metric, value]) => {
			metrics[metric] = parseFloat(value.toFixed(3));
		});

		experimentStatistics[operation] = metrics;
	});
	statistics[experiment] = experimentStatistics;
});

console.log(statistics);

await saveReport({info: {for: REPORT_FILENAME}, statistics}, OUTPUT_FILENAME);
