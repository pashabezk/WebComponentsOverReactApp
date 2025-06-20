import puppeteer from "puppeteer";
import {SELECTOR, URL} from "../Config.js";

export const executeTest = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL.REACT_PAGE);

	await page.click(SELECTOR.deleteBtn);

	const resultTimeElem = await page.waitForSelector(SELECTOR.resultTime);
	const durationStr = await page.evaluate(el => el.textContent, resultTimeElem);

	await browser.close();

	return parseFloat(durationStr);
};
