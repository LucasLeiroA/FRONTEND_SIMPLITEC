import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, CircularProgress, MenuItem, Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getVehiclesByDealerId } from '../../services/vehicleService'

const AccessoryFormDialog = ({ open, onClose, onSave, initialData, loading }) => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        vehicleId: ''
    })

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
                    name: initialData.name || '',
                    description: initialData.description || '',
                    price: initialData.price || '',
                    stock: initialData.stock || '',
                    vehicleId: initialData.vehicleId || ''
                })
            } else {
                setForm({ name: '', description: '', price: '', stock: '', vehicleId: '' })
            }
            setErrors({})
        }
    }, [open, initialData])

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value })
        setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.name) newErrors.name = 'Nombre requerido'
        if (!form.description) newErrors.description = 'Descripción requerida'
        if (!form.price) newErrors.price = 'Precio requerido'
        if (!form.stock) newErrors.stock = 'Stock requerido'
        if (!form.vehicleId) newErrors.vehicleId = 'Vehículo requerido'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return

        const payload = {
            ...form,
            price: parseFloat(form.price),
            stock: parseInt(form.stock),
            vehicleId: parseInt(form.vehicleId),
        }

        onSave(payload, initialData?.id)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? 'Editar Accesorio' : 'Nuevo Accesorio'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Nombre"
                        value={form.name}
                        onChange={handleChange('name')}
                        error={!!errors.name}
                        helperText={errors.name}
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
                        label="Stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange('stock')}
                        error={!!errors.stock}
                        helperText={errors.stock}
                        fullWidth
                    />
                    <TextField
                        select
                        label="Vehículo asociado"
                        value={form.vehicleId}
                        onChange={handleChange('vehicleId')}
                        error={!!errors.vehicleId}
                        helperText={errors.vehicleId}
                        fullWidth
                    >
                        {vehicles.map((v) => (
                            <MenuItem key={v.id} value={v.id}>
                                {v.brand} {v.model} ({v.year})
                            </MenuItem>
                        ))}
                    </TextField>
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

export default AccessoryFormDialog
