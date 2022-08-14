
import axiosInstance from '../utils/axiosInstance';

export const createNewWorkspace = async data => {
	const { workspaceName, memberEmails, Owner } = data;
	try {
		const response = await axiosInstance({
			method: 'post',
			url: 'ws',
			data: {
				workspaceName: `${workspaceName}`,
				memberEmails: memberEmails,
				Owner: `${Owner}`,
			},
		});
		return response;
	} catch (error) {
		return error.response;
	}
};

export const getAllWorkspaceByUserEmail = async userEmail => {
	try {
		const response = await axiosInstance({
			method: 'get',
			url: `ws/user/${userEmail}`,
		});
		return response;
	} catch (error) {
		return error;
	}
};

export const getWorkspaceById = async workspaceId => {
	try {
		const response = await axiosInstance({
			method: 'get',
			url: `ws/${workspaceId}`,
		});
		return response;
	} catch (error) {
		return error;
	}
};

export const addUserToWorkspace = async data => {
	const { workspaceId, memberEmails } = data;
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: `ws/id/${workspaceId}`,
			data: {
				memberEmails: memberEmails,
			},
		});
		return respone;
	} catch (error) {
		return error;
	}
};
