import {NavLink} from "react-router-dom";
import {RouterPath} from "../../Shared/Constants/RouterConstants.js";
import styles from "./MainPage.module.css";
import ProjectSetup from "./ProjectSetup.jsx";

const MainPage = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Web Components over React App</h1>
			<p><NavLink to={RouterPath.React}>Page with React components</NavLink></p>
			<p><NavLink to={RouterPath.WebComponents}>Page with Web Components</NavLink></p>
			<ProjectSetup/>
		</div>
	);
};

export default MainPage;
