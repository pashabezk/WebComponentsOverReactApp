import fs from "fs";
import {writeFile} from "fs/promises";
import path from "path";
import {toSortOrderedDatetime} from "../MetricsCollection/Utils/DateUtils.js";
import {Logger} from "../MetricsCollection/Utils/Logger.js";
import {REPORTS_DIR} from "./Constants.js";
import {parseTable} from "./ParseMetrics.js";

const generateFilename = (prefix = '') => {
	return prefix + toSortOrderedDatetime() + ".json";
};

const createReportsDirectory = () => {
	try {
		if (!fs.existsSync(REPORTS_DIR)) {
			fs.mkdirSync(REPORTS_DIR);
		}
	} catch (error) {
		Logger.error.createDir(REPORTS_DIR);
		throw error;
	}
};

const runPcaExperiment = async ({
	parseMetrics = true,
	metricsOutputFile = generateFilename('Parse_metrics_result_'),
} = {}) => {
	createReportsDirectory();

	const metricsFilepath = path.join(REPORTS_DIR, metricsOutputFile);

	if (parseMetrics) {
		Logger.log.startStep("Parse metrics");
		const parsedData = await parseTable();
		await writeFile(metricsFilepath, JSON.stringify(parsedData, null, "\t"));
		Logger.success.reportSaved(metricsFilepath);
	} else {
		Logger.log.stepSkipped("Parse metrics");
	}
};

await runPcaExperiment({
	parseMetrics: true,
	metricsOutputFile: "Parse_metrics_result_2026_04_25.json",
});
