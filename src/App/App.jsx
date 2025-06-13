import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExperimentReactPage from "../Pages/ExperimentReact/ExperimentReactPage.jsx";
import ExperimentWCPage from "../Pages/ExperimentWC/ExperimentWCPage.jsx";
import MainPage from "../Pages/MainPage/MainPage.jsx";
import {RouterPath} from "../Shared/Constants/RouterConstants.js";
import {registerWebComponents} from "./WebComponentsRegistry.js";

const App = () => {
	useEffect(registerWebComponents, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={RouterPath.Main} element={<MainPage/>}/>
				<Route path={RouterPath.React} element={<ExperimentReactPage/>}/>
				<Route path={RouterPath.WebComponents} element={<ExperimentWCPage/>}/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
