import fs from "fs";
import {writeFile} from "fs/promises";
import path from "path";
import {REPORTS_DIR} from "../Constants.js";
import {toSortOrderedDatetime} from "./DateUtils.js";
import {Logger} from "./Logger.js";

const generateReportFilename = () => {
	return "Report_from_" + toSortOrderedDatetime() + ".json";
};

/**
 * Function to save report into file
 * @param objectToSave {object} object that will be stringified and written to file
 * @return {Promise<void>}
 */
export const saveReport = async (objectToSave) => {
	try {
		if (!fs.existsSync(REPORTS_DIR)) {
			fs.mkdirSync(REPORTS_DIR);
		}
	} catch (error) {
		Logger.error.createDir(REPORTS_DIR);
		throw error;
	}

	const reportFilePath = path.join(REPORTS_DIR, generateReportFilename());
	const reportStr = JSON.stringify(objectToSave, null, "\t");
	try {
		await writeFile(reportFilePath, reportStr);
		Logger.success.reportSaved(reportFilePath);
	} catch (error) {
		Logger.error.fileWrite(reportFilePath);
		throw error;
	}
};
