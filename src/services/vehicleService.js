import defaultApi from "../api/defaultApi"

export const createVehicle = async (formData) => {
    const res = await defaultApi.post(`/vehicles`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

export const getVehiclesByDealerId = async (dealerId) => {
    const res = await defaultApi.get(`/vehicles/dealers/${dealerId}`)
    return res.data
}

export const getVehicleById = async (dealerId, vehicleId) => {
    const res = await defaultApi.get(`/vehicles/dealers/${dealerId}/${vehicleId}`)
    return res.data
}

export const updateVehicle = async (dealerId, vehicleId, formData) => {
    const res = await defaultApi.put(`/vehicles/${dealerId}/${vehicleId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

export const deleteVehicle = async (dealerId, vehicleId) => {
    const res = await defaultApi.delete(`/vehicles/dealers/${dealerId}/${vehicleId}`)
    return res.data
}
