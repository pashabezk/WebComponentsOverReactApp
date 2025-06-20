import puppeteer from "puppeteer";
import {BROWSER_HEADLESS, EXPERIMENTS_TO_TEST, OPERATIONS_TO_TEST, TEST_REPEAT_COUNT} from "./Config.js";
import {ExperimentReport} from "./Entities/ExperimentReport.js";
import {executeTest} from "./TestLogic/ExecuteTest.js";
import {Logger} from "./Utils/Logger.js";
import {saveReport} from "./Utils/SaveReport.js";

/**
 * @typedef Browser
 * @type {import("puppeteer").Browser}
 */

/**
 * Run pack operations for experiment and write results to report object
 * @param browser {Browser} puppeteer browser instance
 * @param experiment {string} experiment name @see {EXPERIMENTS}
 * @param operations {string[]} operations for which tests should run @see {OPERATIONS}
 * @param report {ExperimentReport} report instance, that will be supplemented with new data
 * @return {Promise<void>}
 */
const runExperiment = async (browser, experiment, operations, report) => {
	for (let operation of operations) {
		for (let i = 0; i < TEST_REPEAT_COUNT; i++) {
			const result = await executeTest(browser, experiment, operation);
			report.addResult(experiment, operation, result);
			Logger.log.operationComplete(experiment, operation, result);
		}
	}
};

/**
 * Puppeteer browser instance
 * @type {Browser}
 */
let browser;

const runAllTests = async () => {
	browser = await puppeteer.launch({headless: BROWSER_HEADLESS});
	const report = new ExperimentReport();

	for (const experiment of EXPERIMENTS_TO_TEST) {
		await runExperiment(browser, experiment, OPERATIONS_TO_TEST, report);
	}

	report.finish();
	await saveReport(report.create());
};

runAllTests().then(() => {
	Logger.success.operationComplete("collect metrics");
}).catch((e) => {
	Logger.error.operationFailed("collect metrics");
	console.error(e);
}).finally(async () => {
	await browser?.close();
});

