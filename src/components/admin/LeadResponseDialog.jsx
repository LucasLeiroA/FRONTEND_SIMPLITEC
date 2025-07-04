import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, CircularProgress
} from '@mui/material'
import { useState, useEffect } from 'react'

const LeadResponseDialog = ({ open, onClose, onSave, loading, lead }) => {
    const [responseText, setResponseText] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (open) {
            setResponseText('')
            setError('')
        }
    }, [open])

    const handleSubmit = () => {
        if (!responseText.trim()) {
            setError('La respuesta es obligatoria')
            return
        }
        onSave(responseText, lead.id)
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Responder Lead</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Respuesta"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        error={!!error}
                        helperText={error}
                        fullWidth
                        multiline
                        rows={4}
                    />
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
                    {loading ? 'Enviando...' : 'Enviar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LeadResponseDialog