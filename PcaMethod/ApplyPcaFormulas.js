import {Logger} from "../MetricsCollection/Utils/Logger.js";

/**
 * Calculates average value for each array in object
 * @param operations {Record<string, number[]>}
 * @return {Record<string, number>}
 */
export const calculateAvg = (operations) => {
	return Object.entries(operations).reduce((result, [operation, measurements]) => {
		const amount = measurements.length;
		const sum = measurements.reduce((sum, n) => sum + n, 0);
		const average = sum / amount;
		result[operation] = average;
		return result;
	}, {});
};

/**
 * Calculates PC for passed metrics
 * @param formulas {PrincipalComponent[]}
 * @param metrics {object} metrics for which PC will be calculated
 * @return {{componentName: string, value: number}}
 */
export const applyPcFormulas = (formulas, metrics) => {
	return formulas.map((pc) => {
		const value = pc.coefficients.reduce(
			(sum, [name, coef]) => {
				if (!metrics[name]) {
					Logger.error.getMetric(name);
					throw new Error(`Cannot find metric "${name}" in passed results`);
				}
				return sum + (metrics[name] * coef);
			},
			pc.constant
		);
		return {componentName: pc.componentName, value};
	});
};
