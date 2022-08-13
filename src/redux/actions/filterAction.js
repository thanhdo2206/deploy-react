import {
	FILTER_BY_ASSIGNEE,
	FILTER_BY_DUE_DATE,
	FILTER_BY_CREATED_BY,
	FILTER_BY_PRIORITY,
	FILTER_RESET,
	FILTER_BY_STATUS,
} from '../types/filterType';

export const filterByAssignee = data => {
	return {
		type: FILTER_BY_ASSIGNEE,
		payload: data,
	};
};

export const filterByCreatedBy = data => {
	return {
		type: FILTER_BY_CREATED_BY,
		payload: data,
	};
};

export const filterReset = () => {
	return {
		type: FILTER_RESET,
	};
};

export const filterByPriority = data => {
	return {
		type: FILTER_BY_PRIORITY,
		payload: data,
	};
};

export const filterByDueDate = data => {
	return {
		type: FILTER_BY_DUE_DATE,
		payload: data,
	};
};
export const filterbyStatus = data => {
	return {
		type: FILTER_BY_STATUS,
		payload: data,
	};
};
