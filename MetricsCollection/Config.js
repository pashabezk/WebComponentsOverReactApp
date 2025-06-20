import {RouterPath} from "../src/Shared/Constants/RouterConstants.js";
import {OPERATIONS} from "../src/Widgets/CardsPageLayout/Constants.js";
import {EXPERIMENTS} from "./Constants.js";

/** Url for locally run project */
const LOCALE_URL = "http://localhost:5173";

/** Url that uses in fact */
const USED_URL = LOCALE_URL;

/** Valid App URLs collection */
export const URL = {
	MAIN: USED_URL,
	[EXPERIMENTS.REACT]: USED_URL + RouterPath.React,
	[EXPERIMENTS.WEB_COMPONENTS]: USED_URL + RouterPath.WebComponents,
};

/** How many times should one test be executed */
export const TEST_REPEAT_COUNT = 3;

/** Array with experiments which will be tested */
export const EXPERIMENTS_TO_TEST = [EXPERIMENTS.REACT, EXPERIMENTS.WEB_COMPONENTS];

/** Array with operations which will be tested */
export const OPERATIONS_TO_TEST = [OPERATIONS.insert, OPERATIONS.delete, OPERATIONS.swap];

/**
 * Flag to run browser in headless mode.
 * If true browser will be hidden.
 * If false browser will be visible during test execution
 */
export const BROWSER_HEADLESS = true;
