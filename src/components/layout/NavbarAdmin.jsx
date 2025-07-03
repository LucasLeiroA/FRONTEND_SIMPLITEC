import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Stack,
    Tooltip,
    IconButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LogoutIcon from '@mui/icons-material/Logout'

const NavbarAdmin = () => {
    const { role, logout, user } = useAuth()
    const navigate = useNavigate()

    const isAdmin = role === 'admin'

    const menuAdmin = [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Concesionarios', path: '/admin/dealers' },
        { label: 'Usuarios', path: '/admin/users' },
        { label: 'Eccommerce', path: '/' },
    ]

    const menuDealer = [
        { label: 'Vehículos', path: '/admin/mis-autos' },
        { label: 'Accesorios', path: '/admin/accesorios' },
        { label: 'Publicaciones', path: '/admin/publicaciones' },
        { label: 'Usuarios', path: '/admin/users' },
        { label: 'Eccommerce', path: '/' }
    ]

    const handleLogout = () => logout()
    const handleNavigate = (path) => navigate(path)

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>


                <Typography variant="h6" fontWeight="bold">
                    SimpliTEC
                    {!isAdmin && user?.dealer?.name && (
                        <Box component="span" sx={{ fontWeight: 'medium', ml: 1 }}>
                            | {user.dealer.name}
                        </Box>
                    )}
                </Typography>

                {/* Menú navegación */}
                <Stack direction="row" spacing={2}>
                    {(isAdmin ? menuAdmin : menuDealer).map(({ label, path }) => (
                        <Button
                            key={path}
                            color="inherit"
                            onClick={() => handleNavigate(path)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: '500',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                        >
                            {label}
                        </Button>
                    ))}




                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Box textAlign="right">
                        {isAdmin ? (
                            <Typography variant="body2" fontWeight="bold">
                                SUPER ADMIN
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="caption">{user?.email}</Typography>
                            </>
                        )}
                    </Box>

                    <Tooltip title="Cerrar sesión">
                        <IconButton color="error" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavbarAdmin
