import puppeteer from "puppeteer";
import {BUTTON_ID} from "../../src/Widgets/CardsPageLayout/Constants.js";
import {URL} from "../Config.js";
import {SELECTOR} from "../Constants.js";
import {selectorById} from "../Utils/SelectorUtils.js";

/**
 * Function that executes one test
 * @param experiment {string} experiment name @see {EXPERIMENTS}
 * @param operation {string} operation name @see {OPERATIONS}
 * @return {Promise<number>} experiment duration in ms
 *
 * @example
 * await executeTest(EXPERIMENTS.REACT, OPERATIONS.insert);
 */
export const executeTest = async (experiment, operation) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL[experiment]);

	await page.click(selectorById(BUTTON_ID[operation]));

	const resultTimeElem = await page.waitForSelector(SELECTOR.resultTime);
	const durationStr = await page.evaluate(el => el.textContent, resultTimeElem);

	await browser.close();

	return parseFloat(durationStr);
};
