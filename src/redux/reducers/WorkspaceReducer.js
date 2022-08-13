import data from '../../data/Workspaces.json';
import { SET_CURRENT_WORKSPACE } from '../types/WorkspaceTypes';
const { Workspaces } = data;

const initialState = {
	// arrWorkspaces: Workspaces,
	arrWorkspaces: [],

	currentWorkSpace: {},
};

const WorkspaceReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_WORKSPACE: {
			state.currentWorkSpace = { ...action.dataWorkspace };
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default WorkspaceReducer;
