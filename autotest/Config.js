import path from "path";
import {RouterPath} from "../src/Shared/Constants/RouterConstants.js";
import {BUTTON_ID, DATA_TEST_ID} from "../src/Widgets/CardsPageLayout/Constants.js";

/** Directory where stored experiment reports */
export const REPORTS_DIR = path.join("autotest", "Reports");

/** Url for locally run project */
const LOCALE_URL = "http://localhost:5173";

/** Url that uses in fact */
const USED_URL = LOCALE_URL;

/** Valid App URLs collection */
export const URL = {
	MAIN: USED_URL,
	REACT_PAGE: USED_URL + RouterPath.React,
	WEB_COMPONENTS: USED_URL + RouterPath.WebComponents,
};

/** How many times should one test be executed */
export const TEST_REPEAT_COUNT = 3;

const selectorById = (elementId) => "#" + elementId;
const selectorByTestId = (dataTestId) => `[data-test-id='${dataTestId}']`;

/** Collection of element selectors */
export const SELECTOR = {
	insertBtn: selectorById(BUTTON_ID.insert),
	insert1000Btn: selectorById(BUTTON_ID.insert1000),
	deleteBtn: selectorById(BUTTON_ID.delete),
	deleteAllBtn: selectorById(BUTTON_ID.deleteAll),
	swapBtn: selectorById(BUTTON_ID.swap),

	resultTime: selectorByTestId(DATA_TEST_ID.lastOperationDuration),
};
