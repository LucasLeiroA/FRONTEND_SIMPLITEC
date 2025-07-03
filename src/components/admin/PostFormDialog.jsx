import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, MenuItem, CircularProgress, Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getVehiclesByDealerId } from '../../services/vehicleService'
import MultiImageUploader from './MultiImageUploader'

const PostFormDialog = ({ open, onClose, onSave, initialData, loading }) => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        vehicleIds: []
    })

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({})
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        if (dealerId) {
            getVehiclesByDealerId(dealerId)
                .then(setVehicles)
                .catch(() => setVehicles([]))
        }
    }, [dealerId])

    useEffect(() => {
        if (open) {
            if (initialData) {
                setForm({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    price: initialData.price || '',
                    vehicleIds: initialData.vehicles.map(v => v.vehicleId)
                })
                setImages((initialData.images || []).map((img, i) => ({
                    url: img.url,
                    order: i + 1,
                    publicId: img.publicId,
                    existing: true
                })))
            } else {
                setForm({ title: '', description: '', price: '', vehicleIds: [] })
                setImages([])
            }
            setErrors({})
        }
    }, [open, initialData])

    const handleChange = (field) => (e) => {
        const value = e.target.value
        setForm({ ...form, [field]: value })
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.title) newErrors.title = 'Título requerido'
        if (!form.description) newErrors.description = 'Descripción requerida'
        if (!form.price) newErrors.price = 'Precio requerido'
        if (!form.vehicleIds.length) newErrors.vehicleIds = 'Selecciona al menos un vehículo'
        if (!initialData && images.length === 0) newErrors.images = 'Debes subir al menos una imagen'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('price', form.price)
        formData.append('vehicleIds', JSON.stringify(form.vehicleIds))

        for (const img of images) {
            formData.append('ordenes', img.order)
            if (img.existing) {
                const response = await fetch(img.url)
                const blob = await response.blob()
                const fileName = img.url.split('/').pop().split('?')[0]
                const file = new File([blob], fileName, { type: blob.type })
                formData.append('images', file)
            } else {
                formData.append('images', img.file)
            }
        }

        onSave(formData, initialData?.id)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Editar Publicación' : 'Nueva Publicación'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Título"
                        value={form.title}
                        onChange={handleChange('title')}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                    />
                    <TextField
                        label="Descripción"
                        value={form.description}
                        onChange={handleChange('description')}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Precio"
                        type="number"
                        value={form.price}
                        onChange={handleChange('price')}
                        error={!!errors.price}
                        helperText={errors.price}
                        fullWidth
                    />
                    <TextField
                        select
                        SelectProps={{ multiple: true }}
                        label="Vehículos asociados"
                        value={form.vehicleIds}
                        onChange={handleChange('vehicleIds')}
                        error={!!errors.vehicleIds}
                        helperText={errors.vehicleIds}
                        fullWidth
                    >
                        {vehicles.map(v => (
                            <MenuItem key={v.id} value={v.id}>
                                {v.brand} {v.model} ({v.year})
                            </MenuItem>
                        ))}
                    </TextField>

                    <MultiImageUploader value={images} onChange={setImages} />
                    {errors.images && <Typography color="error" fontSize={13}>{errors.images}</Typography>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostFormDialog
