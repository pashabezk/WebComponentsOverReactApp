import {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GhPagesRedirector from "../Features/GitHubPages/GhPagesRedirector.js";
import ExperimentReactPage from "../Pages/ExperimentReact/ExperimentReactPage.jsx";
import ExperimentWCPage from "../Pages/ExperimentWC/ExperimentWCPage.jsx";
import MainPage from "../Pages/MainPage/MainPage.jsx";
import {ROUTER_BASENAME, RouterPath} from "../Shared/Constants/RouterConstants.js";
import {registerWebComponents} from "./WebComponentsRegistry.js";

const App = () => {
	useEffect(registerWebComponents, []);

	return (
		<BrowserRouter basename={ROUTER_BASENAME}>
			<GhPagesRedirector/>
			<Routes>
				<Route path={RouterPath.Main} element={<MainPage/>}/>
				<Route path={RouterPath.React} element={<ExperimentReactPage/>}/>
				<Route path={RouterPath.WebComponents} element={<ExperimentWCPage/>}/>
				<Route path="*" element={<Navigate to={RouterPath.Main}/>}/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
