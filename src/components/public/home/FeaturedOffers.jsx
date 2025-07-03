import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { useDealer } from '../../../context/DealerContext'
import { getPostsByDealer } from '../../../services/postServicea'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'

const FeaturedOffers = () => {
    const { selectedDealer } = useDealer()
    const [posts, setPosts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            if (!selectedDealer) return
            try {
                const res = await getPostsByDealer(selectedDealer.id)
                setPosts(res.data)
                setCurrentIndex(0)
            } catch (err) {
                console.error('Error al cargar publicaciones:', err)
            }
        }

        fetchPosts()
    }, [selectedDealer])

    useEffect(() => {
        if (!posts.length) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === posts.length - 1 ? 0 : prev + 1
            )
        }, 8000)

        return () => clearInterval(interval)
    }, [posts])

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1))
    }

    if (!posts.length) return null

    return (
        <Box position="relative" mb={4}>
            <Box
                sx={{
                    height: { xs: 300, sm: 400, md: 480 },
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                }}
            >
                {posts.map((post, index) => (
                    <Box
                        key={post.id}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                            zIndex: index === currentIndex ? 2 : 1,
                        }}
                    >
                        {/* Imagen */}
                        <Box
                            component="img"
                            src={post.images?.[0]?.url || '/placeholder.jpg'}
                            alt={post.title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                        {/* Oscurecimiento */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.4)',
                            }}
                        />
                        {/* Contenido superpuesto */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                textAlign: 'center',
                                px: 2,
                            }}
                        >
                            <Typography variant="h4" fontWeight="bold" sx={{ textShadow: '0px 0px 8px rgba(0,0,0,0.6)' }}>
                                {post.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 1,
                                    maxWidth: 600,
                                    textShadow: '0px 0px 6px rgba(0,0,0,0.5)',
                                }}
                            >
                                {post.description || 'Sin descripción disponible'}
                            </Typography>
                            {post.price && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        px: 3,
                                        py: 0.5,
                                        borderRadius: 1,
                                        textShadow: '0px 0px 4px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    ${post.price.toLocaleString()}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mt: 3 }}
                                onClick={() => navigate('/ofertas')}
                            >
                                Conocer oferta
                            </Button>
                        </Box>
                    </Box>
                ))}

                {/* Botones navegación */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 16,
                        transform: 'translateY(-50%)',
                        zIndex: 5,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 16,
                        transform: 'translateY(-50%)',
                        zIndex: 5,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    )
}

export default FeaturedOffers
