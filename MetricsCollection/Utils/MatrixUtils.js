/**
 * Function to transpose matrix
 * @param matrix {unknown[][]}
 * @return {unknown[][]}
 */
export const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));

/**
 * Function to create new matrix where all stringified values parsed to numbers
 * @param matrix {string[][]}
 * @return {number[][]}
 */
export const strMatrixToNumeric = (matrix) => matrix.map(row => row.map(n => parseFloat(n)));
