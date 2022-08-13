import {
	FILTER_BY_ASSIGNEE,
	FILTER_BY_DUE_DATE,
	FILTER_BY_CREATED_BY,
	FILTER_BY_PRIORITY,
	FILTER_RESET,
	FILTER_BY_STATUS,
} from '../types/filterType';

const initialState = {
	filterStatus: 2,
	filterCustom: {
		assigneTo: '',
		dueDate: '',
		priorityValue: '',
		createdBy: '',
	},
};

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_BY_ASSIGNEE:
			return {
				...state,
				filterCustom: {
					...state.filterCustom,
					assigneTo: action.payload,
				},
			};
		case FILTER_BY_CREATED_BY:
			return {
				...state,
				filterCustom: {
					...state.filterCustom,
					createdBy: action.payload,
				},
			};
		case FILTER_BY_PRIORITY:
			return {
				...state,
				filterCustom: {
					...state.filterCustom,
					priorityValue: action.payload,
				},
			};
		case FILTER_BY_DUE_DATE:
			return {
				...state,
				filterCustom: {
					...state.filterCustom,
					dueDate: action.payload,
				},
			};
		case FILTER_BY_STATUS: {
			return {
				...state,
				filterStatus: action.payload,
			};
		}
		case FILTER_RESET:
			return {
				...state,
				filterCustom: {
					...state.filterCustom,
					assigneTo: '',
					dueDate: '',
					priorityValue: '',
					createdBy: '',
				},
			};
		default:
			return { ...state };
	}
};

export default filterReducer;
