import "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {usersData} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";

const ExperimentWCPage = () => {
	const arr = new Array(experimentSetupManager.getCardsCount()).fill(0);

	return (
		<CardsPageLayout>
			{arr.map((item, index) => (
				<user-card
					key={usersData[index].id}
					name={usersData[index].name}
					surname={usersData[index].surname}
					img-src={avatar}
				></user-card>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentWCPage;
