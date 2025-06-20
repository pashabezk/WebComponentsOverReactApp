import {TEST_REPEAT_COUNT} from "./Config.js";
import {Report} from "./Entities/Report.js";
import {executeTest} from "./TestLogic/ExecuteTest.js";
import {Logger} from "./Utils/Logger.js";
import {saveReport} from "./Utils/SaveReport.js";

const runAllTests = async () => {
	const report = new Report();
	for (let i = 0; i < TEST_REPEAT_COUNT; i++) {
		const result = await executeTest();
		report.react.delete.addResult(result);
		Logger.log.operationComplete("delete", result);
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

