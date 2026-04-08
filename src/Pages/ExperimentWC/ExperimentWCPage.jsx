import {useEffect, useRef, useState} from "react";
import {useExperimentSetup} from "../../Features/ExperimentSetupManager/UseExperimentSetup.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {getMockUsers} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import {UserCardEvent} from "./UserCard.js";

const handleSubscribe = (event) => {
	const {name, surname} = event.detail;
	UserCardHandlers.handleSubscribe(name, surname);
};

const ExperimentWCPage = () => {
	const {cardsCount} = useExperimentSetup();
	const [users, setUsers] = useState(getMockUsers(cardsCount));
	const userCardRefs = useRef([]);

	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		const cards = [...userCardRefs.current];

		cards.forEach((userCardElement) => {
			userCardElement?.addEventListener(UserCardEvent.subscribe, handleSubscribe);
		});

		return () => {
			cards.forEach((userCardElement) => {
				userCardElement?.removeEventListener(UserCardEvent.subscribe, handleSubscribe);
			});
		};
	}, [users]);

	return (
		<CardsPageLayout
			cardsData={users}
			setCardsData={setUsers}
			selectedId={selectedId}
			setSelectedId={setSelectedId}
		>
			{users.map((user, index) => (
				<user-card
					key={user.id}
					ref={(el) => (userCardRefs.current[index] = el)}
					name={user.name}
					surname={user.surname}
					img-src={avatar}
					selected={selectedId === user.id}
				></user-card>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentWCPage;
