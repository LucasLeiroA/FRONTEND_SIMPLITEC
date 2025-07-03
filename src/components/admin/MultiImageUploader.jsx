import { useState, useEffect } from 'react';
import {
	Box, Grid, IconButton, Typography, Stack, Tooltip, Paper, styled ,Button 
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const PreviewBox = styled(Paper)(({ theme }) => ({
	position: 'relative',
	width: 100,
	height: 80,
	overflow: 'hidden',
	borderRadius: theme.shape.borderRadius,
	border: `1px solid ${theme.palette.divider}`,
}));

const MultiImageUploader = ({ value = [], onChange }) => {
	const [images, setImages] = useState([]);
	const [dragIndex, setDragIndex] = useState(null);

	useEffect(() => {
		setImages(value);
	}, [value]);

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files).map((file, index) => ({
			file,
			url: URL.createObjectURL(file),
			order: images.length + index + 1,
			existing: false,
		}));
		const updated = [...images, ...files].map((img, i) => ({ ...img, order: i + 1 }));
		setImages(updated);
		onChange(updated);
	};

	const handleRemove = (index) => {
		const updated = images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i + 1 }));
		setImages(updated);
		onChange(updated);
	};

	const handleDragStart = (index) => setDragIndex(index);

	const handleDrop = (index) => {
		if (dragIndex === null || dragIndex === index) return;
		const reordered = [...images];
		const [moved] = reordered.splice(dragIndex, 1);
		reordered.splice(index, 0, moved);
		const reindexed = reordered.map((img, i) => ({ ...img, order: i + 1 }));
		setImages(reindexed);
		onChange(reindexed);
		setDragIndex(null);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="subtitle1" fontWeight="bold">Imágenes</Typography>

			<Grid container spacing={2}>
				{images.map((img, index) => (
					<Grid item key={index}>
						<PreviewBox
							draggable
							onDragStart={() => handleDragStart(index)}
							onDragOver={(e) => e.preventDefault()}
							onDrop={() => handleDrop(index)}
							elevation={1}
						>
							<img
								src={img.existing ? img.url : URL.createObjectURL(img.file)}
								alt={`img-${index}`}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>

							<Box
								sx={{
									position: 'absolute',
									bottom: 0,
									left: 0,
									bgcolor: 'rgba(0,0,0,0.6)',
									color: '#fff',
									fontSize: 11,
									px: 0.5,
									py: 0.2,
								}}
							>
								#{img.order}
							</Box>

							<Tooltip title="Eliminar">
								<IconButton
									size="small"
									onClick={() => handleRemove(index)}
									sx={{
										position: 'absolute',
										top: 2,
										right: 2,
										bgcolor: 'rgba(255, 255, 255, 0.7)',
										'&:hover': { bgcolor: 'rgba(255, 0, 0, 0.7)' },
									}}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						</PreviewBox>
					</Grid>
				))}
			</Grid>

			<Box mt={1}>
				<Button variant="outlined" component="label">
					Subir Imágenes
					<input
						type="file"
						multiple
						accept="image/*"
						hidden
						onChange={handleFileChange}
					/>
				</Button>
			</Box>
		</Stack>
	);
};

export default MultiImageUploader;
