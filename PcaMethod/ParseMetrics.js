import puppeteer from "puppeteer";
import {Logger} from "../MetricsCollection/Utils/Logger.js";

/** URL where benchmark results stored */
const URL = "https://krausest.github.io/js-framework-benchmark/2026/chrome144.html";

/** Function to transpose matrix */
const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));

const selectors = {
	table: "table.results__table",
	headerRow: "tr:has(th.benchname)",
	operationDuration: ".mean",
};

/**
 * Function that parse metrics data from krausest repository ({@link URL})
 * @return parsed data or empty object in error case
 */
export const parseTable = async () => {
	let browser;
	let parsedData = {};

	try {
		browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({width: 1280, height: 800});

		await page.goto(URL, {waitUntil: "networkidle2", timeout: 60000});

		Logger.log.customMessage("Browser opened. Wait for table to start parsing...");
		await page.waitForSelector(selectors.table, {timeout: 30000});

		parsedData = await page.evaluate((selectors) => {
			const table = document.querySelector(selectors.table);
			const headers = table.querySelector(selectors.headerRow);
			const frameworks = [...headers.childNodes].map(node => node.textContent);

			const data = [frameworks];

			const tbody = table.querySelector("tbody");
			const rows = [...tbody.childNodes];
			rows.pop(); // exclude `compare` row
			rows.pop(); // exclude `geometric mean` row

			rows.forEach(row => {
				const [rowHeader, ...rowNodes] = [...row.childNodes];
				const experimentName = rowHeader.querySelector("button").textContent;
				const rowData = rowNodes.map(td => td.querySelector(selectors.operationDuration).textContent);
				data.push([experimentName, ...rowData]);
			});

			return data;
		}, selectors);
	} catch (error) {
		Logger.error.customMessage("An error occurred on parsing table", error.message);
	} finally {
		if (browser) {
			await browser.close();
			Logger.log.customMessage("Browser closed");
		}
	}

	return transpose(parsedData);
};
