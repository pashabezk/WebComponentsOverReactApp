import {BUTTON_ID} from "../../src/Widgets/CardsPageLayout/Constants.js";
import {ELEMENTS_ON_PAGE, URL} from "../Config.js";
import {EXPERIMENTS, SELECTOR} from "../Constants.js";
import {selectorById} from "../Utils/SelectorUtils.js";

/**
 * @typedef Browser
 * @type {import("puppeteer").Browser}
 */

/**
 * Function that executes one test
 * @param browser {Browser} puppeteer browser instance
 * @param experiment {string} experiment name @see {EXPERIMENTS}
 * @param operation {string} operation name @see {OPERATIONS}
 * @return {Promise<number>} experiment duration in ms
 *
 * @example
 * await executeTest(EXPERIMENTS.REACT, OPERATIONS.insert);
 */
export const executeTest = async (browser, experiment, operation) => {
	const page = await browser.newPage();
	await page.goto(URL.MAIN);

	// set amount of elements
	const input = await page.waitForSelector(SELECTOR.elementsAmountInput);
	await input.evaluate((elem) => { elem.value = ""; });
	await page.type(SELECTOR.elementsAmountInput, ELEMENTS_ON_PAGE.toString());

	// go to experiment page
	await page.click(experiment === EXPERIMENTS.REACT ? SELECTOR.linkToReactPage : SELECTOR.linkToWcPage);
	const buttonSelector = selectorById(BUTTON_ID[operation]);
	await page.waitForSelector(buttonSelector);

	// click on button with operation
	await page.click(buttonSelector);

	const resultTimeElem = await page.waitForSelector(SELECTOR.resultTime);
	const durationStr = await page.evaluate(el => el.textContent, resultTimeElem);

	await page.close();

	return parseFloat(durationStr);
};
