import { SET_CURRENT_WORKSPACE } from '../types/WorkspaceTypes';


export const setCurrentWorkspaceAction = dataWorkspace => {
	let action = {
		type: SET_CURRENT_WORKSPACE,
		dataWorkspace,
	};

	return action;
};
