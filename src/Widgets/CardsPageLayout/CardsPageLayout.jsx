import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import styles from "./CardsPageLayout.module.css";
import "../../Widgets/UserCard/UserCard.css";

const CardsPageLayout = ({children}) => {
	return (
		<div className={styles.pageLayout}>
			<NavLink to={RouterPath.Main}>На главную</NavLink>
			<div className={styles.cardsContainer}>
				{children}
			</div>
		</div>
	);
};

export default CardsPageLayout;
