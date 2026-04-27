import {PCA} from 'ml-pca';
import {Logger} from "../MetricsCollection/Utils/Logger.js";

// PCA - principal component analysis

/**
 * @typedef {Object} PrincipalComponent
 * @property {string} componentName
 * @property {string} explainedVariance
 * @property {[string, number][]} coefficients initial metric name with coefficient in PC
 * @property {number} constant free term in the formula
 * @property {string} formula stringified formula
 */

/**
 * Convert proportion to percentage
 * @param n {number}
 * @return {string}
 * @example toPercent(0.34671); // "34.67"
 */
const toPercent = (n) => (n * 100).toFixed(2);

/**
 * Function checks that the Explained Variance Criterion is satisfied for the specified number of principal components
 * @param explainedVariance {number[]} array with explained variance for pca metrics
 * @param metricsCount {number} amount of metrics to check
 * @param min {number} min of explained variance to pass criteria
 * @param max {number} max of explained variance to pass criteria
 * @return {{criteriaPassed: boolean, calculatedVariance: number}}
 */
const checkExplainedVariance = (explainedVariance, metricsCount, min, max) => {
	const sum = explainedVariance.slice(0, metricsCount).reduce((sum, n) => sum + n, 0);
	return {
		criteriaPassed: sum >= min && sum <= max,
		calculatedVariance: sum,
	};
};

/**
 * Stringify principal component formula
 * @param coefficients {PrincipalComponent['coefficients']}
 * @param constant {PrincipalComponent['constant']}
 * @return {string}
 */
const formulaToStr = (coefficients, constant) => {
	const sign = (n) => n >= 0 ? "+" : "";
	const stringifiedCoefs = coefficients.map(([name, coef]) => `${sign(coef)}${coef.toFixed(6)} * ${name}`);
	return stringifiedCoefs.join("\n") + "\n" + constant.toFixed(6);
};

/**
 * Function calculates formulas for new principal components
 * @param metricNames {string[]} array of initial metrics names
 * @param values {number[][]} values matrix
 * @param n {number?} amount of metrics to create
 * @return {PrincipalComponent[]}
 *
 * @example
 * const metricNames = ['Metric1', 'Metric2', ..., 'Metric9'];
 *
 * const values = [
 *   [22, 24.4, 9.5, 2.2, 11.7, 9.2, 229.1, 25.6, 9],
 *   [22.2, 24.7, 9.4, 2.2, 11.6, 9.2, 235.8, 25.7, 9.1],
 *   [22.2, 24.5, 9.6, 2.4, 11.7, 9.2, 237.2, 25.8, 8.9],
 *   // ...
 * ];
 *
 * // Instead of 9 initial metrics will be calculated formulas for 3 new metrics
 * const formulas = getPcaFormulas(metricNames, values, 3);
 */
export const getPcaFormulas = (metricNames, values, n = metricNames.length) => {
	const pca = new PCA(values, {center: true, scale: true});
	const {stdevs, means} = pca.toJSON();
	const ev = pca.getEigenvectors();
	const explainedVariance = pca.getExplainedVariance();

	const checkResult = checkExplainedVariance(explainedVariance, n, 0.8, 0.95);
	if (!checkResult.criteriaPassed) {
		Logger.warning.explainedVarianceCriteriaFailed(toPercent(checkResult.calculatedVariance), 80, 95);
	}

	return Array.from({length: n}, (_, i) => {
		const constant = -metricNames.reduce((sum, _, j) => sum + ev.get(j, i) * means[j] / stdevs[j], 0);
		const coefficients = metricNames.map((name, j) => {
			const coef = ev.get(j, i) / stdevs[j];
			return [name, coef];
		});

		return {
			componentName: "PC" + (i + 1),
			explainedVariance: toPercent(explainedVariance[i]) + "%",
			coefficients,
			constant,
			formula: formulaToStr(coefficients, constant),
		};
	});
};
