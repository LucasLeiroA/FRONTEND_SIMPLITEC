// favoriteService.js

export const getFavoriteStorageKey = () => {
	const userId = localStorage.getItem('userId') || 'guest'
	return `favoriteVehicles_${userId}`
}

export const getFavoriteIds = () => {
	const key = getFavoriteStorageKey()
	try {
		return JSON.parse(sessionStorage.getItem(key)) || []
	} catch {
		return []
	}
}

export const toggleFavoriteId = (vehicleId) => {
	const key = getFavoriteStorageKey()
	let favorites = getFavoriteIds()

	if (favorites.includes(vehicleId)) {
		favorites = favorites.filter(id => id !== vehicleId)
	} else {
		favorites.push(vehicleId)
	}
	sessionStorage.setItem(key, JSON.stringify(favorites))
	return favorites.includes(vehicleId)
}

export const isFavorite = (vehicleId) => {
	return getFavoriteIds().includes(vehicleId)
}
