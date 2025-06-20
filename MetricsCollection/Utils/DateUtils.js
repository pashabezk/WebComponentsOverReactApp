/**
 * Separate date object to constituent elements
 * @param date {Date}
 * @return {{day: string, month: string, year: string, hours: string, minutes: string, seconds: string}}
 */
const elementizeDate = (date = new Date()) => {
	return {
		day: String(date.getDate()).padStart(2, "0"),
		month: String(date.getMonth() + 1).padStart(2, "0"),
		year: date.getFullYear().toString(),
		hours: String(date.getHours()).padStart(2, "0"),
		minutes: String(date.getMinutes()).padStart(2, "0"),
		seconds: String(date.getSeconds()).padStart(2, "0"),
	};
};

/**
 * Return datetime in format `dd.mm.yyyy hh:mm`
 * @param date {Date}
 * @return {string}
 */
export const toFullDateTime = (date = new Date()) => {
	const {day, month, year, hours, minutes, seconds} = elementizeDate(date);
	return `${day}.${month}.${year} ${hours}:${minutes}.${seconds}`;
};

/**
 * Return datetime in format `yyyy_mm_dd__hh_mm` which is convenient to use with sorting
 * @param date {Date}
 * @return {string}
 */
export const toSortOrderedDatetime = (date = new Date()) => {
	const {day, month, year, hours, minutes} = elementizeDate(date);
	return `${year}_${month}_${day}__${hours}_${minutes}`;
};
