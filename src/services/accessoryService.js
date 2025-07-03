import defaultApi from '../api/defaultApi'


export const getAccessoriesByDealer = (dealerId) =>
  defaultApi.get(`/accesory/dealer/${dealerId}/accessories`);

export const createAccessory = (dealerId, data) =>
  defaultApi.post(`/accesory/dealer/${dealerId}/accessories`, data);

export const updateAccessory = (dealerId, accessoryId, data) =>
  defaultApi.put(`/accesory/dealer/${dealerId}/accessories/${accessoryId}`, data);

export const deleteAccessory = (dealerId, accessoryId) =>
  defaultApi.delete(`/accesory/dealer/${dealerId}/accessories/${accessoryId}`);
