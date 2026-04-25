const LOG = "LOG:";
const ERROR = "\nERROR:";

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

	static error = {
		operationFailed: (operation) => console.error(ERROR, `Operation "${operation}" failed`),
		createDir: (dirPath) => console.error(ERROR, `Could not create directory: "${dirPath}"`),
		fileWrite: (filePath) => console.error(ERROR, `Could not save file: "${filePath}"`),
		fileRead: (filePath) => console.error(ERROR, `Could not read file: "${filePath}"`),
		customMessage: (...messages) => console.error(ERROR, ...messages),
	};
}
