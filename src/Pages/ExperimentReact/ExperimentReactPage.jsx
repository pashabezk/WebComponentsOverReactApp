import {useState} from "react";
import {useExperimentSetup} from "../../Features/ExperimentSetupManager/UseExperimentSetup.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {getMockUsers} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import UserCard from "./UserCard.jsx";

const ExperimentReactPage = () => {
	const {cardsCount} = useExperimentSetup();
	const [users, setUsers] = useState(getMockUsers(cardsCount));

	const [selectedId, setSelectedId] = useState(null);

	return (
		<CardsPageLayout
			cardsData={users}
			setCardsData={setUsers}
			selectedId={selectedId}
			setSelectedId={setSelectedId}
		>
			{users.map((user) => (
				<UserCard
					key={user.id}
					name={user.name}
					surname={user.surname}
					imgSrc={avatar}
					isSelected={selectedId === user.id}
					onSubscribe={UserCardHandlers.handleSubscribe}
				/>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentReactPage;
