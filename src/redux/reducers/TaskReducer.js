import {
	GET_ALL_TASK_IN_PROJECT,
	GET_ALL_TASK_ORDER_IN_PROJECT,
	UPDATE_DROP_TASK,
	UPDATE_DRAG_TASK,
} from '../types/TaskTypes';

const initialState = {
	arrTask: [],
	taskOrders: [],
};

const TaskReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_TASK_IN_PROJECT:
			state.arrTask = action.dataTasks;
			return { ...state };
		case GET_ALL_TASK_ORDER_IN_PROJECT:
			state.taskOrders = action.taskOrderInProject;
			return { ...state };
		case UPDATE_DRAG_TASK: {
			const taskOrderInSectionDrag = state.taskOrders.find(
				section => section.sectionId === action.sectionDragId
			);

			taskOrderInSectionDrag.taskOrder = action.newTaskOrder;

			state.taskOrders = [...state.taskOrders];

			return { ...state };
		}
		case UPDATE_DROP_TASK: {
			const taskDrop = state.arrTask.find(
				task => task._id === action.taskDrop._id
			);

			taskDrop.sectionId = action.sectionDropId;
			state.arrTask = [...state.arrTask];

			const taskOrderInSectionDrop = state.taskOrders.find(
				section => section.sectionId === action.sectionDropId
			);

			taskOrderInSectionDrop.taskOrder = action.newTaskOrder;

			state.taskOrders = [...state.taskOrders];

			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default TaskReducer;
