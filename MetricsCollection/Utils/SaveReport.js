import fs from "fs";
import {writeFile} from "fs/promises";
import path from "path";
import {REPORTS_DIR} from "../Constants.js";
import {toSortOrderedDatetime} from "./DateUtils.js";
import {Logger} from "./Logger.js";

export const generateReportFilename = (prefix = "Report_from_") => {
	return prefix + toSortOrderedDatetime() + ".json";
};

export const createReportsDirectory = (dir) => {
	try {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
	} catch (error) {
		Logger.error.createDir(dir);
		throw error;
	}
};

/**
 * Function to save report into file
 * @param objectToSave {object} object that will be stringified and written to file
 * @param filename {string?} output filename
 * @return {Promise<void>}
 */
export const saveReport = async (objectToSave, filename) => {
	createReportsDirectory(REPORTS_DIR);

	const reportFilePath = path.join(REPORTS_DIR, filename ?? generateReportFilename());
	const reportStr = JSON.stringify(objectToSave, null, "\t");
	try {
		await writeFile(reportFilePath, reportStr);
		Logger.success.reportSaved(reportFilePath);
	} catch (error) {
		Logger.error.fileWrite(reportFilePath);
		throw error;
	}
};
