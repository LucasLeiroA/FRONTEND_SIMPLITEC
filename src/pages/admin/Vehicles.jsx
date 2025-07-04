import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Stack, Dialog,
    DialogTitle, DialogActions, Snackbar, Alert, CircularProgress,
    TextField, Pagination
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
    getVehiclesByDealerId,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from '../../services/vehicleService'
import { useAuth } from '../../context/AuthContext'
import VehicleFormDialog from '../../components/admin/VehicleFormDialog'

const Vehicles = () => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [vehicles, setVehicles] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [editingVehicle, setEditingVehicle] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [page, setPage] = useState(1)
    const rowsPerPage = 7
    const [search, setSearch] = useState('')

    const showAlert = (msg, severity = 'success') => {
        setAlertMessage(msg)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    useEffect(() => {
        if (dealerId) loadVehicles()
    }, [dealerId])

    const loadVehicles = async () => {
        try {
            const data = await getVehiclesByDealerId(dealerId)
            setVehicles(data)
            setPage(1)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar vehículos', 'error')
        }
    }

    const handleSave = async (formData, vehicleId) => {
        try {
            setLoading(true)
            if (vehicleId) {
                await updateVehicle(dealerId, vehicleId, formData)
                showAlert('Vehículo actualizado correctamente')
            } else {
                await createVehicle(formData)
                showAlert('Vehículo creado correctamente')
            }
            setOpenForm(false)
            loadVehicles()
        } catch (err) {
            console.error(err)
            showAlert('Error al guardar vehículo', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setLoadingDelete(true)
            await deleteVehicle(dealerId, deleteId)
            showAlert('Vehículo eliminado')
            setDeleteId(null)
            loadVehicles()
        } catch (err) {
            console.error(err)
            showAlert('Error al eliminar', 'error')
        } finally {
            setLoadingDelete(false)
        }
    }

    const filteredVehicles = vehicles.filter(v =>
        `${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase())
    )

    const paginatedVehicles = filteredVehicles.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Mis Vehículos</Typography>
                <Button variant="contained" onClick={() => {
                    setEditingVehicle(null)
                    setOpenForm(true)
                }}>
                    Agregar Vehículo
                </Button>
            </Stack>

            <TextField
                fullWidth
                placeholder="Buscar por marca o modelo"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                variant="outlined"
                sx={{ mb: 3 }}
            />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Año</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedVehicles.map((v) => (
                                <TableRow key={v.id}>
                                    <TableCell>
                                        <img
                                            src={v.images?.find(img => img.order === 1)?.url || ''}
                                            alt="preview"
                                            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                                        />
                                    </TableCell>
                                    <TableCell>{v.brand}</TableCell>
                                    <TableCell>{v.model}</TableCell>
                                    <TableCell>{v.year}</TableCell>
                                    <TableCell>${v.price}</TableCell>
                                    <TableCell>{v.stock}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => {
                                            setEditingVehicle(v)
                                            setOpenForm(true)
                                        }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => setDeleteId(v.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination
                            count={Math.ceil(filteredVehicles.length / rowsPerPage)}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar este vehículo?</DialogTitle>
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

            <VehicleFormDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                initialData={editingVehicle}
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

export default Vehicles
