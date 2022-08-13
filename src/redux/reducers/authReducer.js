import { LOGIN_START, LOGIN_SUCCESS, LOGIN_CURRENT_USER } from '../types/authTypes';

const initState = {
	currentUser: null,
	isFetching: false,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				isFetching: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isFetching: false,
			};
		case LOGIN_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};

export default authReducer;
