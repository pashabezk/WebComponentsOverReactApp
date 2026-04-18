import {SearchQueryParams} from "../../src/Shared/Constants/SearchQueryConstants.js";
import {ELEMENTS_ON_PAGE, URL} from "../Config.js";
import {EXPERIMENT_OPERATION_BTN_ID, EXPERIMENT_OPERATIONS, EXPERIMENTS, SELECTOR} from "../Constants.js";
import {selectorById} from "../Utils/SelectorUtils.js";

/**
 * @typedef Browser
 * @type {import("puppeteer").Browser}
 */

/** List of operations that requires zero elements before experiment starts */
const operationsWithInitialZero = [EXPERIMENT_OPERATIONS.create, EXPERIMENT_OPERATIONS.createMany];

/**
 * Function that executes one test
 * @param browser {Browser} puppeteer browser instance
 * @param experiment {string} experiment name {@link EXPERIMENTS}
 * @param operation {string} operation name {@link EXPERIMENT_OPERATIONS}
 * @return {Promise<number>} experiment duration in ms
 *
 * @example
 * await executeTest(EXPERIMENTS.REACT, EXPERIMENT_OPERATIONS.create);
 */
export const executeTest = async (browser, experiment, operation) => {
	const initialAmount = operationsWithInitialZero.includes(operation) ? 0 : ELEMENTS_ON_PAGE;

	const url = (experiment === EXPERIMENTS.REACT ? URL[EXPERIMENTS.REACT] : URL[EXPERIMENTS.WEB_COMPONENTS])
		+ `?${SearchQueryParams.InitialCardsCount}=${initialAmount}`;

	const page = await browser.newPage();
	await page.goto(url);

	// click on button with operation
	const buttonSelector = selectorById(EXPERIMENT_OPERATION_BTN_ID[operation]);
	await page.waitForSelector(buttonSelector);
	await page.click(buttonSelector);

	const resultTimeElem = await page.waitForSelector(SELECTOR.resultTime);
	const durationStr = await page.evaluate(el => el.textContent, resultTimeElem);

	await page.close();

	return parseFloat(durationStr);
};
