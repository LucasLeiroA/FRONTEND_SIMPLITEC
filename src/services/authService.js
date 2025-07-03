import defaultApi from '../api/defaultApi'

export const loginService = async (email, password) => {
	try {
		const res = await defaultApi.post('/auth/login', { email, password })
		return res.data // contiene el token y tal vez info del usuario
	} catch (error) {
		const message = error?.response?.data?.message || 'Error al iniciar sesión'
		throw new Error(message)
	}
}
