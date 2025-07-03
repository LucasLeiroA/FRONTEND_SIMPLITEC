import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, MenuItem, Typography, Box, CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import MultiImageUploader from '../admin/MultiImageUploader'

const fuelOptions = ['Nafta', 'Diesel', 'Eléctrico', 'Híbrido']
const transmissionOptions = ['Manual', 'Automática']
const bodyTypeOptions = ['Sedán', 'SUV', 'Hatchback', 'Pick-up', 'Furgón']

const VehicleFormDialog = ({ open, onClose, onSave, initialData, loading }) => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [form, setForm] = useState({
        brand: '', model: '', year: '', price: '',
        fuelType: '', transmission: '', doors: '',
        bodyType: '', stock: ''
    })

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (open) {
            if (initialData) {
                setForm({
                    brand: initialData.brand || '',
                    model: initialData.model || '',
                    year: initialData.year || '',
                    price: initialData.price || '',
                    fuelType: initialData.fuelType || '',
                    transmission: initialData.transmission || '',
                    doors: initialData.doors || '',
                    bodyType: initialData.bodyType || '',
                    stock: initialData.stock || ''
                })
                setImages((initialData.images || []).map((img, i) => ({
                    url: img.url,
                    order: img.order ?? i + 1,
                    publicId: img.publicId,
                    existing: true
                })))
            } else {
                setForm({
                    brand: '', model: '', year: '', price: '',
                    fuelType: '', transmission: '', doors: '',
                    bodyType: '', stock: ''
                })
                setImages([])
            }
            setErrors({})
        }
    }, [open, initialData])

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value })
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.brand) newErrors.brand = 'Marca requerida'
        if (!form.model) newErrors.model = 'Modelo requerido'
        if (!form.year) newErrors.year = 'Año requerido'
        if (!form.price) newErrors.price = 'Precio requerido'
        if (!form.fuelType) newErrors.fuelType = 'Combustible requerido'
        if (!form.transmission) newErrors.transmission = 'Transmisión requerida'
        if (!form.doors) newErrors.doors = 'Nº de puertas requerido'
        if (!form.bodyType) newErrors.bodyType = 'Carrocería requerida'
        if (!form.stock) newErrors.stock = 'Stock requerido'
        if (!initialData && images.length === 0) newErrors.images = 'Debes subir al menos 1 imagen'
        if (!dealerId) newErrors.dealerId = 'No se detectó el concesionario'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return;

        const formData = new FormData();
        formData.append('dealerId', Number(dealerId));
        if (initialData) formData.append('edit', 'true');

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, ['year', 'price', 'doors', 'stock'].includes(key) ? Number(value) : value);
        });

        for (const img of images) {
            formData.append('ordenes', img.order);

            if (img.existing) {
                const response = await fetch(img.url);
                const blob = await response.blob();
                const fileName = img.url.split('/').pop().split('?')[0]; 
                const file = new File([blob], fileName, { type: blob.type });
                formData.append('images', file);
            } else {
                formData.append('images', img.file);
            }
        }

        onSave(formData, initialData?.id);
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Editar Vehículo' : 'Nuevo Vehículo'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Marca" value={form.brand} onChange={handleChange('brand')} error={!!errors.brand} helperText={errors.brand} fullWidth />
                    <TextField label="Modelo" value={form.model} onChange={handleChange('model')} error={!!errors.model} helperText={errors.model} fullWidth />
                    <TextField label="Año" type="number" value={form.year} onChange={handleChange('year')} error={!!errors.year} helperText={errors.year} fullWidth />
                    <TextField label="Precio" type="number" value={form.price} onChange={handleChange('price')} error={!!errors.price} helperText={errors.price} fullWidth />
                    <TextField select label="Combustible" value={form.fuelType} onChange={handleChange('fuelType')} error={!!errors.fuelType} helperText={errors.fuelType} fullWidth>
                        {fuelOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>
                    <TextField select label="Transmisión" value={form.transmission} onChange={handleChange('transmission')} error={!!errors.transmission} helperText={errors.transmission} fullWidth>
                        {transmissionOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>
                    <TextField label="Puertas" type="number" value={form.doors} onChange={handleChange('doors')} error={!!errors.doors} helperText={errors.doors} fullWidth />
                    <TextField select label="Carrocería" value={form.bodyType} onChange={handleChange('bodyType')} error={!!errors.bodyType} helperText={errors.bodyType} fullWidth>
                        {bodyTypeOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </TextField>
                    <TextField label="Stock" type="number" value={form.stock} onChange={handleChange('stock')} error={!!errors.stock} helperText={errors.stock} fullWidth />

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

export default VehicleFormDialog
