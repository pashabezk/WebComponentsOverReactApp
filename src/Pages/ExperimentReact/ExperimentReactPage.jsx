import {useEffect, useRef, useState} from "react";
import {experimentSetupManager} from "../../Features/ExperimentSetupManager/ExperimentSetupManager.js";
import {UserCardHandlers} from "../../Features/UserCardHandlers/UserCardHandlers.js";
import avatar from "../../Shared/Assets/UserCircle.svg?no-inline";
import {getMockUsers} from "../../Shared/MockData/UsersData.js";
import CardsPageLayout from "../../Widgets/CardsPageLayout/CardsPageLayout.jsx";
import UserCard from "./UserCard.jsx";

const ExperimentReactPage = () => {
	const [users, setUsers] = useState(getMockUsers(experimentSetupManager.getCardsCount()));
	const startTimeRef = useRef(null);

	useEffect(() => {
		if (startTimeRef.current !== null) {
			const endTime = performance.now();

			const duration = endTime - startTimeRef.current;
			console.log(`Время выполнения операции удаления и обновления интерфейса: ${duration} миллисекунд`);

			startTimeRef.current = null;
		}
	}, [users]);

	const deleteUser = () => {
		const deleteIndex = 0;
		startTimeRef.current = performance.now();
		setUsers(users.toSpliced(deleteIndex, 1));
	};

	return (
		<CardsPageLayout itemsCount={users.length} onDelete={deleteUser}>
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
