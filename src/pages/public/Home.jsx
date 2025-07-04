import { useState, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import FeaturedOffers from '../../components/public/home/FeaturedOffers'
import FilterSidebar from '../../components/public/home/FilterSidebar'
import VehicleGrid from '../../components/public/home/VehicleGrid'
import { getFilteredVehicles } from '../../services/vehicleService'
import { useDealer } from '../../context/DealerContext'

const Home = () => {
	const { selectedDealer } = useDealer()
	const [filters, setFilters] = useState({})
	const [vehicles, setVehicles] = useState([])
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const limit = 8


	useEffect(() => {
		const fetchFiltered = async () => {
			if (!selectedDealer) return
			setLoading(true)

			const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
				if (
					(typeof value === 'string' && value.trim() !== '') ||
					(typeof value === 'number' && !isNaN(value))
				) {
					acc[key] = value
				}
				return acc
			}, {})

			try {
				const { vehicles, totalPages } = await getFilteredVehicles(selectedDealer.id, {
					...cleanedFilters,
					page,
					limit,
				})
				setVehicles(vehicles)
				setTotalPages(totalPages)
			} catch (err) {
				console.error('Error al filtrar vehículos:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchFiltered()
	}, [filters, selectedDealer, page])

	return (
		<Box bgcolor="#f9fafb" py={4}>
			<Container maxWidth="2xl">
				<FeaturedOffers />
				<Box mt={4} display="flex" gap={3}>
					<FilterSidebar onChange={setFilters} />
					<VehicleGrid
						vehicles={vehicles}
						loading={loading}
						page={page}
						setPage={setPage}
						totalPages={totalPages}
					/>
				</Box>
			</Container>
		</Box>
	)
}

export default Home
