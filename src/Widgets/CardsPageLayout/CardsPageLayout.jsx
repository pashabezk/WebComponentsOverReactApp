import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import {getRandomUser} from "../../Shared/MockData/UsersData.js";
import styles from "./CardsPageLayout.module.css";
import "../../Widgets/UserCard/UserCard.css";

/**
 * @typedef {{operation?: string, duration?: number}} LastOperation
 */

const operations = {
	delete: "delete",
	insert: "insert",
};

const CardsPageLayout = ({cardsData, setCardsData, children}) => {
	const startTimeRef = useRef(null);
	const operationRef = useRef(null);

	/** @type {[LastOperation, React.Dispatch<LastOperation>]} */
	const [lastOperation, setLastOperation] = useState({operation: null, duration: null});

	useEffect(() => {
		if (startTimeRef.current !== null) {
			const endTime = performance.now();

			const duration = endTime - startTimeRef.current;
			switch (operationRef.current) {
				case operations.delete:
					console.log(`Время выполнения операции удаления и обновления интерфейса: ${duration} миллисекунд`);
					break;
				case operations.insert:
					console.log(`Время выполнения операции вставки и обновления интерфейса: ${duration} миллисекунд`);
					break;
				default:
					console.log("Unknown operation");
			}

			setLastOperation({operation: operationRef.current, duration});
			startTimeRef.current = null;
			operationRef.current = null;
		}
	}, [cardsData]);

	const deleteItem = () => {
		const deleteIndex = 0;
		startTimeRef.current = performance.now();
		operationRef.current = operations.delete;
		setCardsData(cardsData.toSpliced(deleteIndex, 1));
	};

	const addItem = () => {
		startTimeRef.current = performance.now();
		operationRef.current = operations.insert;
		const newData = {
			...getRandomUser(),
			id: (cardsData[cardsData.length - 1]?.id ?? 0) + 1,
		};
		setCardsData([...cardsData, newData]);
	};

	return (
		<div className={styles.pageLayout}>
			<NavLink to={RouterPath.Main}>На главную</NavLink>
			<div>
				<p>Rendered items: {cardsData.length}</p>
				<p>
					Last operation:{" "}
					{
						lastOperation.operation
							? <>
								<span data-test-id="last-operaion">{lastOperation.operation}</span>{" "}
								(<span data-test-id="last-operaion-duration">{lastOperation.duration.toFixed(3)}</span> ms)
							</>
							: <>null</>
					}
				</p>
				<button onClick={addItem}>Insert</button>
				<button onClick={deleteItem}>Delete</button>
			</div>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
