import path from "path";
import {BUTTON_ID, DATA_TEST_ID} from "../src/Widgets/CardsPageLayout/Constants.js";
import {selectorById, selectorByTestId} from "./Utils/SelectorUtils.js";

/** Directory where stored experiment reports */
export const REPORTS_DIR = path.join("autotest", "Reports");

/** Collection of experiments */
export const EXPERIMENTS = {
	REACT: 'react',
	WEB_COMPONENTS: 'web-components',
};

/** Collection of element selectors */
export const SELECTOR = {
	insertBtn: selectorById(BUTTON_ID.insert),
	insert1000Btn: selectorById(BUTTON_ID.insert1000),
	deleteBtn: selectorById(BUTTON_ID.delete),
	deleteAllBtn: selectorById(BUTTON_ID.deleteAll),
	swapBtn: selectorById(BUTTON_ID.swap),

	resultTime: selectorByTestId(DATA_TEST_ID.lastOperationDuration),
};
