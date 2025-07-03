import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import defaultApi from '../../api/defaultApi'

const RegisterClient = () => {
	const [form, setForm] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const navigate = useNavigate()

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await defaultApi.post('/auth/register', { ...form, role: 'client' })
			setSuccess('Cuenta creada correctamente. Ahora puedes iniciar sesión.')
			setError('')
		} catch (err) {
			setError(err.response?.data?.message || 'Error al registrar')
			setSuccess('')
		}
	}

	return (
		<Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f3f4f6">
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: '100%',
					maxWidth: 400,
					bgcolor: 'white',
					p: 4,
					borderRadius: 2,
					boxShadow: 3,
				}}
			>
				<Typography variant="h5" align="center" mb={3} fontWeight="bold">
					Crear cuenta
				</Typography>

				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				{success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

				<TextField
					label="Correo"
					name="email"
					fullWidth
					value={form.email}
					onChange={handleChange}
					margin="normal"
				/>
				<TextField
					label="Contraseña"
					name="password"
					type="password"
					fullWidth
					value={form.password}
					onChange={handleChange}
					margin="normal"
				/>

				{success ? (
					<Button
						variant="contained"
						fullWidth
						sx={{ mt: 2 }}
						onClick={() => navigate('/login')}
					>
						Iniciar sesión
					</Button>
				) : (
					<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
						Registrarse
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default RegisterClient
