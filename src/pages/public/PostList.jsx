import { useEffect, useState } from 'react'
import {
	Container,
	Typography,
	Grid,
	Box,
	Divider
} from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import { useDealer } from '../../context/DealerContext'
import { getPostsByDealer } from '../../services/postServicea'
import PostCard from '../../components/public/home/PostCard'

const PostList = () => {
	const { selectedDealer } = useDealer()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (!selectedDealer) return
		const fetchPosts = async () => {
			try {
				const res = await getPostsByDealer(selectedDealer.id)
				setPosts(res.data)
			} catch (err) {
				console.error('Error al cargar posts:', err)
			}
		}
		fetchPosts()
	}, [selectedDealer])

	if (!selectedDealer) return null

	return (
		<Box sx={{ py: 6 }}>
			<Container maxWidth="lg">
				<Typography
					variant="h4"
					fontWeight="bold"
					mb={1}
					color="text.primary"
					sx={{ textAlign: { xs: 'center', md: 'left' } }}
				>
					Últimas Ofertas de {selectedDealer.name}
				</Typography>

				<Typography
					variant="body1"
					color="text.secondary"
					mb={4}
					sx={{ textAlign: { xs: 'center', md: 'left' } }}
				>
					Descubrí las promociones más recientes con vehículos seleccionados y precios especiales.
				</Typography>

				<Divider sx={{ mb: 4 }} />

				{posts.length === 0 ? (
					<Box textAlign="center" py={10}>
						<CampaignIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
						<Typography variant="h6" color="text.secondary" gutterBottom>
							Aún no hay publicaciones disponibles
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{selectedDealer.name} está preparando nuevas ofertas. ¡Vuelve pronto!
						</Typography>
					</Box>
				) : (
					<Grid container spacing={4}>
						{posts.map((post) => (
							<Grid item xs={12} sm={6} md={4} key={post.id}>
								<PostCard post={post} />
							</Grid>
						))}
					</Grid>
				)}
			</Container>
		</Box>
	)
}

export default PostList
