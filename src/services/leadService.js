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


export const getLeadsByDealer = async (dealerId) => {
	const token = localStorage.getItem('token')
	const response = await defaultApi.get(`/leads/dealer/${dealerId}/leads`, {
		headers: { Authorization: token ? `Bearer ${token}` : '' }
	})
	return response.data
}



export const respondLead = async (leadId, responseText) => {
	const token = localStorage.getItem('token')
	const response = await defaultApi.patch(`/leads/leads/${leadId}/respond`, { response: responseText }, {
		headers: { Authorization: token ? `Bearer ${token}` : '' }
	})
	return response.data
}


