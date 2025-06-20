const LOG = "LOG:";
const ERROR = "\nERROR:";

/** Class helper that stores all messages to log */
export class Logger {
	static log = {
		operationComplete: (operation, durationInMs) => console.log(LOG, `Operation "${operation}" finished in ${durationInMs}ms`),
	};

	static success = {
		operationComplete: (operation) => console.log(`Operation "${operation}" finished successfully`),
		reportSaved: (reportPath) => console.log(`Report saved to: "${reportPath}"`),
	};

	static error = {
		operationFailed: (operation) => console.error(ERROR, `Operation "${operation}" failed`),
		createDir: (dirPath) => console.error(ERROR, `Could not create directory: "${dirPath}"`),
		fileWrite: (filePath) => console.error(ERROR, `Could not save file: "${filePath}"`),
	};
}
