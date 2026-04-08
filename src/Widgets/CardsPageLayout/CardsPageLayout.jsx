import "../../Widgets/UserCard/UserCard.css";
import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import {getMockUsers, getRandomUser} from "../../Shared/MockData/UsersData.js";
import {generateRandom, swapRandomElements} from "../../Shared/Utils/CommonUtils.js";
import styles from "./CardsPageLayout.module.css";
import {BUTTON_ID, DATA_TEST_ID, OPERATIONS} from "./Constants.js";

/**
 * @typedef {{operation?: string, duration?: number}} LastOperation
 */

/**
 * Component that encapsulates logic to work with elements
 * @param props component properties
 * @param props.cardsData {MockUser[]} data
 * @param props.setCardsData {React.Dispatch<MockUser[]>} callback to set data
 * @param props.selectedId {number} selected item id
 * @param props.setSelectedId {React.Dispatch<number>} callback to index for selected item
 * @param props.children {React.ReactNode} react children
 * @return {JSX.Element}
 */
const CardsPageLayout = ({cardsData, setCardsData, selectedId, setSelectedId, children}) => {
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
	}, [cardsData, selectedId]);

	const deleteItem = () => {
		const deleteIndex = 0;
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.delete;
		setCardsData(cardsData.toSpliced(deleteIndex, 1));
	};

	const deleteAll = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.deleteAll;
		setCardsData([]);
	};

	const addItem = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.insert;
		const newId = lastId.current + 1;
		lastId.current = newId;
		setCardsData([...cardsData, getRandomUser({withId: newId})]);
	};

	const addSeveralItems = (count = 1000) => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.insert1000;
		const newData = getMockUsers(count, {startId: lastId.current + 1});
		lastId.current = newData[newData.length - 1].id;
		setCardsData([...cardsData, ...newData]);
	};

	const selectItem = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.select;

		if (cardsData.length === 0) {
			setCardsData([]);
			return;
		}
		if (cardsData.length === 1) {
			setSelectedId(selectedId ? null : cardsData[0].id);
			return;
		}

		let i = generateRandom(cardsData.length);
		const newSelectedId = cardsData[i].id;

		// check to prevent select already selected element
		if (newSelectedId === selectedId) {
			i = i === (cardsData.length - 1) ? i - 1 : i + 1;
		}
		setSelectedId(cardsData[i].id);
	};

	const replaceItems = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.replaceAll;
		const newData = getMockUsers(cardsData.length, {startId: lastId.current + 1});
		lastId.current = newData[newData.length - 1]?.id ?? 0;
		setCardsData(newData);
	};

	const partialUpdate = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.partialUpdate;
		let newId = lastId.current;
		const newData = Array.from(cardsData, (elem, i) => (
			i % 10 === 0 ? getRandomUser({withId: ++newId}) : elem
		));
		lastId.current = newId;
		setCardsData(newData);
	};

	const swapRandomItems = () => {
		startTimeRef.current = performance.now();
		operationRef.current = OPERATIONS.swap;
		setCardsData(swapRandomElements(cardsData));
	};

	return (
		<div className={styles.pageLayout}>
			<NavLink to={RouterPath.Main}>Go to main page</NavLink>
			<div>
				<p>Rendered items: {cardsData.length}</p>
				<p>
					Last operation:{" "}
					{
						lastOperation.operation
							? <>
								<span data-test-id={DATA_TEST_ID.lastOperation}>{lastOperation.operation}</span>{" "}
								(<span data-test-id={DATA_TEST_ID.lastOperationDuration}>{lastOperation.duration.toFixed(3)}</span> ms)
							</>
							: "null"
					}
				</p>
				<div className={styles.buttonBar}>
					<button id={BUTTON_ID[OPERATIONS.insert]} onClick={addItem}>Insert</button>
					<button id={BUTTON_ID[OPERATIONS.insert1000]} onClick={() => addSeveralItems(1000)}>Insert 1000</button>
					<button id={BUTTON_ID[OPERATIONS.delete]} onClick={deleteItem}>Delete</button>
					<button id={BUTTON_ID[OPERATIONS.deleteAll]} onClick={deleteAll}>Delete all</button>
					<button id={BUTTON_ID[OPERATIONS.select]} onClick={selectItem}>Select</button>
					<button id={BUTTON_ID[OPERATIONS.swap]} onClick={swapRandomItems}>Swap</button>
					<button id={BUTTON_ID[OPERATIONS.replaceAll]} onClick={replaceItems}>Replace all</button>
					<button id={BUTTON_ID[OPERATIONS.partialUpdate]} onClick={partialUpdate}>Partial update</button>
				</div>
			</div>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
