import {readFile, writeFile} from "fs/promises";
import path from "path";
import {Logger} from "../MetricsCollection/Utils/Logger.js";
import {strMatrixToNumeric, transpose} from "../MetricsCollection/Utils/MatrixUtils.js";
import {createReportsDirectory, generateReportFilename} from "../MetricsCollection/Utils/SaveReport.js";
import {REPORTS_DIR} from "./Constants.js";
import {parseTable} from "./ParseMetrics.js";
import {getPcaFormulas} from "./PcaCalculation.js";

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

/**
 * Function run all scripts for PCA part of experiment
 * @param options
 * @param options.parseMetrics {boolean} flag to decide need to run script for parsing GH metrics
 * @param options.parsedMetricsFileName {string} name of file where will be saved parsed metrics if parseMetrics=true,
 *   or if parseMetrics=false - from this file metrics will be read
 * @return {Promise<void>}
 */
const runPcaExperiment = async ({
	parseMetrics = true,
	parsedMetricsFileName = generateReportFilename('Parse_metrics_result_'),
} = {}) => {
	createReportsDirectory(REPORTS_DIR);

	//#region step 1
	// This step runs scripts to get metrics from GH benchmark results page

	const metricsFilepath = path.join(REPORTS_DIR, parsedMetricsFileName);
	const parsedData = parseMetrics
		? await runParseMetricsStep(metricsFilepath)
		: await runAlternateParseMetricsStep(metricsFilepath);
	parsedData.shift(); // remove benchmark names

	//#endregion

	//#region step 2
	const [metricNames, ...values] = transpose(parsedData);

	const formulas = getPcaFormulas(metricNames, strMatrixToNumeric(values), 3);
	console.log(formulas);

	//#endregion
};

await runPcaExperiment({
	parseMetrics: false,
	parsedMetricsFileName: "Parse_metrics_result_2026_04_25.json",
});
