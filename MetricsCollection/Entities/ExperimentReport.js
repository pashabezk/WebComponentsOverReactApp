import {ELEMENTS_ON_PAGE, TEST_REPEAT_COUNT} from "../Config.js";
import {EXPERIMENTS} from "../Constants.js";
import {toFullDateTime} from "../Utils/DateUtils.js";

/**
 * Helper to store experiments result and create report
 *
 * @example
 * // create report object
 * const report = new ExperimentReport();
 *
 * // optionally: override start time
 * report.start();
 *
 * // add results
 * report.addResult(EXPERIMENTS.REACT, OPERATIONS.insert, 12);
 * report.addResult(EXPERIMENTS.WEB_COMPONENTS, OPERATIONS.insert, 10);
 *
 * // write end time
 * report.finish();
 *
 * // output results to console
 * console.log(report.create());
 */
export class ExperimentReport {
	#startTime;
	#endTime;

	#webComponentsResults = {};
	#reactResults = {};

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

	/**
	 * Method to add experiment operation result
	 * @param experiment {string} experiment name @see {EXPERIMENTS}
	 * @param operation {string} operation name @see {OPERATIONS}
	 * @param duration {number} operation duration in ms
	 */
	addResult(experiment, operation, duration) {
		if (experiment === EXPERIMENTS.REACT) {
			if (this.#reactResults[operation]) {
				this.#reactResults[operation].push(duration);
			} else {
				this.#reactResults[operation] = [duration];
			}
		} else if (experiment === EXPERIMENTS.WEB_COMPONENTS) {
			if (this.#webComponentsResults[operation]) {
				this.#webComponentsResults[operation].push(duration);
			} else {
				this.#webComponentsResults[operation] = [duration];
			}
		}
	}

	/** Creates report result object */
	create() {
		return {
			info: {
				startTime: toFullDateTime(this.#startTime),
				endTime: toFullDateTime(this.#endTime),
				totalDurationInMs: this.#endTime - this.#startTime,
				testsRepeatedCount: TEST_REPEAT_COUNT,
				amountOfElements: ELEMENTS_ON_PAGE,
			},
			results: {
				react: this.#reactResults,
				webComponents: this.#webComponentsResults,
			},
		};
	}
}
