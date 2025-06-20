import {EXECUTE_REACT_EXPERIMENT, EXECUTE_WEB_COMPONENTS_EXPERIMENT, OPERATIONS_TO_TEST, TEST_REPEAT_COUNT} from "./Config.js";
import {EXPERIMENTS} from "./Constants.js";
import {Report} from "./Entities/Report.js";
import {executeTest} from "./TestLogic/ExecuteTest.js";
import {Logger} from "./Utils/Logger.js";
import {saveReport} from "./Utils/SaveReport.js";

/**
 * Run pack operations for experiment and write results to report object
 * @param experiment {string} experiment name @see {EXPERIMENTS}
 * @param operations {string[]} operations for which tests should run @see {OPERATIONS}
 * @param report {Report} report instance, that will be supplemented with new data
 * @return {Promise<void>}
 */
const runExperiment = async (experiment, operations, report) => {
	for (let operation of operations) {
		for (let i = 0; i < TEST_REPEAT_COUNT; i++) {
			const result = await executeTest(experiment, operation);
			report.addResult(experiment, operation, result);
			Logger.log.operationComplete(experiment, operation, result);
		}
	}
};

const runAllTests = async () => {
	const report = new Report();

	if (EXECUTE_REACT_EXPERIMENT) {
		await runExperiment(EXPERIMENTS.REACT, OPERATIONS_TO_TEST, report);
	}
	if (EXECUTE_WEB_COMPONENTS_EXPERIMENT) {
		await runExperiment(EXPERIMENTS.WEB_COMPONENTS, OPERATIONS_TO_TEST, report);
	}

	report.finish();
	await saveReport(report);
};

runAllTests().then(() => {
	Logger.success.operationComplete("collect metrics");
}).catch((e) => {
	Logger.error.operationFailed("collect metrics");
	console.error(e);
});

