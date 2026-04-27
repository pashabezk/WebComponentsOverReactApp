import {ELEMENTS_ON_PAGE, TEST_REPEAT_COUNT} from "../Config.js";
import {EXPERIMENTS} from "../Constants.js";
import {toFullDateTime} from "../Utils/DateUtils.js";

/**
 * @typedef {Object} LighthouseResults
 * @property {number} lcp largest contentful paint
 * @property {number} cls cumulative layout shift
 * @property {number} fcp first contentful paint
 * @property {number} tbt total blocking time
 * @property {number} si speed index
 * @property {number} performanceScore performance score
 */

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

	/** @type {LighthouseResults[]} */
	#webComponentsLhResults = [];
	/** @type {LighthouseResults[]} */
	#reactLhResults = [];

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
	 * @param experiment {string} experiment name {@link EXPERIMENTS}
	 * @param operation {string} operation name {@link OPERATIONS}
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

	/**
	 * Method to add lighthouse run result
	 * @param experiment {string} experiment name {@link EXPERIMENTS}
	 * @param results {LighthouseResults} lighthouse results
	 */
	addLighthouseResult(experiment, results) {
		if (experiment === EXPERIMENTS.REACT) {
			this.#reactLhResults.push(results);
		} else if (experiment === EXPERIMENTS.WEB_COMPONENTS) {
			this.#webComponentsLhResults.push(results);
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
			lighthouseResults: {
				react: this.#reactLhResults,
				webComponents: this.#webComponentsLhResults,
			}
		};
	}
}
