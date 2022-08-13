import requestApi from '../utils/requestApi';

export const login = async (data) => {
    try {
        const respone = await requestApi({
            method: 'post',
            url: 'auth/login',
            data: {
                email: `${data.email}`,
                password: `${data.password}`,
            },
        })
        return respone
    } catch (error) {
        return error.response
    }
}

