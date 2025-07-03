import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { login } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			await login(email, password)
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			bgcolor="#f3f4f6"
		>
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
					Ingreso al panel
				</Typography>

				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

				<TextField
					label="Correo electrónico"
					variant="outlined"
					fullWidth
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					margin="normal"
					required
				/>

				<TextField
					label="Contraseña"
					variant="outlined"
					fullWidth
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					margin="normal"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 2 }}
				>
					Ingresar
				</Button>
			</Box>
		</Box>
	)
}

export default Login
