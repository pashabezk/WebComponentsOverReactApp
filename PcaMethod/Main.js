import {readFile} from "fs/promises";
import path from "path";
import {REPORTS_DIR} from "../MetricsCollection/Constants.js";
import {toFullDateTime} from "../MetricsCollection/Utils/DateUtils.js";
import {Logger} from "../MetricsCollection/Utils/Logger.js";
import {strMatrixToNumeric, transpose} from "../MetricsCollection/Utils/MatrixUtils.js";
import {createReportsDirectory, generateReportFilename, saveReport} from "../MetricsCollection/Utils/SaveReport.js";
import {applyPcFormulas, calculateAvg} from "./ApplyPcaFormulas.js";
import {EXECUTE_PARSE_METRIC_STEP, METRICS_COLLECTION_FILENAME, PARSED_METRICS_FILENAME} from "./Config.js";
import {OPERATION_NAME_MAPPER} from "./Constants.js";
import {parseTable} from "./ParseMetrics.js";
import {getPcaFormulas} from "./PcaCalculation.js";

/**
 * Function run script for parse metrics from GH
 * @param metricsFilename {string}
 * @return {Promise<string[][]>} matrix with parsed data
 */
const runParseMetricsStep = async (metricsFilename) => {
	Logger.log.startStep("Parse metrics");
	const parsedData = await parseTable();
	await saveReport(parsedData, metricsFilename);

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
 * Function run script for applying received PC formulas to metrics
 * @param formulas {PrincipalComponent[]}
 * @param metricsFilepath {string} file where user collected metrics stored
 * @return {Promise<void>}
 */
const applyPcaFormulasStep = async (formulas, metricsFilepath) => {
	let metricsData;

	Logger.log.startStep("Apply formulas");
	Logger.log.tryToReadFile(metricsFilepath);
	try {
		const localMetricsReadData = await readFile(metricsFilepath, "utf8");
		metricsData = JSON.parse(localMetricsReadData);
		Logger.success.dataRead();
	} catch (error) {
		Logger.error.fileRead(metricsFilepath);
		throw error;
	}

	const reactAvgResults = calculateAvg(metricsData.results.react);
	const wcAvgResults = calculateAvg(metricsData.results.webComponents);

	const reactPcResults = applyPcFormulas(formulas, reactAvgResults);
	const wcPcResults = applyPcFormulas(formulas, wcAvgResults);

	const objToSave = {
		info: {reportCreatedAt: toFullDateTime()},
		results: {
			react: reactPcResults,
			webComponents: wcPcResults,
		}
	};
	await saveReport(objToSave, generateReportFilename("Calculated_PC_from_"));
};

/**
 * Function run all scripts for PCA part of experiment
 * @param options
 * @param options.parseMetrics {boolean?} flag to decide need to run script for parsing GH metrics
 * @param options.parsedMetricsFileName {string?} parsed metrics storage file: used for output if `parseMetrics=true`, and for input if `parseMetrics=false`
 * @param options.localCollectedReportFileName {string} name of file where should be saved user collected metrics
 * @return {Promise<void>}
 */
const runPcaExperiment = async ({
	parseMetrics = true,
	parsedMetricsFileName = generateReportFilename('Parse_metrics_result_'),
	localCollectedReportFileName,
} = {}) => {
	createReportsDirectory(REPORTS_DIR);

	//#region step 1
	// This step runs scripts to get metrics from GH benchmark results page

	const metricsFilepath = path.join(REPORTS_DIR, parsedMetricsFileName);
	const parsedData = parseMetrics
		? await runParseMetricsStep(parsedMetricsFileName)
		: await runAlternateParseMetricsStep(metricsFilepath);
	parsedData.shift(); // remove benchmark names

	//#endregion

	//#region step 2
	// Calculate formulas for new principal components using PCA method

	Logger.log.startStep("Calculating formulas using PCA method");
	const [metricNames, ...values] = transpose(parsedData);
	const formulas = getPcaFormulas(metricNames.map(name => OPERATION_NAME_MAPPER[name]), strMatrixToNumeric(values), 3);

	//#endregion

	//#region step 3
	// Use formulas to calculate PC with data collected in local experiment

	const localMetricsFilepath = path.join(REPORTS_DIR, localCollectedReportFileName);
	await applyPcaFormulasStep(formulas, localMetricsFilepath);

	//#endregion

	Logger.success.operationComplete("PCA experiment");
};

await runPcaExperiment({
	parseMetrics: EXECUTE_PARSE_METRIC_STEP,
	parsedMetricsFileName: PARSED_METRICS_FILENAME,
	localCollectedReportFileName: METRICS_COLLECTION_FILENAME,
});
