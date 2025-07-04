import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Snackbar, Alert, CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getLeadsByDealer, respondLead } from '../../services/leadService'
import LeadResponseDialog from '../../components/admin/LeadResponseDialog'
import { Reply } from '@mui/icons-material'

const Leads = () => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [leads, setLeads] = useState([])
    const [selectedLead, setSelectedLead] = useState(null)
    const [openForm, setOpenForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')

    const showAlert = (msg, severity = 'success') => {
        setAlertMessage(msg)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const loadLeads = async () => {
        try {
            setLoading(true)
            const data = await getLeadsByDealer(dealerId)
            setLeads(data)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar leads', 'error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (dealerId) loadLeads()
    }, [dealerId])

    const handleSave = async (responseText, leadId) => {
        try {
            setLoading(true)
            await respondLead(leadId, responseText)
            showAlert('Lead respondida')
            setOpenForm(false)
            loadLeads()
        } catch (err) {
            console.error(err)
            showAlert('Error al responder lead', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box>
            <Typography variant="h5" mb={3}>Cotizaciones recibidas</Typography>

            {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress />
                </Box>
            )}

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Publicación / Vehículo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leads.map((l) => (
                        <TableRow key={l.id}>
                            <TableCell>{l.name} {l.lastname}</TableCell>
                            <TableCell>{l.email}</TableCell>
                            <TableCell>{l.phone}</TableCell>
                            <TableCell>{l.post?.title || `${l.vehicle?.brand} ${l.vehicle?.model}` || '-'}</TableCell>
                            <TableCell>
                                {l.responded ? 'Respondida ✅' : 'Pendiente ❌'}
                            </TableCell>
                            <TableCell align="right">
                                {!l.responded && (
                                    <IconButton onClick={() => { setSelectedLead(l); setOpenForm(true) }}>
                                        <Reply />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <LeadResponseDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                lead={selectedLead}
                loading={loading}
            />

            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={alertSeverity} variant="filled" onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Leads
