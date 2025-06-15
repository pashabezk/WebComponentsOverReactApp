import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import styles from "./CardsPageLayout.module.css";
import "../../Widgets/UserCard/UserCard.css";

const CardsPageLayout = ({itemsCount, children, onDelete}) => {
	return (
		<div className={styles.pageLayout}>
			<NavLink to={RouterPath.Main}>На главную</NavLink>
			<div>
				<p>Rendered items: {itemsCount}</p>
				<button onClick={onDelete}>Delete</button>
			</div>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
