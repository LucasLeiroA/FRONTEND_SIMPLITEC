import { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'

const ImageGallery = ({ images = [] }) => {
	const sorted = [...images].sort((a, b) => (a.order || 0) - (b.order || 0))
	const [mainImage, setMainImage] = useState(sorted?.[0]?.url || '/placeholder.jpg')

	useEffect(() => {
		if (sorted.length > 0) setMainImage(sorted[0].url)
	}, [images])

	const handleSelectImage = (url) => setMainImage(url)

	return (
		<Box>
			{/* Imagen principal con zoom fuerte */}
			<Box
				sx={{
					width: '100%',
					height: { xs: 260, sm: 340, md: 420 },
					borderRadius: 2,
					overflow: 'hidden',
					border: '1px solid #ddd',
					mb: 2,
					position: 'relative',
				}}
			>
				<Box
					component="img"
					src={mainImage}
					alt="Imagen principal"
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transition: 'transform 0.4s ease',
						cursor: 'zoom-in',
						'&:hover': {
							transform: 'scale(1.3)',
						},
					}}
				/>
			</Box>

			{/* Miniaturas */}
			<Grid container spacing={1}>
				{sorted.map((img, i) => (
					<Grid item xs={3} sm={2} md={2} key={i}>
						<Box
							component="img"
							src={img.url}
							alt={`mini-${i}`}
							onClick={() => handleSelectImage(img.url)}
							sx={{
								width: '100%',
								height: 70,
								objectFit: 'cover',
								borderRadius: 1,
								border: mainImage === img.url ? '2px solid #3056d3' : '1px solid #ccc',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
								'&:hover': {
									border: '2px solid #3056d3',
								},
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default ImageGallery
