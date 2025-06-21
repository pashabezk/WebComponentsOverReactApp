import {useState} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import {DATA_TEST_ID} from "./Constants.js";

const ProjectSetup = () => {
	const [count, setCount] = useState(experimentSetupManager.getCardsCount());

	const onCountChange = (e) => {
		const newValue = parseInt(e.target.value);
		experimentSetupManager.setCardsCount(newValue);
		setCount(parseInt(e.target.value));
	};

	return (
		<div>
			<h2>Settings</h2>
			<p>
				Elements amount:{" "}
				<input
					type="number"
					value={count}
					onChange={onCountChange}
					data-test-id={DATA_TEST_ID.elementsAmountInput}
				/>
			</p>
		</div>
	);
};

export default ProjectSetup;
