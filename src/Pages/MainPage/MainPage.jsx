import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import styles from "./MainPage.module.css";

const MainPage = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Main page</h1>
			<p><NavLink to={RouterPath.React}>Page with React components</NavLink></p>
			<p><NavLink to={RouterPath.WebComponents}>Page with web components</NavLink></p>
		</div>
	);
};

export default MainPage;
