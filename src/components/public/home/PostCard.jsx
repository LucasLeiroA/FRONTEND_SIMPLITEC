import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DoorFrontIcon from '@mui/icons-material/DoorFront'

const PostCard = ({ post }) => {
	const navigate = useNavigate()
	const image = post.images?.[0]?.url || '/placeholder.jpg'

	return (
		<Card
			sx={{
				borderRadius: 2,
				boxShadow: 1,
				overflow: 'hidden',
				bgcolor: 'white',
				cursor: 'pointer',
				transition: '0.2s',
				'&:hover': {
					boxShadow: 4,
					transform: 'scale(1.01)',
				},
			}}
			onClick={() => navigate(`/post/${post.id}`)}
		>
			<CardMedia
				component="img"
				height="140"
				image={image}
				alt={post.title}
				sx={{ objectFit: 'cover' }}
			/>

			<CardContent sx={{ px: 2, py: 1.5 }}>
				<Typography variant="subtitle2" color="text.secondary" noWrap>
					{post.title}
				</Typography>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						fontSize: '0.75rem',
						mt: 0.5,
					}}
				>
					{post.description}
				</Typography>

				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					mt={1.5}
				>
					<Typography fontWeight={600} color="primary" fontSize="1rem">
						${post.price.toLocaleString()}
					</Typography>

					<Button size="small" variant="text" sx={{ fontSize: '0.75rem', p: 0 }}>
						Ver más
					</Button>
				</Box>

			</CardContent>
		</Card>
	)
}

export default PostCard
