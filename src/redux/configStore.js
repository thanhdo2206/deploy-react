import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProjectReducer from './reducers/ProjectReducer';
import WorkspaceReducer from './reducers/WorkspaceReducer';
import SectionReducer from './reducers/SectionReducer';
import TaskReducer from './reducers/TaskReducer';

import authReducer from './reducers/authReducer';
import toggleReducer from './reducers/toggleReducer';
import reduxThunk from 'redux-thunk';
import filterReducer from './reducers/filterReducer';


const composedEnhances = composeWithDevTools(applyMiddleware(reduxThunk));

const rootReducer = combineReducers({
	WorkspaceReducer,
	ProjectReducer,
	SectionReducer,
	authReducer,
	toggleReducer,
	TaskReducer,
	filterReducer,
});

const store = createStore(
	rootReducer,
	composedEnhances
);

export default store;
