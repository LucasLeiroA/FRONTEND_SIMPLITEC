import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Stack, Dialog,
    DialogTitle, DialogActions, Snackbar, Alert, CircularProgress
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
    getAccessoriesByDealer,
    createAccessory,
    updateAccessory,
    deleteAccessory
} from '../../services/accessoryService'
import AccessoryFormDialog from '../../components/admin/AccessoryFormDialog'

const Accessories = () => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [accessories, setAccessories] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [editingAccessory, setEditingAccessory] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const showAlert = (msg, severity = 'success') => {
        setAlertMessage(msg)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const loadAccessories = async () => {
        try {
            const res = await getAccessoriesByDealer(dealerId)
            setAccessories(res.data)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar accesorios', 'error')
        }
    }

    useEffect(() => {
        if (dealerId) loadAccessories()
    }, [dealerId])

    const handleSave = async (formData, accessoryId) => {
        try {
            setLoading(true)
            if (accessoryId) {
                await updateAccessory(dealerId, accessoryId, formData)
                showAlert('Accesorio actualizado')
            } else {
                await createAccessory(dealerId, formData)
                showAlert('Accesorio creado')
            }
            setOpenForm(false)
            loadAccessories()
        } catch (err) {
            console.error(err)
            showAlert('Error al guardar accesorio', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setLoadingDelete(true)
            await deleteAccessory(dealerId, deleteId)
            showAlert('Accesorio eliminado')
            setDeleteId(null)
            loadAccessories()
        } catch (err) {
            console.error(err)
            showAlert('Error al eliminar accesorio', 'error')
        } finally {
            setLoadingDelete(false)
        }
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Mis Accesorios</Typography>
                <Button variant="contained" onClick={() => {
                    setEditingAccessory(null)
                    setOpenForm(true)
                }}>
                    Agregar Accesorio
                </Button>
            </Stack>

            {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress />
                </Box>
            )}

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Vehículo</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accessories.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>{a.description}</TableCell>
                            <TableCell>${a.price}</TableCell>
                            <TableCell>{a.stock}</TableCell>
                            <TableCell>{a.vehicle?.model || '-'}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => {
                                    setEditingAccessory(a)
                                    setOpenForm(true)
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => setDeleteId(a.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar este accesorio?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
                    <Button
                        color="error"
                        onClick={handleDelete}
                        disabled={loadingDelete}
                        startIcon={loadingDelete ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loadingDelete ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogActions>
            </Dialog>

            <AccessoryFormDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                initialData={editingAccessory}
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

export default Accessories


