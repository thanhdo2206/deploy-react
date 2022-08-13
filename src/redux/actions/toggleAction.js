import {
	TOGGLE_FORM_WORKSPACE,
	TOGGLE_FORM_ADD_MEMBERS_TO_WORKSPACE,
} from '../types/toggleType';

export const toggleFormWorkspace = data => {
	return {
		type: TOGGLE_FORM_WORKSPACE,
		payload: data,
	};
};

export const toggleFormAddMemberToWorkspace = data => {
	return {
		type: TOGGLE_FORM_ADD_MEMBERS_TO_WORKSPACE,
		payload: data,
	}
}
