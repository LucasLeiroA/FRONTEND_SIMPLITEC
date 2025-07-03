import defaultApi from '../api/defaultApi'

export const createLead = async (dealerId, data) => {
	const token = localStorage.getItem('token')

	const response = await defaultApi.post(`/leads/dealer/${dealerId}/leads`, data, {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	})

	return response.data
}
