import requestApi from '../utils/requestApi';

export const getAllTaskInProjectService = async projectId => {
	try {
		const respone = await requestApi({
			method: 'get',
			url: `task/8/${projectId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const assignTaskService = async (taskUpdate, taskUpdateId) => {
	try {
		const respone = await requestApi({
			method: 'put',
			url: `task/${taskUpdateId}`,
			data: { ...taskUpdate },
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const updateTaskService = async task => {
	try {
		
		const taskUpdate = {
			taskName: task.taskName,
			description: task.description,
			assigneTo: task.assigneTo === null ? '' : task.assigneTo.email,
			startDate: task.startDate === null ? '' : task.startDate,
			dueDate: task.dueDate === null ? '' : task.dueDate,
			priorityValue: task.priorityValue,
			sectionId: task.sectionId,
		};
		
		const respone = await requestApi({
			method: 'put',
			url: `task/${task._id}`,
			data: {...taskUpdate},
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const updateTaskOrderInSectionService  = async data => {
	try {
		const respone = await requestApi({
			method: 'put',
			url: 'section',
			data: { taskOrder: data.newTaskOrder, sectionId: data.sectionId },
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const completeTaskService = async taskId => {
	try {
		const respone = await requestApi({
			method: 'put',
			url: `task/5/${taskId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
	}
};

export const createTaskService = async taskCreate => {
	try {
		const respone = await requestApi({
			method: 'post',
			url: `task`,
			data: taskCreate,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
	}
};

export const updateTitleTaskService = async data => {
	try {
		const respone = await requestApi({
			method: 'patch',
			url: `task/1`,
			data: {
				taskId: data.taskId,
				taskName: data.taskName,
			},
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

