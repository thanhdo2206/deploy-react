import axiosInstance from '../utils/axiosInstance';


export const getAllSectionService = async projectId => {
	try {
		const respone = await axiosInstance({
			method: 'get',
			url: `section/${projectId}`,
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const addSectionService = async newSection => {
	try {
		const respone = await axiosInstance({
			method: 'post',
			url: 'section',
			data : {...newSection}
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
};

export const updateTitleSectionService = async dataSection =>{
	try {
		const respone = await axiosInstance({
			method: 'patch',
			url: 'section/3',
			data : {...dataSection}
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
}

export const archiveSectionService = async sectionId =>{
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: 'section/2',
			data : {sectionId:sectionId}
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
}


export const UnarchiveSectionService = async sectionId =>{
	try {
		const respone = await axiosInstance({
			method: 'put',
			url: 'section/4',
			data : {sectionId:sectionId}
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		// return error.response;
	}
}


