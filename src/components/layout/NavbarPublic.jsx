import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDealer } from '../../context/DealerContext'
import {
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	Tooltip,
	Box,
	Typography,
	Button,
	Badge
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LoginIcon from '@mui/icons-material/Login'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useState, useEffect } from 'react'
import { getAllDealers } from '../../services/dealerService'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useLocation } from 'react-router-dom'

const NavbarPublic = () => {
	const { user, logout } = useAuth()
	const { selectedDealer, setSelectedDealer } = useDealer()
	const [dealers, setDealers] = useState([])
	const [dealerMenuAnchor, setDealerMenuAnchor] = useState(null)
	const [userMenuAnchor, setUserMenuAnchor] = useState(null)
	const navigate = useNavigate()
	const location = useLocation()


	useEffect(() => {
		const fetchDealers = async () => {
			try {
				const data = await getAllDealers()
				setDealers(data)
				if (!selectedDealer && data.length > 0) {
					const fromStorage = localStorage.getItem('selectedDealer')
					if (fromStorage) {
						setSelectedDealer(JSON.parse(fromStorage))
					} else {
						setSelectedDealer(data[0])
						localStorage.setItem('selectedDealer', JSON.stringify(data[0]))
					}
				}
			} catch (err) {
				console.error('Error cargando concesionarios:', err)
			}
		}
		fetchDealers()
	}, [])

	const handleDealerMenuOpen = (event) => setDealerMenuAnchor(event.currentTarget)
	const handleDealerMenuClose = () => setDealerMenuAnchor(null)

	const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget)
	const handleUserMenuClose = () => setUserMenuAnchor(null)

	const handleDealerSelect = (dealer) => {
		setSelectedDealer(dealer)
		localStorage.setItem('selectedDealer', JSON.stringify(dealer))
		handleDealerMenuClose()
	}

	const handleLogout = async () => {
		await logout()
		handleUserMenuClose()
		navigate('/')
	}

	return (
		<header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200 font-montserrat">
			<div className="flex items-center gap-4">
				<Link to="/">
					<img
						src="/src/assets/logo.png"
						alt="SimpliTEC"
						className="h-10 md:h-12 w-auto"
					/>
				</Link>


				{selectedDealer && (
					<>
						<Tooltip title="Seleccionar concesionario">
							<Button
								onClick={handleDealerMenuOpen}
								endIcon={<ArrowDropDownIcon />}
								startIcon={<LocationOnIcon />}
								sx={{
									textTransform: 'none',
									fontWeight: 500,
									color: '#1e1e1e',
									fontSize: '14px',
									minWidth: 'unset',
									padding: '4px 8px',
								}}
							>
								{selectedDealer.name}
							</Button>
						</Tooltip>

						<Menu
							anchorEl={dealerMenuAnchor}
							open={Boolean(dealerMenuAnchor)}
							onClose={handleDealerMenuClose}
						>
							{dealers.map((dealer) => (
								<MenuItem
									key={dealer.id}
									onClick={() => handleDealerSelect(dealer)}
									selected={dealer.id === selectedDealer.id}
								>
									{dealer.name}
								</MenuItem>
							))}
						</Menu>
					</>
				)}
			</div>

			<div className="flex items-center gap-6 text-[15px] font-medium text-[#1e1e1e]">
				<nav className="flex gap-6 text-xl font-semibold">
					<Link
						to="/"
						className={`transition-colors ${location.pathname === '/' ? 'text-[#3056d3]' : 'text-[#1e1e1e] hover:text-[#3056d3]'
							}`}
					>
						Inicio
					</Link>
					<Link
						to="/novedades"
						className={`transition-colors ${location.pathname.startsWith('/novedades') ? 'text-[#3056d3]' : 'text-[#1e1e1e] hover:text-[#3056d3]'
							}`}
					>
						Novedades
					</Link>
					<Link
						to="/ofertas"
						className={`transition-colors ${location.pathname.startsWith('/ofertas') ? 'text-[#3056d3]' : 'text-[#1e1e1e] hover:text-[#3056d3]'
							}`}
					>
						Últimas ofertas
					</Link>
					<Link
						to="/nosotros"
						className={`transition-colors ${location.pathname.startsWith('/nosotros') ? 'text-[#3056d3]' : 'text-[#1e1e1e] hover:text-[#3056d3]'
							}`}
					>
						Sobre nosotros
					</Link>
				</nav>


				<Box className="h-8 w-[2px] bg-gray-400" />

				<Tooltip title="Favoritos">
					<IconButton onClick={() => navigate('/favoritos')}>
						<Badge badgeContent={0} color="error">
							<FavoriteIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				{user ? (
					<>
						<Tooltip title={user.email}>
							<IconButton onClick={handleUserMenuOpen}>
								<Avatar sx={{ width: 32, height: 32 }} />
							</IconButton>
						</Tooltip>
						<Menu
							anchorEl={userMenuAnchor}
							open={Boolean(userMenuAnchor)}
							onClose={handleUserMenuClose}
						>
							<Box px={2} pt={1}>
								<Typography variant="body2" fontWeight="bold">{user.email}</Typography>
							</Box>
							{(user.role === 'admin' || user.role === 'dealer') && (
								<MenuItem onClick={() => {
									const target = user.role === 'admin' ? '/admin/dashboard' : '/admin/mis-autos'
									navigate(target)
									handleUserMenuClose()
								}}>
									Ir al Panel
								</MenuItem>
							)}
							<MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
						</Menu>
					</>
				) : (
					<Tooltip title="Iniciar sesión">
						<IconButton onClick={() => navigate('/login')}>
							<LoginIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>

		</header>

	)
}

export default NavbarPublic
