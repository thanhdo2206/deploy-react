import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_CURRENT_USER,
} from '../types/authTypes';

export const loginStart = () => {
	return {
		type: LOGIN_START,
	};
};

export const loginSuccess = () => {
	return {
		type: LOGIN_SUCCESS,
	};
};

export const loginCurrentUser = data => {
	return {
		type: LOGIN_CURRENT_USER,
		payload: data,
	};
};
