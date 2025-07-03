import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack
} from '@mui/material'
import { useEffect, useState } from 'react'

const DealerFormDialog = ({ open, onClose, onSave, initialData }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (open) {
            if (initialData) {
                setForm({
                    name: initialData.name || '',
                    email: initialData.email || '',
                    phone: initialData.phone || '',
                    address: initialData.address || '',
                })
            } else {
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                })
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

        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
        if (!form.email.trim()) newErrors.email = 'El email es obligatorio'
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
        if (!form.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
        if (!form.address.trim()) newErrors.address = 'La dirección es obligatoria'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validate()) {
            onSave(form)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Editar Dealer' : 'Nuevo Dealer'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Nombre"
                        fullWidth
                        value={form.name}
                        onChange={handleChange('name')}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Teléfono"
                        fullWidth
                        value={form.phone}
                        onChange={handleChange('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Dirección"
                        fullWidth
                        value={form.address}
                        onChange={handleChange('address')}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DealerFormDialog
