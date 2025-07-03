import defaultApi from '../api/defaultApi'

export const getAllUsers = async () => {
	const res = await defaultApi.get('/auth')
	return res.data
}

export const createUser = async (data) => {
	const res = await defaultApi.post('/auth/register', data)
	return res.data
}

export const updateUser = async (id, data) => {
	const res = await defaultApi.put(`/auth/${id}`, data)
	return res.data
}

export const deleteUser = async (id) => {
	const res = await defaultApi.delete(`/auth/${id}`)
	return res.data
}


export const getUsersByDealerId = async (dealerId) => {
	const res = await defaultApi.get(`/auth/dealer/${dealerId}`)
	return res.data
}
