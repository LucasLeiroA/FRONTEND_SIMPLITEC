import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Stack, Dialog, DialogTitle, DialogActions, Snackbar, Alert
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { getAllDealers, deleteDealer, createDealer, updateDealer } from '../../services/dealerService'
import DealerFormDialog from '../../components/admin/DealerFormDialog'


const Dealers = () => {
    const [dealers, setDealers] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openForm, setOpenForm] = useState(false)
    const [editingDealer, setEditingDealer] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')


    const loadDealers = async () => {
        const data = await getAllDealers()
        setDealers(data)
        setLoading(false)
    }

    const handleDelete = async () => {
        await deleteDealer(deleteId)
        setDealers(prev => prev.filter(d => d.id !== deleteId))
        setDeleteId(null)
        showAlert('Concesionario eliminado')
    }

    useEffect(() => {
        loadDealers()
    }, [])


    const handleCreate = () => {
        setEditingDealer(null)
        setOpenForm(true)
    }

    const handleEdit = (dealer) => {
        setEditingDealer(dealer)
        setOpenForm(true)
    }

    const showAlert = (message, severity = 'success') => {
        setAlertMessage(message)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }


    const handleSave = async (formData) => {
        try {
            if (editingDealer) {
                const updated = await updateDealer(editingDealer.id, formData)
                setDealers(dealers.map(d => d.id === editingDealer.id ? updated : d))
                showAlert('Concesionario actualizado correctamente')

            } else {
                const created = await createDealer(formData)
                setDealers([...dealers, created])
                showAlert('Concesionario creado correctamente')
            }
            setOpenForm(false)
        } catch (err) {
            console.error('Error al guardar dealer:', err)
        }
    }


    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Concesionarios</Typography>
                <Button variant="contained" onClick={handleCreate}>Agregar Dealer</Button>
            </Stack>

            {loading ? (
                <Typography>Cargando...</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dealers.map(dealer => (
                            <TableRow key={dealer.id}>
                                <TableCell>{dealer.name}</TableCell>
                                <TableCell>{dealer.email}</TableCell>
                                <TableCell>{dealer.phone}</TableCell>
                                <TableCell>{dealer.address}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(dealer)}><Edit /></IconButton>
                                    <IconButton color="error" onClick={() => setDeleteId(dealer.id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar este concesionario?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
                    <Button color="error" onClick={handleDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>

            <DealerFormDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                initialData={editingDealer}
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

export default Dealers
