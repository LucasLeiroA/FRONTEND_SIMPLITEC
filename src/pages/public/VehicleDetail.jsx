import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    Grid,
    Chip,
    CircularProgress,
    Button,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SettingsIcon from '@mui/icons-material/Settings'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DoorFrontIcon from '@mui/icons-material/DoorFront'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getVehicleById } from '../../services/vehicleService'
import { useDealer } from '../../context/DealerContext'
import ImageGallery from '../../components/public/home/ImageGallery'
import QuoteButton from '../../components/public/home/QuoteButton'
import LeadModal from './LeadModal'

const VehicleDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { selectedDealer } = useDealer()
    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!selectedDealer) return
            setLoading(true)
            try {
                const data = await getVehicleById(selectedDealer.id, id)
                setVehicle(data)
            } catch (err) {
                console.error('Error al obtener vehículo:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchVehicle()
    }, [id, selectedDealer])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        )
    }

    if (!vehicle) {
        return (
            <Box textAlign="center" mt={10}>
                <Typography variant="h6">Vehículo no encontrado</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
                    Volver al inicio
                </Button>
            </Box>
        )
    }




    const formattedPrice = `$ ${vehicle.price.toLocaleString()}`
    const downPayment = `$ ${Math.round(vehicle.price * 0.1).toLocaleString()}`

    return (
        <Box py={6}>
            <Container maxWidth="lg">
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 3 }}
                >
                    Volver
                </Button>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ImageGallery images={vehicle.images} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom >
                            {vehicle.brand} {vehicle.model}
                        </Typography>

                        <Typography variant="h6" gutterBottom color="text.primary">
                            {formattedPrice}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Anticipo estimado: {downPayment}
                        </Typography>
                        <Box
                            mt={2}
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={1}
                            width="100%"
                        >
                            <Chip
                                icon={<CalendarMonthIcon />}
                                label={`Año: ${vehicle.year}`}
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    fontWeight: '500',
                                    fontSize: '15px'
                                }}
                            />
                            <Chip
                                icon={<SettingsIcon />}
                                label={`Transmisión: ${vehicle.transmission}`}
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    fontWeight: '500',
                                    fontSize: '15px'
                                }}
                            />
                            <Chip
                                icon={<DirectionsCarIcon />}
                                label={`Carrocería: ${vehicle.bodyType}`}
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    fontWeight: '500',
                                    fontSize: '15px'
                                }}
                            />
                            <Chip
                                icon={<DoorFrontIcon />}
                                label={`${vehicle.doors} puertas`}
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    fontWeight: '500',
                                    fontSize: '15px'
                                }}
                            />
                        </Box>

                        <Box mt={4}>
                            <QuoteButton onClick={() => setOpen(true)} />
                        </Box>

                    </Grid>
                </Grid>
            </Container>

            <LeadModal open={open} onClose={() => setOpen(false)} vehicleId={vehicle.id} />


        </Box>
    )
}

export default VehicleDetail
