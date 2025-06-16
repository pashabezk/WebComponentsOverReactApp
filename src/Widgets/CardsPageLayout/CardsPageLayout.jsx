import {useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import styles from "./CardsPageLayout.module.css";
import "../../Widgets/UserCard/UserCard.css";

const CardsPageLayout = ({cardsData, setCardsData, children}) => {
	const startTimeRef = useRef(null);

	useEffect(() => {
		if (startTimeRef.current !== null) {
			const endTime = performance.now();

			const duration = endTime - startTimeRef.current;
			console.log(`Время выполнения операции удаления и обновления интерфейса: ${duration} миллисекунд`);

			startTimeRef.current = null;
		}
	}, [cardsData]);

	const deleteItem = () => {
		const deleteIndex = 0;
		startTimeRef.current = performance.now();
		setCardsData(cardsData.toSpliced(deleteIndex, 1));
	};

	return (
		<div className={styles.pageLayout}>
			<NavLink to={RouterPath.Main}>На главную</NavLink>
			<div>
				<p>Rendered items: {cardsData.length}</p>
				<button onClick={deleteItem}>Delete</button>
			</div>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
