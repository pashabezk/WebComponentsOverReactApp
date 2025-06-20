import {BUTTON_ID} from "../../src/Widgets/CardsPageLayout/Constants.js";
import {URL} from "../Config.js";
import {SELECTOR} from "../Constants.js";
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
	await page.goto(URL[experiment]);

	await page.click(selectorById(BUTTON_ID[operation]));

	const resultTimeElem = await page.waitForSelector(SELECTOR.resultTime);
	const durationStr = await page.evaluate(el => el.textContent, resultTimeElem);

	await page.close();

	return parseFloat(durationStr);
};
