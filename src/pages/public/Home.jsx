import { useEffect, useState } from 'react'
import { useDealer } from '../../context/DealerContext'
import { getVehiclesByDealerId } from '../../services/vehicleService'
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material'

const Home = () => {
	const { selectedDealer } = useDealer()
	const [vehicles, setVehicles] = useState([])

	useEffect(() => {
		const fetchVehicles = async () => {
			if (selectedDealer) {
				try {
					const data = await getVehiclesByDealerId(selectedDealer.id)
					setVehicles(data)
				} catch (err) {
					console.error('Error cargando vehículos:', err)
				}
			}
		}

		fetchVehicles()
	}, [selectedDealer])

	return (
		<Box px={4} py={6}>
			<Typography variant="h5" fontWeight="bold" mb={4}>
				Vehículos disponibles en {selectedDealer?.name}
			</Typography>

			<Grid container spacing={3}>
				{vehicles.map((vehicle) => (
					<Grid item key={vehicle.id} xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardMedia
								component="img"
								height="160"
								image={vehicle.images?.[0]?.url || '/placeholder.jpg'}
								alt={vehicle.model}
							/>
							<CardContent>
								<Typography variant="h6" fontWeight="bold">
									{vehicle.brand} {vehicle.model}
								</Typography>
								<Typography variant="body2">
									Año: {vehicle.year} | Km: {vehicle.kilometers}
								</Typography>
								<Typography variant="subtitle1" color="primary" mt={1}>
									${vehicle.price}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default Home
