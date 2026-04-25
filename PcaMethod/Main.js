import {readFile, writeFile} from "fs/promises";
import path from "path";
import {Logger} from "../MetricsCollection/Utils/Logger.js";
import {createReportsDirectory, generateReportFilename} from "../MetricsCollection/Utils/SaveReport.js";
import {REPORTS_DIR} from "./Constants.js";
import {parseTable} from "./ParseMetrics.js";

/**
 * Function to remove first item from every matrix row
 * @param matrix {unknown[][]}
 * @return {unknown[][]}
 *
 * @example
 * const matrix = [
 *   [1, 2, 3],
 *   [3, 4, 5],
 *   [6, 7, 8],
 * ];
 *
 * const newMatrix = removeFirstItemFromEveryMatrixRow(matrix);
 * // [
 * //   [2, 3],
 * //   [4, 5],
 * //   [7, 8],
 * // ]
 */
const removeFirstItemFromEveryMatrixRow = (matrix) => matrix.map(([, ...tail]) => tail);

/**
 * Function run script for parse metrics from GH
 * @param metricsFilepath {string} output path for metrics file
 * @return {Promise<string[][]>} matrix with parsed data
 */
const runParseMetricsStep = async (metricsFilepath) => {
	Logger.log.startStep("Parse metrics");
	const parsedData = await parseTable();
	await writeFile(metricsFilepath, JSON.stringify(parsedData, null, "\t"));
	Logger.success.reportSaved(metricsFilepath);

	return parsedData;
};

/**
 * Function run alternate script for parseMetricsStep.
 * Alternate is to read existed file with metrics
 * @param metricsFilepath {string} metrics file path, which will be read
 * @return {Promise<string[][]>} matrix with parsed data
 */
const runAlternateParseMetricsStep = async (metricsFilepath) => {
	Logger.log.stepSkipped("Parse metrics");
	Logger.log.tryToReadFile(metricsFilepath);

	// try to read data from file
	try {
		const metricsReadData = await readFile(metricsFilepath, "utf8");
		const parsedData = JSON.parse(metricsReadData);
		Logger.success.dataRead();
		return parsedData;
	} catch (error) {
		Logger.error.fileRead(metricsFilepath);
		throw error;
	}
};

const runPcaExperiment = async ({
	parseMetrics = true,
	metricsOutputFile = generateReportFilename('Parse_metrics_result_'),
} = {}) => {
	createReportsDirectory(REPORTS_DIR);

	//#region step 1
	// This step runs scripts to get metrics from GH benchmark results page

	const metricsFilepath = path.join(REPORTS_DIR, metricsOutputFile);
	const parsedData = parseMetrics
		? await runParseMetricsStep(metricsFilepath)
		: await runAlternateParseMetricsStep(metricsFilepath);

	//#endregion

	const dataForStep2 = removeFirstItemFromEveryMatrixRow(parsedData);
	console.log(dataForStep2);
};

await runPcaExperiment({
	parseMetrics: false,
	metricsOutputFile: "Parse_metrics_result_2026_04_25.json",
});
