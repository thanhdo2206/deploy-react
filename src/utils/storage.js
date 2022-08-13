export const getValueStorage = key => {
	let currentValue = JSON.parse(localStorage.getItem(key));
	return currentValue;
};

export const storeValueStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const deleteValueStorage = key => {
	localStorage.removeItem(key);
};
