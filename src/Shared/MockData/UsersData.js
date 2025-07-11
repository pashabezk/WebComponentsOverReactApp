/**
 * @typedef MockUser
 * @type {{surname: string, name: string, id: number}}
 */

/**
 * Array of mock users
 * @type {MockUser[]}
 */
const usersData = [
	{id: 1, name: "Иван", surname: "Иванов"},
	{id: 2, name: "Мария", surname: "Петрова"},
	{id: 3, name: "Алексей", surname: "Сидоров"},
	{id: 4, name: "Анна", surname: "Смирнова"},
	{id: 5, name: "Дмитрий", surname: "Кузнецов"},
	{id: 6, name: "Елена", surname: "Васильева"},
	{id: 7, name: "Сергей", surname: "Попов"},
	{id: 8, name: "Ольга", surname: "Соколова"},
	{id: 9, name: "Андрей", surname: "Лебедев"},
	{id: 10, name: "Наталья", surname: "Новикова"},
	{id: 11, name: "Юрий", surname: "Морозов"},
	{id: 12, name: "Татьяна", surname: "Волкова"},
	{id: 13, name: "Михаил", surname: "Абрамов"},
	{id: 14, name: "Ирина", surname: "Семенова"},
	{id: 15, name: "Николай", surname: "Степанов"},
	{id: 16, name: "Светлана", surname: "Павлова"},
	{id: 17, name: "Владимир", surname: "Федоров"},
	{id: 18, name: "Маргарита", surname: "Зайцева"},
	{id: 19, name: "Олег", surname: "Борисов"},
	{id: 20, name: "Алиса", surname: "Комарова"},
	{id: 21, name: "Георгий", surname: "Гусев"},
	{id: 22, name: "Виктория", surname: "Титова"},
	{id: 23, name: "Константин", surname: "Кузьмин"},
	{id: 24, name: "Яна", surname: "Кудрявцева"},
	{id: 25, name: "Роман", surname: "Баранов"},
	{id: 26, name: "Ксения", surname: "Крылова"},
	{id: 27, name: "Егор", surname: "Михеев"},
	{id: 28, name: "Анастасия", surname: "Григорьева"},
	{id: 29, name: "Павел", surname: "Егоров"},
	{id: 30, name: "Дарья", surname: "Фролова"},
	{id: 31, name: "Григорий", surname: "Козлов"},
	{id: 32, name: "Полина", surname: "Николаева"},
	{id: 33, name: "Артём", surname: "Андреев"},
	{id: 34, name: "Вера", surname: "Орлова"},
	{id: 35, name: "Тимофей", surname: "Денисов"},
	{id: 36, name: "Алина", surname: "Медведева"},
	{id: 37, name: "Максим", surname: "Ильин"},
	{id: 38, name: "Юлия", surname: "Филиппова"},
	{id: 39, name: "Кирилл", surname: "Белов"},
	{id: 40, name: "Мария", surname: "Алексеева"},
	{id: 41, name: "Борис", surname: "Тимофеев"},
	{id: 42, name: "Екатерина", surname: "Калинина"},
	{id: 43, name: "Виктор", surname: "Максимов"},
	{id: 44, name: "София", surname: "Дмитриева"},
	{id: 45, name: "Александр", surname: "Ефимов"},
	{id: 46, name: "Ангелина", surname: "Герасимова"},
	{id: 47, name: "Даниил", surname: "Савельев"},
	{id: 48, name: "Валерия", surname: "Романова"},
	{id: 49, name: "Илья", surname: "Яковлев"},
	{id: 50, name: "Елизавета", surname: "Глебова"},
	{id: 51, name: "Станислав", surname: "Анисимов"},
	{id: 52, name: "Александра", surname: "Чернова"},
	{id: 53, name: "Матвей", surname: "Давыдов"},
	{id: 54, name: "Кристина", surname: "Богданова"},
	{id: 55, name: "Давид", surname: "Воробьев"},
	{id: 56, name: "Ульяна", surname: "Сергеева"},
	{id: 57, name: "Антон", surname: "Захаров"},
	{id: 58, name: "Милена", surname: "Пономарёва"},
	{id: 59, name: "Тимур", surname: "Соловьёв"},
	{id: 60, name: "Алёна", surname: "Голубева"},
	{id: 61, name: "Марк", surname: "Емельянов"},
	{id: 62, name: "Виолетта", surname: "Лазарева"},
	{id: 63, name: "Леонид", surname: "Прохоров"},
	{id: 64, name: "Камилла", surname: "Киселёва"},
	{id: 65, name: "Глеб", surname: "Трофимов"},
	{id: 66, name: "Амелия", surname: "Матвеева"},
	{id: 67, name: "Руслан", surname: "Родионов"},
	{id: 68, name: "Владислава", surname: "Кузнецова"},
	{id: 69, name: "Семён", surname: "Логинов"},
	{id: 70, name: "Ариана", surname: "Сафонова"},
	{id: 71, name: "Никита", surname: "Капустин"},
	{id: 72, name: "Алиса", surname: "Рябова"},
	{id: 73, name: "Фёдор", surname: "Субботин"},
	{id: 74, name: "Анастасия", surname: "Емельянова"},
	{id: 75, name: "Степан", surname: "Терентьев"},
	{id: 76, name: "Алина", surname: "Петрова"},
	{id: 77, name: "Ярослав", surname: "Крылов"},
	{id: 78, name: "Александра", surname: "Никитина"},
	{id: 79, name: "Пётр", surname: "Серов"},
	{id: 80, name: "Анастасия", surname: "Михеева"},
	{id: 81, name: "Вадим", surname: "Тарасов"},
	{id: 82, name: "Арина", surname: "Белкина"},
	{id: 83, name: "Андрей", surname: "Блохин"},
	{id: 84, name: "Амелия", surname: "Горбачёва"},
	{id: 85, name: "Денис", surname: "Гришин"},
	{id: 86, name: "Алиса", surname: "Федотова"},
	{id: 87, name: "Вячеслав", surname: "Шапошников"},
	{id: 88, name: "Александра", surname: "Коновалова"},
	{id: 89, name: "Евгений", surname: "Лапин"},
	{id: 90, name: "Ангелина", surname: "Чернышёва"},
	{id: 91, name: "Захар", surname: "Дорофеев"},
	{id: 92, name: "Алиса", surname: "Ефимова"},
	{id: 93, name: "Мирон", surname: "Исаев"},
	{id: 94, name: "Амелия", surname: "Королёва"},
	{id: 95, name: "Тихон", surname: "Горшков"},
	{id: 96, name: "Александра", surname: "Савина"},
	{id: 97, name: "Прохор", surname: "Лыткин"},
	{id: 98, name: "Алиса", surname: "Меркулова"},
	{id: 99, name: "Назар", surname: "Туров"},
	{id: 100, name: "Амелия", surname: "Дементьева"}
];

/**
 * Function to get users
 * @param count {number} how many users to return
 * @param props extra properties
 * @param props.startId {number} allow to set id from which users will be generated
 * @return {MockUser[]}
 */
export const getMockUsers = (count = usersData.length, {startId = 0} = {}) => {
	const length = usersData.length;
	const amountOfUsers = count + startId;
	const result = [];
	for (let i = startId; i < amountOfUsers; i++) {
		result.push({...structuredClone(usersData[i % length]), id: i});
	}
	return result;
};

/**
 * Function to random get user
 * @param props extra properties
 * @param props.withId {MockUser.id} allow to override id for user
 * @return {MockUser}
 */
export const getRandomUser = ({withId} = {}) => {
	const user = structuredClone(usersData[Math.floor(Math.random() * usersData.length)]);
	if (withId) {
		user.id = withId;
	}
	return user;
};
