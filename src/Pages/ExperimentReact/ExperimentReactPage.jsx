import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {usersData} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import UserCard from "./UserCard.jsx";

const ExperimentReactPage = () => {
	const arr = new Array(experimentSetupManager.getCardsCount()).fill(0);

	return (
		<CardsPageLayout>
			{arr.map((item, index) => (
				<UserCard
					key={usersData[index].id}
					name={usersData[index].name}
					surname={usersData[index].surname}
					imgSrc={avatar}
				/>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentReactPage;
