import lighthouse from 'lighthouse';
import {SearchQueryParams} from "../../src/Shared/Constants/SearchQueryConstants.js";
import {ELEMENTS_ON_PAGE, EXPERIMENTS_TO_TEST, LIGHTHOUSE_REPEAT_COUNT, URL as URLS} from "../Config.js";
import {EXPERIMENTS} from "../Constants.js";
import {Logger} from "../Utils/Logger.js";

/**
 * @typedef Browser
 * @type {import("puppeteer").Browser}
 */

/**
 * Function that executes one lighthouse test
 * @param url {string} page url
 * @param port {number} port with Puppeteer browser
 * @return {Promise<LighthouseResults>}
 */
const runLighthouseTest = async (url, port) => {
	const options = {
		port: port,
		logLevel: 'info',
		output: 'json',
	};

	const config = {
		extends: 'lighthouse:default',
		settings: {
			onlyCategories: ['performance'],
		},
	};

	const runnerResult = await lighthouse(url, options, config);
	const {audits, categories: {performance}} = runnerResult.lhr;

	return {
		lcp: audits['largest-contentful-paint']?.numericValue,
		cls: audits['cumulative-layout-shift']?.numericValue,
		fcp: audits['first-contentful-paint']?.numericValue,
		tbt: audits['total-blocking-time']?.numericValue,
		si: audits['speed-index']?.numericValue,
		performanceScore: Math.round((performance.score ?? 0) * 100),
	};
};

/**
 * Run several lighthouse runs and write results to report object
 * @param browser {Browser} puppeteer browser instance
 * @param report {ExperimentReport} report instance, that will be supplemented with new data
 * @return {Promise<void>}
 */
export const runLighthouse = async (browser, report) => {
	const wsEndpoint = browser.wsEndpoint();
	const port = parseInt(new URL(wsEndpoint).port);

	for (const experiment of EXPERIMENTS_TO_TEST) {
		const url = (experiment === EXPERIMENTS.REACT ? URLS[EXPERIMENTS.REACT] : URLS[EXPERIMENTS.WEB_COMPONENTS])
			+ `?${SearchQueryParams.InitialCardsCount}=${ELEMENTS_ON_PAGE}`;

		for (let i = 0; i < LIGHTHOUSE_REPEAT_COUNT; i++) {
			Logger.log.lighthouseStart(experiment, i, LIGHTHOUSE_REPEAT_COUNT);
			const result = await runLighthouseTest(url, port);
			report.addLighthouseResult(experiment, result);
			Logger.log.lighthouseComplete(experiment, i, LIGHTHOUSE_REPEAT_COUNT);
		}
	}
};
