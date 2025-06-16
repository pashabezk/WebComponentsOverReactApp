import {useEffect, useRef, useState} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
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
	const [users, setUsers] = useState(getMockUsers(experimentSetupManager.getCardsCount()));
	const userCardRefs = useRef([]);

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
	}, []);

	return (
		<CardsPageLayout cardsData={users} setCardsData={setUsers}>
			{users.map((user, index) => (
				<user-card
					key={user.id}
					ref={(el) => (userCardRefs.current[index] = el)}
					name={user.name}
					surname={user.surname}
					img-src={avatar}
				></user-card>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentWCPage;
