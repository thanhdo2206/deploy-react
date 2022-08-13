import { weekday, months, monthAbbreviate } from '../constants/constants';

export const getDate = () => {
	const today = new Date();

	let dayOfWeek = weekday[today.getDay()];

	let curMonth = months[today.getMonth()];
	let dayOfMonth = today.getDate();

	let textToday = `${dayOfWeek}, ${curMonth} ${dayOfMonth}`;
	return textToday;
};

export const showDateInDateInput = value => {
	if (value) {
		const day = value.slice(8, 10);
		const month = value.slice(4, 7);
		const year = value.slice(11, 15);
		const newMonth = monthAbbreviate.indexOf(month).toString();
		const date = `${year}-0${newMonth}-${day}`;
		return date;
	}
	return '';
};

export const convertDateFromDataBase = value => {
	const date = value.slice(0, 10);
	return date;
};

export const convertDateToValue = value => {
	if (value) {
		const day = value.slice(8, 10);
		const month = value.slice(6, 7);
		const newDate = `${monthAbbreviate[month]} ${day}`;
		return newDate;
	}
	return '';
};

export const showDate = (startDate, dueDate) => {
	if (startDate && !dueDate) {
		const valueStartDate = convertDateToValue(startDate);

		return valueStartDate;
	}

	if (!startDate && dueDate) {
		const valueDueDate = convertDateToValue(dueDate);

		return valueDueDate;
	}

	if (startDate && dueDate) {
		const valueStartDate = convertDateToValue(startDate);
		const valueDueDate = convertDateToValue(dueDate);

		const date = `${valueStartDate} - ${valueDueDate}`;
		return date;
	}
	return '';
};



export const filterDate = (taskList, filterDueDate) => {
	const currentDay = new Date();
	switch (filterDueDate) {
		case 'Due Before Today':
			const yeseteday = new Date();
			yeseteday.setDate(currentDay.getDate() - 1);
			taskList = taskList.filter(item => {
				const dueDate = new Date(item.dueDate);
				return (
					dueDate.getDate() === yeseteday.getDate() &&
					dueDate.getMonth() === yeseteday.getMonth() &&
					dueDate.getFullYear() === yeseteday.getFullYear()
				);
			});
			return taskList;
		case 'Due Today':
			const today = new Date();
			taskList = taskList.filter(item => {
				const dueDate = new Date(item.dueDate);
				return (
					dueDate.getDate() === today.getDate() &&
					dueDate.getMonth() === today.getMonth() &&
					dueDate.getFullYear() === today.getFullYear()
				);
			});
			return taskList;
		case 'Due Tomorrow':
			const tomorrow = new Date();
			tomorrow.setDate(currentDay.getDate() + 1);
			taskList = taskList.filter(item => {
				const dueDate = new Date(item.dueDate);
				return (
					dueDate.getDate() === tomorrow.getDate() &&
					dueDate.getMonth() === tomorrow.getMonth() &&
					dueDate.getFullYear() === tomorrow.getFullYear()
				);
			});
			return taskList;
		case 'Due This Week':
			const firstDayOfWeek = new Date();
			const lastDayOfWeek = new Date();
			firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
			lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
			taskList = taskList.filter(item => {
				const dueDate = new Date(item.dueDate);
				return (
					firstDayOfWeek.getDate() <= dueDate.getDate() &&
					dueDate.getDate() <= lastDayOfWeek.getDate() &&
					dueDate.getMonth() === currentDay.getMonth() && 
					dueDate.getFullYear() === currentDay.getFullYear()
				);
			});
			return taskList;
		case 'Due Next Week':
			const firstDayOfNextWeek = new Date();
			const lastDayOfNextWeek = new Date();
			firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() - firstDayOfNextWeek.getDay() + 7);
			lastDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 6);
			taskList = taskList.filter(item => {
				const dueDate = new Date(item.dueDate);
				return (
					firstDayOfNextWeek.getDate() <= dueDate.getDate() &&
					dueDate.getDate() <= lastDayOfNextWeek.getDate() &&
					dueDate.getMonth() === currentDay.getMonth() && 
					dueDate.getFullYear() === currentDay.getFullYear()
				);
			});
			return taskList;
		default:
			return taskList;
	}
};