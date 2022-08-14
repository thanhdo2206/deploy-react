import axiosInstance from '../utils/axiosInstance';


export const getAllProjectInWorkspaceService = async worksapceId => {
	const  jsonOwner = localStorage.getItem('auth');
	const  Owner = JSON.parse(jsonOwner);
	const idOwner = Owner._id;

	try {
		const respone = await axiosInstance({
			method: 'get',
			url: `ps/${worksapceId}/${idOwner}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const createProjectService = async dataProject => {
	try {
		const respone = await axiosInstance({
			method: 'post',
			url: 'ps',
			data: {
				...dataProject,
			},
		});
		return respone;
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};

export const archiveProjectService = async projectId => {
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: `ps/project/${projectId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};

export const unArchiveProjectService = async projectId => {
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: `ps/project/2/${projectId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};


export const getProjectService = async projectId => {
	try {
		const respone = await axiosInstance({
			method: 'get',
			url: `project/${projectId}`,
		});
		return respone;
		
		
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};


export const updateDropSectionService = async (newSectionOrder,projectId) => {
	// console.log('newSectionOrder',newSectionOrder);
	
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: 'ps/project',
			data: {
				sectionOrder : newSectionOrder,
				projectId : projectId
			}
		});
		return respone;
		
		
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};


export const updateTitleProjectService = async dataProject => {
	try {
		const respone = await axiosInstance({
			method: 'patch',
			url: 'ps/project/1',
			data: {
				projectName : dataProject.projectName,
				projectId : dataProject._id
			}
		});
		return respone;
	} catch (error) {
		console.log(error.response);

		// return error.response;
	}
};
