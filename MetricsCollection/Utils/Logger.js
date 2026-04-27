const LOG = "LOG:";
const ERROR = "\nERROR:";
const WARNING = "\nWARNING:";

/** Class helper that stores all messages to log */
export class Logger {
	static log = {
		operationComplete: (experiment, operation, durationInMs) => console.log(LOG, `${experiment}: operation "${operation}" finished in ${durationInMs}ms`),
		startStep: (stepName) => console.log(`Step "${stepName}" started`),
		stepSkipped: (stepName) => console.log(`Step "${stepName}" was skipped`),
		tryToReadFile: (fileName) => console.log(`Try to load data from file: "${fileName}"`),
		customMessage: (...messages) => console.log(...messages),
	};

	static success = {
		operationComplete: (operation) => console.log(`Operation "${operation}" finished successfully`),
		reportSaved: (reportPath) => console.log(`Report saved to: "${reportPath}"`),
		dataRead: () => console.log("Data was successfully read"),
	};

	static warning = {
		explainedVarianceCriteriaFailed: (calculatedVariance, min, max) => console.warn(WARNING, `Explained variance criteria is failed. Your metrics explain ${calculatedVariance}% of variance, but it should be in range ${min}-${max}%. Recommendation is to change amount of PCA metrics`),
	};

	static error = {
		operationFailed: (operation) => console.error(ERROR, `Operation "${operation}" failed`),
		createDir: (dirPath) => console.error(ERROR, `Could not create directory: "${dirPath}"`),
		fileWrite: (filePath) => console.error(ERROR, `Could not save file: "${filePath}"`),
		fileRead: (filePath) => console.error(ERROR, `Could not read file: "${filePath}"`),
		getMetric: (metricName) => console.error(ERROR, `Could not find metric "${metricName}" in passed object`),
		customMessage: (...messages) => console.error(ERROR, ...messages),
	};
}
