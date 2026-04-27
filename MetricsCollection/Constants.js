import path from "path";
import {DATA_TEST_ID as MAIN_PAGE_IDS} from "../src/Pages/MainPage/Constants.js";
import {BUTTON_ID, DATA_TEST_ID, OPERATIONS} from "../src/Widgets/CardsPageLayout/Constants.js";
import {selectorById, selectorByTestId} from "./Utils/SelectorUtils.js";

/** Directory where stored experiment reports */
export const REPORTS_DIR = path.join("Reports");

/** Collection of experiments */
export const EXPERIMENTS = {
	REACT: 'react',
	WEB_COMPONENTS: 'web-components',
};

/**
 * Available operations in experiment.
 *
 * Note: this operation codes is different from the {@link OPERATIONS},
 * because some experiment operations require preliminary configuration
 */
export const EXPERIMENT_OPERATIONS = {
	create: 'create',
	createMany: 'createMany',
	appendToLargeAmount: 'appendToLargeAmount',
	replaceAll: 'replaceAll',
	partialUpdate: 'partialUpdate',
	selectRow: 'selectRow',
	swap: 'swap',
	remove: 'remove',
	clear: 'clear',
};

/** Mapper for experiment name with operation button id */
export const EXPERIMENT_OPERATION_BTN_ID = {
	[EXPERIMENT_OPERATIONS.create]: BUTTON_ID[OPERATIONS.insert1000],
	[EXPERIMENT_OPERATIONS.createMany]: BUTTON_ID[OPERATIONS.insert10_000],
	[EXPERIMENT_OPERATIONS.appendToLargeAmount]: BUTTON_ID[OPERATIONS.insert1000],
	[EXPERIMENT_OPERATIONS.replaceAll]: BUTTON_ID[OPERATIONS.replaceAll],
	[EXPERIMENT_OPERATIONS.partialUpdate]: BUTTON_ID[OPERATIONS.partialUpdate],
	[EXPERIMENT_OPERATIONS.selectRow]: BUTTON_ID[OPERATIONS.select],
	[EXPERIMENT_OPERATIONS.swap]: BUTTON_ID[OPERATIONS.swap],
	[EXPERIMENT_OPERATIONS.remove]: BUTTON_ID[OPERATIONS.delete],
	[EXPERIMENT_OPERATIONS.clear]: BUTTON_ID[OPERATIONS.deleteAll],
};

/** Collection of element selectors */
export const SELECTOR = {
	insertBtn: selectorById(BUTTON_ID.insert),
	insert1000Btn: selectorById(BUTTON_ID.insert1000),
	deleteBtn: selectorById(BUTTON_ID.delete),
	deleteAllBtn: selectorById(BUTTON_ID.deleteAll),
	swapBtn: selectorById(BUTTON_ID.swap),

	resultTime: selectorByTestId(DATA_TEST_ID.lastOperationDuration),

	linkToReactPage: selectorByTestId(MAIN_PAGE_IDS.linkToReactPage),
	linkToWcPage: selectorByTestId(MAIN_PAGE_IDS.linkToWcPage),

	elementsAmountInput: selectorByTestId(MAIN_PAGE_IDS.elementsAmountInput),
};
