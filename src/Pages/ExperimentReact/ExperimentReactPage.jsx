import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {usersData} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import UserCard from "./UserCard.jsx";

const ExperimentReactPage = () => {
	const users = new Array(experimentSetupManager.getCardsCount()).fill(0);

	return (
		<CardsPageLayout>
			{users.map((item, index) => (
				<UserCard
					key={usersData[index].id}
					name={usersData[index].name}
					surname={usersData[index].surname}
					imgSrc={avatar}
					onSubscribe={UserCardHandlers.handleSubscribe}
				/>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentReactPage;
