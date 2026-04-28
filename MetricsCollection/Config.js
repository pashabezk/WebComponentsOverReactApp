import {ROUTER_BASENAME, RouterPath} from "../src/Shared/Constants/RouterConstants.js";
import {EXPERIMENT_OPERATIONS, EXPERIMENTS} from "./Constants.js";

/** Url for locally run project */
const LOCALE_URL = "http://localhost:5173" + ROUTER_BASENAME;

/** Url that uses in fact */
const USED_URL = LOCALE_URL;

/** Valid App URLs collection */
export const URL = {
	MAIN: USED_URL,
	[EXPERIMENTS.REACT]: USED_URL + RouterPath.React,
	[EXPERIMENTS.WEB_COMPONENTS]: USED_URL + RouterPath.WebComponents,
};

/** How many times should one test be executed */
export const TEST_REPEAT_COUNT = 10;

/** How many elements should be rendered on page during experiment */
export const ELEMENTS_ON_PAGE = 10000;

/** Array with experiments which will be tested */
export const EXPERIMENTS_TO_TEST = [EXPERIMENTS.WEB_COMPONENTS, EXPERIMENTS.REACT];

/** Array with operations which will be tested */
export const OPERATIONS_TO_TEST = [
	EXPERIMENT_OPERATIONS.create,
	EXPERIMENT_OPERATIONS.createMany,
	EXPERIMENT_OPERATIONS.appendToLargeAmount,
	EXPERIMENT_OPERATIONS.replaceAll,
	EXPERIMENT_OPERATIONS.partialUpdate,
	EXPERIMENT_OPERATIONS.selectRow,
	EXPERIMENT_OPERATIONS.swap,
	EXPERIMENT_OPERATIONS.remove,
	EXPERIMENT_OPERATIONS.clear,
];

/** Flag for deciding whether to launch the lighthouse or not */
export const RUN_LIGHTHOUSE = true;

/** How many times lighthouse should be run */
export const LIGHTHOUSE_REPEAT_COUNT = TEST_REPEAT_COUNT;

/**
 * Flag to run browser in headless mode.
 * If true browser will be hidden.
 * If false browser will be visible during test execution
 */
export const BROWSER_HEADLESS = true;
