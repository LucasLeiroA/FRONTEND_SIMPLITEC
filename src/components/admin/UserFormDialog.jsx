import { useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, MenuItem
} from '@mui/material'

const UserFormDialog = ({
    open,
    onClose,
    onSave,
    initialData,
    dealers = [],
    hideDealerSelect = false
}) => {
    const [form, setForm] = useState({ email: '', password: '', dealerId: '' })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (open) {
            if (initialData) {
                setForm({
                    email: initialData.email || '',
                    password: '',
                    dealerId: initialData.dealerId || initialData.dealer?.id || ''
                })
            } else {
                setForm({ email: '', password: '', dealerId: '' })
            }
            setErrors({})
        }
    }, [open, initialData])

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value })
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const validateCommon = (email, password, dealerIdToCheck) => {
        const newErrors = {}

        if (!email) newErrors.email = 'El email es obligatorio'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido'

        if (!initialData && !password) newErrors.password = 'La contraseña es obligatoria'

        if (!hideDealerSelect && !dealerIdToCheck) newErrors.dealerId = 'Debe asignar un concesionario'

        setErrors(newErrors)
        return newErrors
    }

    const handleSubmit = () => {
        if (!hideDealerSelect) {
            const validation = validateCommon(form.email, form.password, form.dealerId)
            if (Object.keys(validation).length === 0) {
                onSave(form)
            }
        } else {
            const dealerId = localStorage.getItem('dealerId')
            if (!dealerId) {
                setErrors({ dealerId: 'No se encontró el ID del concesionario.' })
                return
            }

            const finalForm = {
                email: form.email,
                password: form.password,
                dealerId: parseInt(dealerId)
            }

            const validation = validateCommon(finalForm.email, finalForm.password, true)
            if (Object.keys(validation).length === 0) {
                onSave(finalForm)
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Editar Usuario Dealer' : 'Nuevo Usuario Dealer'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    {!initialData && (
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={handleChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    )}
                    {!hideDealerSelect && (
                        <TextField
                            select
                            label="Concesionario"
                            fullWidth
                            value={form.dealerId}
                            onChange={handleChange('dealerId')}
                            error={!!errors.dealerId}
                            helperText={errors.dealerId}
                        >
                            {dealers.map((dealer) => (
                                <MenuItem key={dealer.id} value={dealer.id}>
                                    {dealer.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserFormDialog
