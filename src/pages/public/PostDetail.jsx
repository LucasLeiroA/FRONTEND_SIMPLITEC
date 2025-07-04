import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	Box,
	Container,
	Typography,
	Grid,
	CircularProgress,
	Chip,
	Button,
	Divider,
	Stack,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getPostById } from '../../services/postServicea'
import { useDealer } from '../../context/DealerContext'
import VehicleCard from '../../components/public/home/VehicleCard'

const PostDetail = () => {
	const { id } = useParams()
	const { selectedDealer } = useDealer()
	const [post, setPost] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		if (!selectedDealer) return

		const fetchPost = async () => {
			try {
				setLoading(true)
				const res = await getPostById(selectedDealer.id, id)
				setPost(res.data)
			} catch (err) {
				console.error('Error al cargar post:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchPost()
	}, [id, selectedDealer])

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
				<CircularProgress />
			</Box>
		)
	}

	if (!post) {
		return (
			<Container>
				<Typography variant="h6" mt={4} textAlign="center">
					No se encontró la publicación.
				</Typography>
			</Container>
		)
	}

	return (
		<Box py={6} bgcolor="#fafafa">
			<Container maxWidth="lg">
				<Button
					startIcon={<ArrowBackIcon />}
					variant="outlined"
					onClick={() => navigate(-1)}
					sx={{ mb: 4 }}
				>
					Volver
				</Button>

				<Box
					component="img"
					src={post.images?.[0]?.url || '/placeholder.jpg'}
					alt={post.title}
					sx={{
						width: '100%',
						height: { xs: 220, md: 400 },
						objectFit: 'cover',
						borderRadius: 3,
						mb: 4,
					}}
				/>

				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<Typography variant="h4" fontWeight="bold" gutterBottom>
							{post.title}
						</Typography>
						<Typography variant="body1" color="text.secondary" paragraph>
							{post.description}
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Stack spacing={2}>
							<Chip
								label={`Precio: $${post.price.toLocaleString()}`}
								color="primary"
								sx={{
									fontSize: '1.125rem',
									px: 3,
									py: 1.5,
									fontWeight: 600,
								}}
							/>

						</Stack>
					</Grid>
				</Grid>

				<Divider sx={{ my: 6 }} />

				<Box>
					<Typography variant="h5" fontWeight="bold" mb={3}>
						Vehículos incluidos en esta oferta
					</Typography>

					<Grid container spacing={3}>
						{post.vehicles?.map(({ vehicle }) => (
							<Grid item xs={12} sm={6} md={4} key={vehicle.id}>
								<VehicleCard vehicle={vehicle} />
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Box>
	)
}

export default PostDetail
