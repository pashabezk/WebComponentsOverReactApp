/**
 * Function to transpose matrix
 * @param matrix {unknown[][]}
 * @return {unknown[][]}
 */
export const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));
