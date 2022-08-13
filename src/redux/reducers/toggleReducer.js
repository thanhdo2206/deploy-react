import {
	TOGGLE_FORM_WORKSPACE,
	TOGGLE_FORM_ADD_MEMBERS_TO_WORKSPACE,
} from '../types/toggleType';

const initState = {
	isToggleFormWorkspace: false,
	isToggleFormAddMemberToWorkspace: false,
};

const toggleReducer = (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_FORM_WORKSPACE:
			return {
				...state,
				isToggleFormWorkspace: action.payload,
			};
		case TOGGLE_FORM_ADD_MEMBERS_TO_WORKSPACE:
			return {
				...state,
				isToggleFormAddMemberToWorkspace: action.payload,
			};
		default:
			return {
				...state,
			};
	}
};

export default toggleReducer;
