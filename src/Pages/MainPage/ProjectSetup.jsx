import {useState} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";

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
				Elements amount:&nbsp;
				<input type="number" value={count} onChange={onCountChange}/>
			</p>
		</div>
	);
};

export default ProjectSetup;
