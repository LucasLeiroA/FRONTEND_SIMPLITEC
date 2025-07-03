import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
    useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useDealer } from '../../context/DealerContext'
import { useAuth } from '../../context/AuthContext'
import { createLead } from '../../services/leadService'

const LeadModal = ({ open, onClose, postId = null, vehicleId = null }) => {
    const { selectedDealer } = useDealer()
    const { user, role } = useAuth()
    const theme = useTheme()

    const [sending, setSending] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)

    const [form, setForm] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: ''
    })

    const isClient = role === 'client'
    const isPublic = !user

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setSending(true)

            const payload = {
                phone: form.phone,
                ...(isPublic && { name: form.name, lastname: form.lastname, email: form.email }),
                ...(postId && { postId }),
                ...(vehicleId && { vehicleId })
            }

            await createLead(selectedDealer.id, payload)

            setSuccessOpen(true)
            onClose()
            setForm({ name: '', lastname: '', email: '', phone: '' })
        } catch (err) {
            console.error(err)
            setErrorOpen(true)
        } finally {
            setSending(false)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 'bold',
                        py: 2,
                        textAlign: 'center',
                        fontSize: '1.3rem',
                    }}
                >
                    Solicitar Cotización
                </DialogTitle>

                <DialogContent
                    sx={{
                        bgcolor: '#f9fafb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        py: 4,
                        px: 3,
                        mt: 4
                    }}
                >
                    {(isPublic || role === null) && (
                        <>
                            <TextField
                                name="name"
                                label="Nombre"
                                variant="outlined"
                                onChange={handleChange}
                                value={form.name}
                                fullWidth
                                sx={{ borderRadius: 2 }}
                            />
                            <TextField
                                name="lastname"
                                label="Apellido"
                                variant="outlined"
                                onChange={handleChange}
                                value={form.lastname}
                                fullWidth
                                sx={{ borderRadius: 2 }}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                onChange={handleChange}
                                value={form.email}
                                fullWidth
                                sx={{ borderRadius: 2 }}
                            />
                        </>
                    )}

                    <TextField
                        name="phone"
                        label="Teléfono"
                        type="tel"
                        variant="outlined"
                        onChange={handleChange}
                        value={form.phone}
                        fullWidth
                        sx={{ borderRadius: 2 }}
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="outlined"
                        disabled={sending}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={sending || !form.phone}
                        startIcon={sending ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{ fontWeight: 'bold' }}
                    >
                        {sending ? 'Enviando...' : 'Enviar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Éxito */}
            <Snackbar
                open={successOpen}
                autoHideDuration={4000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled" onClose={() => setSuccessOpen(false)}>
                    Gracias por tu interés. El concesionario se contactará contigo.
                </Alert>
            </Snackbar>

            {/* Snackbar Error */}
            <Snackbar
                open={errorOpen}
                autoHideDuration={4000}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error" variant="filled" onClose={() => setErrorOpen(false)}>
                    Error al enviar la solicitud. Intenta nuevamente.
                </Alert>
            </Snackbar>
        </>
    )
}

export default LeadModal
