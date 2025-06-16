import {useState} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {getMockUsers} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import UserCard from "./UserCard.jsx";

const ExperimentReactPage = () => {
	const [users, setUsers] = useState(getMockUsers(experimentSetupManager.getCardsCount()));

	return (
		<CardsPageLayout cardsData={users} setCardsData={setUsers}>
			{users.map((user) => (
				<UserCard
					key={user.id}
					name={user.name}
					surname={user.surname}
					imgSrc={avatar}
					onSubscribe={UserCardHandlers.handleSubscribe}
				/>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentReactPage;
