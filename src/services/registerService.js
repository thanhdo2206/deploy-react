import requestApi from '../utils/requestApi';

export const registerService = async dataUser => {
	try {
		const respone = await requestApi({
			method: 'post',
			url: 'auth/register',
			data: {
				...dataUser,
			},
		});
		return respone;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};
