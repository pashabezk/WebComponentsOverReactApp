/**
 * Function to generate random integer
 * @param max {number} max value
 * @return {number}
 */
export const generateRandom = (max) => {
	return Math.floor(Math.random() * max);
};

/**
 * Function that creates new array and swaps two random elements in it
 * @template T
 * @param arr {T[]} initial array
 * @return {T[]}
 */
export const swapRandomElements = (arr) => {
	const array = [...arr];

	if (arr.length <= 1) {
		return array;
	}

	const index1 = generateRandom(array.length);
	let index2 = generateRandom(array.length);

	while (index1 === index2) {
		index2 = generateRandom(array.length);
	}

	const temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;

	return array;
};
