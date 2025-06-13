import {useEffect, useRef} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {usersData} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import {UserCardEvent} from "./UserCard.js";

const handleSubscribe = (event) => {
	const {name, surname} = event.detail;
	UserCardHandlers.handleSubscribe(name, surname);
};

const ExperimentWCPage = () => {
	const users = new Array(experimentSetupManager.getCardsCount()).fill(0);
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
		<CardsPageLayout>
			{users.map((item, index) => (
				<user-card
					key={usersData[index].id}
					ref={(el) => (userCardRefs.current[index] = el)}
					name={usersData[index].name}
					surname={usersData[index].surname}
					img-src={avatar}
				></user-card>
			))}
		</CardsPageLayout>
	);
};

export default ExperimentWCPage;
