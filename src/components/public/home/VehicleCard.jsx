import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Stack,
	Divider,
	IconButton,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DoorFrontIcon from '@mui/icons-material/DoorFront'
import SettingsIcon from '@mui/icons-material/Settings'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isFavorite, toggleFavoriteId } from '../../../services/favoriteService'

const VehicleCard = ({ vehicle }) => {
	const { id, brand, model, price, year, transmission, bodyType, doors } = vehicle
	const image = vehicle.images?.[0]?.url || '/placeholder.jpg'
	const formattedPrice = `$ ${price.toLocaleString()}`
	const downPayment = `$ ${Math.round(price * 0.1).toLocaleString()}`

	const [favorite, setFavorite] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		setFavorite(isFavorite(id))
	}, [id])

	const handleToggleFavorite = (e) => {
		e.stopPropagation()
		const updated = toggleFavoriteId(id)
		setFavorite(updated)
	}

	const handleNavigate = () => {
		navigate(`/vehiculo/${id}`)
	}




	return (
		<Card
			onClick={handleNavigate}
			sx={{
				width: 300,           
				height: 420,         
				display: 'flex',
				flexDirection: 'column',
				borderRadius: 2,
				overflow: 'hidden',
				boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
				cursor: 'pointer',
				transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				'&:hover': {
					transform: 'scale(1.02)',
					boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
				},
			}}
		>
			<CardMedia
				component="img"
				image={image}
				alt={`${brand} ${model}`}
				sx={{
					height: 150,
					width: '100%',
					objectFit: 'cover',
				}}
			/>

			<CardContent
				sx={{
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
			>
				<Typography variant="body2" color="text.secondary" mb={0.5}>
					Anticipo {downPayment}
				</Typography>

				<Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
					<Typography variant="h6" fontWeight="bold" color="text.primary">
						{formattedPrice}
					</Typography>
					<IconButton onClick={handleToggleFavorite} size="small">
						{favorite ? (
							<FavoriteIcon fontSize="small" color="error" />
						) : (
							<FavoriteBorderIcon fontSize="small" color="disabled" />
						)}
					</IconButton>
				</Box>

				<Typography variant="subtitle1" fontWeight="medium" gutterBottom>
					{brand} {model}
				</Typography>

				<Divider sx={{ my: 1 }} />

				<Stack spacing={1}>
					<Stack direction="row" spacing={1} alignItems="center">
						<CalendarMonthIcon sx={{ fontSize: 18 }} />
						<Typography variant="caption">{year}</Typography>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<SettingsIcon sx={{ fontSize: 18 }} />
						<Typography variant="caption">{transmission}</Typography>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<DirectionsCarIcon sx={{ fontSize: 18 }} />
						<Typography variant="caption">{bodyType}</Typography>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<DoorFrontIcon sx={{ fontSize: 18 }} />
						<Typography variant="caption">{doors} puertas</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</Card>

	)
}

export default VehicleCard
