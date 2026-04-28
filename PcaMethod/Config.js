/** Determines if the metric parsing step should run */
export const EXECUTE_PARSE_METRIC_STEP = false;

/**
 * URL where benchmark results stored.
 *
 * Here you can see list of benchmark runs https://krausest.github.io/js-framework-benchmark
 *
 * Or use this link for set latest run: https://krausest.github.io/js-framework-benchmark/current.html
 */
export const PARSE_METRICS_URL = "https://krausest.github.io/js-framework-benchmark/2026/chrome146_2.html";

/**
 * Parsed metrics storage file:
 * used as output file if {@link EXECUTE_PARSE_METRIC_STEP} enabled,
 * or as input if {@link EXECUTE_PARSE_METRIC_STEP} disabled
 *
 * Note: you can set this name as `null` or `undefined` for autogenerate name for first time script execution
 */
export const PARSED_METRICS_FILENAME = "Parse_metrics_result_2026_04_27__23_58.json";

/**
 * Filename for output file result from script in `MetricsCollection` folder.
 * Metrics from this file used to apply PCA method to local results and calculate
 * values of principal components for local experiment.
 *
 * To receive this file you should firstly execute node script: `collect-metrics`
 */
export const METRICS_COLLECTION_FILENAME = "Metric_collection_result_2026_04_26__23_55.json";
