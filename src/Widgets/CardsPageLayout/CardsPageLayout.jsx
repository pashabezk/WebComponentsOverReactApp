import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import {getMockUsers, getRandomUser} from "../../Shared/MockData/UsersData.js";
import {swapRandomElements} from "../../Shared/Utils/CommonUtils.js";
import styles from "./CardsPageLayout.module.css";
import "../../Widgets/UserCard/UserCard.css";

/**
 * @typedef {{operation?: string, duration?: number}} LastOperation
 */

const operations = {
	insert: "insert",
	insert1000: "insert1000",
	delete: "delete",
	deleteAll: "deleteAll",
	swap: "swap",
};

/**
 * Component that encapsulates logic to work with elements
 * @param props component properties
 * @param props.cardsData {MockUser[]} data
 * @param props.setCardsData {React.Dispatch<MockUser[]>} callback to set data
 * @param props.children {React.ReactNode} react children
 * @return {JSX.Element}
 */
const CardsPageLayout = ({cardsData, setCardsData, children}) => {
	const startTimeRef = useRef(null);
	const operationRef = useRef(null);

	/** Stores last card item id. Needed to prevent duplicated id */
	const lastId = useRef(cardsData[cardsData.length - 1]?.id ?? 0);

	/** @type {[LastOperation, React.Dispatch<LastOperation>]} */
	const [lastOperation, setLastOperation] = useState({operation: null, duration: null});

	useEffect(() => {
		if (startTimeRef.current !== null) {
			const endTime = performance.now();
			const duration = endTime - startTimeRef.current;
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

	const deleteAll = () => {
		startTimeRef.current = performance.now();
		operationRef.current = operations.deleteAll;
		setCardsData([]);
	};

	const addItem = () => {
		startTimeRef.current = performance.now();
		operationRef.current = operations.insert;
		const newId = lastId.current + 1;
		lastId.current = newId;
		setCardsData([...cardsData, getRandomUser({withId: newId})]);
	};

	const addSeveralItems = (count = 1000) => {
		startTimeRef.current = performance.now();
		operationRef.current = operations.insert1000;
		const newData = getMockUsers(count, {startId: lastId.current + 1});
		lastId.current = newData[newData.length - 1].id;
		setCardsData([...cardsData, ...newData]);
	};

	const swapRandomItems = () => {
		startTimeRef.current = performance.now();
		operationRef.current = operations.swap;
		setCardsData(swapRandomElements(cardsData));
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
				<div className={styles.buttonBar}>
					<button onClick={addItem}>Insert</button>
					<button onClick={() => addSeveralItems(1000)}>Insert 1000</button>
					<button onClick={deleteItem}>Delete</button>
					<button onClick={deleteAll}>Delete all</button>
					<button onClick={swapRandomItems}>Swap</button>
				</div>
			</div>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
