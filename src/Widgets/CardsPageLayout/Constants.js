/** Available operations */
export const OPERATIONS = {
	insert: "insert",
	insert1000: "insert1000",
	delete: "delete",
	deleteAll: "deleteAll",
	swap: "swap",
};

export const DATA_TEST_ID = {
	lastOperation: "last-operation",
	lastOperationDuration: "last-operation-duration",
};

export const BUTTON_ID = {
	[OPERATIONS.insert]: "btn-insert",
	[OPERATIONS.insert1000]: "btn-insert1000",
	[OPERATIONS.delete]: "btn-delete",
	[OPERATIONS.deleteAll]: "btn-deleteAll",
	[OPERATIONS.swap]: "btn-swap",
};
