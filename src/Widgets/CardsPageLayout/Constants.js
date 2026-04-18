/** Available operations */
export const OPERATIONS = {
	insert: "insert",
	insert1000: "insert1000",
	insert10_000: "insert10_000",
	delete: "delete",
	deleteAll: "deleteAll",
	select: "select",
	swap: "swap",
	replaceAll: "replaceAll",
	partialUpdate: "partialUpdate",
};

export const DATA_TEST_ID = {
	lastOperation: "last-operation",
	lastOperationDuration: "last-operation-duration",
};

export const BUTTON_ID = {
	[OPERATIONS.insert]: "btn-insert",
	[OPERATIONS.insert1000]: "btn-insert1000",
	[OPERATIONS.insert10_000]: "btn-insert10_000",
	[OPERATIONS.delete]: "btn-delete",
	[OPERATIONS.deleteAll]: "btn-deleteAll",
	[OPERATIONS.select]: "btn-select",
	[OPERATIONS.swap]: "btn-swap",
	[OPERATIONS.replaceAll]: "btn-replaceAll",
	[OPERATIONS.partialUpdate]: "btn-partialUpdate",
};
