import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

const PublicLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login, user } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        console.log({ user });

        e.preventDefault()
        setError('')
        try {
            await login(email, password)
            if (user?.role === 'admin' || user?.role === 'dealer') {
                navigate('/admin/dashboard')
            } else {
                navigate('/')
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f3f4f6">
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400, bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" align="center" mb={3} fontWeight="bold">Iniciar sesión</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField label="Correo electrónico" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
                <TextField label="Contraseña" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Ingresar</Button>
                <Button onClick={() => navigate('/registro')} fullWidth sx={{ mt: 1 }}>Crear cuenta</Button>
            </Box>
        </Box>
    )
}

export default PublicLogin
