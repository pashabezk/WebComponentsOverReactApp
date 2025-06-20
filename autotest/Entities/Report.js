import {TEST_REPEAT_COUNT} from "../Config.js";
import {toFullDateTime} from "../Utils/DateUtils.js";

/**
 * Helper to store experiments result and create report
 *
 * @example
 * // create report object
 * const report = new Report();
 *
 * // optionally: override start time
 * report.start();
 *
 * // add results
 * report.react.delete.addResult(12);
 * report.webComponents.insert.addResult(12);
 * report.webComponents.insert.addResult(12);
 *
 * // write end time
 * report.finish();
 *
 * // output results to console
 * console.log(report.create());
 */
export class Report {
	#startTime;
	#endTime;

	#webComponentsResults = {
		insertOperations: [],
		deleteOperations: [],
		swapOperations: [],
	};

	#reactResults = {
		insertOperations: [],
		deleteOperations: [],
		swapOperations: [],
	};

	webComponents = {
		insert: {addResult: (result) => {this.#webComponentsResults.insertOperations.push(result);}},
		delete: {addResult: (result) => {this.#webComponentsResults.deleteOperations.push(result);}},
		swap: {addResult: (result) => {this.#webComponentsResults.swapOperations.push(result);}},
	};

	react = {
		insert: {addResult: (result) => {this.#reactResults.insertOperations.push(result);}},
		delete: {addResult: (result) => {this.#reactResults.deleteOperations.push(result);}},
		swap: {addResult: (result) => {this.#reactResults.swapOperations.push(result);}},
	};

	constructor() {
		this.start();
	}

	/** Method to write experiment start time */
	start(startTime = new Date()) {
		this.#startTime = startTime;
	}

	/** Method to write experiment end time */
	finish(endTime = new Date()) {
		this.#endTime = endTime;
	}

	/** Creates report result object */
	create() {
		return {
			info: {
				startTime: toFullDateTime(this.#startTime),
				endTime: toFullDateTime(this.#endTime),
				totalDurationInMs: this.#endTime - this.#startTime,
				testsRepeatedCount: TEST_REPEAT_COUNT,
			},
			results: {
				react: this.#reactResults,
				webComponents: this.#webComponentsResults,
			},
		};
	}
}
