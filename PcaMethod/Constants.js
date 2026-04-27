import {EXPERIMENT_OPERATIONS} from "../MetricsCollection/Constants.js";

/**
 * Mapper for operations names.
 * Key is operation name from parsed data.
 * Value is local experiment operation name
 */
export const OPERATION_NAME_MAPPER = {
	"create rows": EXPERIMENT_OPERATIONS.create,
	"replace all rows": EXPERIMENT_OPERATIONS.replaceAll,
	"partial update": EXPERIMENT_OPERATIONS.partialUpdate,
	"select row": EXPERIMENT_OPERATIONS.selectRow,
	"swap rows": EXPERIMENT_OPERATIONS.swap,
	"remove row": EXPERIMENT_OPERATIONS.remove,
	"create many rows": EXPERIMENT_OPERATIONS.createMany,
	"append rows to large table": EXPERIMENT_OPERATIONS.appendToLargeAmount,
	"clear rows": EXPERIMENT_OPERATIONS.clear,
};
