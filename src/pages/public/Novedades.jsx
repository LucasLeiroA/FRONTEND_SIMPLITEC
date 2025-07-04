import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Button,
} from '@mui/material'
import { useDealer } from '../../context/DealerContext'

import blog1 from '../../assets/blog1.webp'
import blog2 from '../../assets/blog2.webp'
import blog3 from '../../assets/blog3.webp'
import client1 from '../../assets/client1.webp'
import client2 from '../../assets/client2.webp'
import dealer1 from '../../assets/consesionarioNotice.avif'


const fadeInUp = {
    '@keyframes fadeInUp': {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    },
    animation: 'fadeInUp 0.6s ease forwards',
}




const noticias = [
    {
        title: '¿Auto nuevo o usado? Claves para decidir',
        image: blog1,
        snippet: 'Conocé las ventajas y desventajas de ambas opciones para elegir con seguridad.',
    },
    {
        title: '5 puntos clave al comprar un usado',
        image: blog2,
        snippet: 'Desde el estado mecánico hasta la documentación, esto no puede pasarse por alto.',
    },
    {
        title: 'Tendencias 2025: Autos eléctricos en ascenso',
        image: blog3,
        snippet: '¿Conviene comprar uno? Te contamos qué tener en cuenta y cómo está el mercado.',
    },
]

const testimonios = [
    {
        name: 'Sofía Herrera',
        city: 'Córdoba',
        comment: 'Compré mi primer auto en Marien y fue una experiencia excelente. ¡Gracias por la atención!',
        photo: client1,
    },
    {
        name: 'Carlos Méndez',
        city: 'Buenos Aires',
        comment: 'Me ayudaron en todo el proceso, súper claro y profesional.',
        photo: client2,
    },
    {
        name: 'Lucía Fernández',
        city: 'Rosario',
        comment: 'Excelente atención y asesoramiento. Muy recomendable.',
        photo: client1,
    },
]

const dealers = [
    {
        name: 'Marien Autos',
        image: dealer1,
        quote: 'Queremos que el cliente disfrute su compra desde el primer contacto.',
        description:
            'Con más de 10 años en el rubro, Marien Autos se destaca por su atención personalizada y su catálogo de oportunidades.',
    },
]

const Novedades = () => {
    const { selectedDealer } = useDealer()
    const dealerName = selectedDealer?.name || 'nuestro concesionario'

    return (
        <Box py={6} bgcolor="#f9fafb">
            <Container maxWidth="lg">

                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Noticias y Consejos
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    gap={3}
                    mb={6}
                    flexWrap="wrap"
                >
                    {noticias.map((n, i) => (
                        <Box
                            key={i}
                            flex="1 1 30%"
                            minWidth="280px"
                            maxWidth="33.33%"
                            sx={{
                                ...fadeInUp,
                                animationDelay: `${i * 0.1}s`,
                                opacity: 0,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: 4,
                                },
                            }}
                        >
                            <Card sx={{ height: '100%', borderRadius: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={n.image}
                                    alt={n.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        {n.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {n.snippet}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Historias de Clientes de {dealerName}
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    gap={3}
                    mb={6}
                    flexWrap="wrap"
                >
                    {testimonios.map((t, i) => (
                        <Box key={i} flex="1 1 30%" minWidth="280px" maxWidth="33.33%" sx={{
                            ...fadeInUp,
                            animationDelay: `${i * 0.1}s`,
                            opacity: 0,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: 4,
                            },
                        }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    boxShadow: 1,
                                }}
                            >
                                <Avatar src={t.photo} alt={t.name} sx={{ width: 72, height: 72, mb: 2 }} />
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {t.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {t.city}
                                </Typography>
                                <Typography variant="body2" fontStyle="italic">
                                    "{t.comment}"
                                </Typography>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Concesionario Destacado
                </Typography>
                {dealers.map((d, i) => (
                    <Box
                        key={i}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'stretch',
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            boxShadow: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            component="img"
                            src={d.image}
                            alt={dealerName}
                            sx={{
                                width: { xs: '100%', md: 380 },
                                height: { xs: 200, md: 'auto' },
                                objectFit: 'cover',
                            }}
                        />
                        <Box p={4} display="flex" flexDirection="column" justifyContent="space-between" >
                            <Box>
                                <Typography variant="h5" fontWeight="bold" mb={1}>
                                    {dealerName}
                                </Typography>
                                <Typography variant="body2" fontStyle="italic" color="primary" gutterBottom>
                                    “{d.quote}”
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {d.description.replace('Marien Autos', dealerName)}
                                </Typography>
                            </Box>
                            <Box mt={3}>
                                <Button variant="contained" color="primary">
                                    Conocer más
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Container>
        </Box>
    )
}

export default Novedades
