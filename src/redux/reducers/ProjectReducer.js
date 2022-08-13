import {
	UPDATE_DROP_TASK,
	UPDATE_DROP_SECTION,
	SET_CURRENT_PROJECT,
	GET_ALL_PROJECT_API,
} from '../types/ProjectTypes';

const initialState = {
	arrProject: [],
	currentProject: {},
};

const ProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PROJECT_API: {
			state.arrProject = action.dataProject;

			return { ...state };
		}
		case SET_CURRENT_PROJECT: {
			state.currentProject = action.dataProject;

			return { ...state };
		}
		case UPDATE_DROP_SECTION: {
			state.currentProject = {
				...state.currentProject,
				sectionOrder: action.newSectionOrder,
			};

			return { ...state };
		}

		case 'ADD_TASK': {
			const { sections } = state.currentProject;
			const { tasks, taskOrder } = sections.find(
				section => section.section_id === action.sectionId
			);

			let newTask = {
				task_id: Date.now().toString(),
				task_name: action.nameNewTask,
				assigne_to: 'Tuan@111.com',
				due_date: '1/1/2000',
				priority: 'red',
				created_by: 'tuan@222.com',
				task_progress: 'pending',
				status: false,
			};

			tasks.push(newTask);
			taskOrder.push(newTask.task_id);

			state.currentProject = {
				...state.currentProject,
			};

			return { ...state };
		}

		default:
			return { ...state };
	}
};

export default ProjectReducer;
