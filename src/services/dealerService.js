import defaultApi from '../api/defaultApi'

export const getAllDealers = async () => {
    const res = await defaultApi.get('/dealers')
    return res.data
}

export const createDealer = async (data) => {
    const res = await defaultApi.post('/dealers', data)
    return res.data
}

export const updateDealer = async (id, data) => {
    const res = await defaultApi.put(`/dealers/${id}`, data)
    return res.data
}

export const deleteDealer = async (id) => {
    const res = await defaultApi.delete(`/dealers/${id}`)
    return res.data
}
