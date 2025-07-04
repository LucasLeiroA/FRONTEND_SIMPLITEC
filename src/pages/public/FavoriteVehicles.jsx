import { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Typography,
    Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VehicleGrid from '../../components/public/home/VehicleGrid'
import { getFilteredVehicles } from '../../services/vehicleService'
import { useDealer } from '../../context/DealerContext'
import { getFavoriteIds } from '../../services/favoriteService'
import { useNavigate } from 'react-router-dom'

const FavoriteVehicles = () => {
    const { selectedDealer } = useDealer()
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!selectedDealer) return
            setLoading(true)
            try {
                const { vehicles: allVehicles } = await getFilteredVehicles(selectedDealer.id, { limit: 1000 }) // podés aumentar el límite si querés
                const favIds = getFavoriteIds()
                const favs = allVehicles.filter(v => favIds.includes(v.id))
                setVehicles(favs)
            } catch (err) {
                console.error('Error al cargar favoritos:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [selectedDealer])

    return (
        <Box bgcolor="#f9fafb" py={6} minHeight="80vh">
            <Container maxWidth="xl">
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    sx={{ mb: 3 }}
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    align="center"
                    mb={4}
                    color="text.primary"
                >
                    Mis vehículos favoritos
                </Typography>

                {!loading && vehicles.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Aún no agregaste vehículos a tus favoritos.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Descubrí nuestras últimas ofertas y agregá tus preferidos con el corazón ❤️
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/')}
                        >
                            Volver al inicio
                        </Button>
                    </Box>
                ) : (
                    <VehicleGrid vehicles={vehicles} loading={loading} />
                )}
            </Container>
        </Box>
    )
}

export default FavoriteVehicles
