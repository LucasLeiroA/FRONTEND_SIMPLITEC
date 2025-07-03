import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Container,
    IconButton,
    Grid,
    Fade,
    Divider,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import GroupsIcon from '@mui/icons-material/Groups'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import { useDealer } from '../../context/DealerContext'

import about1 from '../../assets/concesionaria.webp'
import about2 from '../../assets/consesonaria2.webp'
import about3 from '../../assets/consesonaria3.webp'

const images = [about1, about2, about3]

const AboutUs = () => {
    const { selectedDealer } = useDealer()
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    const handlePrev = () => setIndex(index === 0 ? images.length - 1 : index - 1)
    const handleNext = () => setIndex(index === images.length - 1 ? 0 : index + 1)

    return (
        <Box>
            {/* Carrusel de imágenes */}
            <Box sx={{ position: 'relative', height: { xs: 280, md: 500 }, overflow: 'hidden' }}>
                {images.map((src, i) => (
                    <Fade in={index === i} timeout={1000} key={i}>
                        <Box
                            component="img"
                            src={src}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transition: 'opacity 1s ease-in-out',
                            }}
                        />
                    </Fade>
                ))}

                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 16,
                        transform: 'translateY(-50%)',
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 16,
                        transform: 'translateY(-50%)',
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* Contenido textual */}
            <Box py={6} sx={{ backgroundColor: '#f9fafb' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Sobre {selectedDealer?.name || 'nuestro concesionario'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                En {selectedDealer?.name || 'nuestro concesionario'}, nos enorgullece ofrecer
                                una experiencia de compra centrada en la confianza, la atención personalizada y
                                la excelencia.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Con más de <strong>15 años de trayectoria</strong> en el rubro automotor, nos
                                posicionamos como referentes en servicio, innovación y compromiso con nuestros
                                clientes.
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            {/* Iconos y valores */}
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <EmojiPeopleIcon color="primary" />
                                    <Typography variant="body1">
                                        <strong>Misión:</strong> Conectar personas con vehículos que transformen su día a día.
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <VisibilityIcon color="primary" />
                                    <Typography variant="body1">
                                        <strong>Visión:</strong> Ser referentes de confianza y calidad en el sector automotor.
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <GroupsIcon color="primary" />
                                    <Typography variant="body1">
                                        <strong>Valores:</strong> Compromiso, cercanía, responsabilidad y excelencia.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    bgcolor: '#eef2f6',
                                    p: 4,
                                    borderRadius: 3,
                                    boxShadow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                                        🚀 Nuestra trayectoria
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <span style={{ fontWeight: 500 }}>2009:</span> Apertura del primer local
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <span style={{ fontWeight: 500 }}>2015:</span> Premio a la mejor atención
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <span style={{ fontWeight: 500 }}>2020:</span> Expansión digital y ventas online
                                    </Typography>
                                    <Typography variant="body1">
                                        <span style={{ fontWeight: 500 }}>2024:</span> Más de 3.000 clientes felices
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        bgcolor: 'white',
                                        p: 3,
                                        borderRadius: 2,
                                        borderLeft: '5px solid #1976d2',
                                        boxShadow: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontStyle="italic"
                                        sx={{ color: 'text.secondary', mb: 2 }}
                                    >
                                        “Para nosotros cada cliente es único. Nos apasiona acompañarte en uno de los
                                        momentos más importantes: elegir tu nuevo vehículo. Gracias por confiar en{' '}
                                        {selectedDealer?.name || 'nuestro equipo'}.”
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                        — Equipo {selectedDealer?.name || 'SimpliTEC'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>




                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default AboutUs
