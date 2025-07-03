import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Stack, Dialog, DialogTitle,
    DialogActions, Snackbar, Alert
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import {
    getAllUsers,
    getUsersByDealerId,
    createUser,
    updateUser,
    deleteUser
} from '../../services/userService'
import { getAllDealers } from '../../services/dealerService'
import { useAuth } from '../../context/AuthContext'
import UserFormDialog from '../../components/admin/UserFormDialog'

const Users = () => {
    const { role, user } = useAuth()
    const dealerId = user?.dealerId

    const [users, setUsers] = useState([])
    const [dealers, setDealers] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')

    const showAlert = (msg, severity = 'success') => {
        setAlertMessage(msg)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    useEffect(() => {
        if (role === 'admin') {
            loadAll()
        } else if (dealerId) {
            loadUsersByDealer()
        }
    }, [role, dealerId])

    const loadAll = async () => {
        try {
            const [usersRes, dealersRes] = await Promise.all([
                getAllUsers(),
                getAllDealers()
            ])
            const onlyDealers = usersRes.filter(u => u.role === 'dealer')
            setUsers(onlyDealers)
            setDealers(dealersRes)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar usuarios', 'error')
        }
    }

    const loadUsersByDealer = async () => {
        try {
            const usersRes = await getUsersByDealerId(dealerId)
            setUsers(usersRes)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar usuarios', 'error')
        }
    }

    const handleSave = async (form) => {
        try {
            if (editingUser) {
                await updateUser(editingUser.id, {
                    email: form.email,
                    dealerId: form.dealerId // opcional en dealer
                })
                showAlert('Usuario actualizado correctamente')
            } else {
                await createUser({
                    email: form.email,
                    password: form.password,
                    role: 'dealer',
                    dealerId: form.dealerId || dealerId
                })
                showAlert('Usuario creado correctamente')
            }

            setOpenForm(false)
            role === 'admin' ? loadAll() : loadUsersByDealer()
        } catch (err) {
            console.error(err)
            showAlert('Error al guardar usuario', 'error')
        }
    }

    const handleDelete = async () => {
        try {
            await deleteUser(deleteId)
            showAlert('Usuario eliminado correctamente')
            setDeleteId(null)
            role === 'admin' ? loadAll() : loadUsersByDealer()
        } catch (err) {
            console.error(err)
            showAlert('Error al eliminar usuario', 'error')
        }
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5">
                    {role === 'admin' ? 'Usuarios Dealer' : 'Usuarios del Concesionario'}
                </Typography>
                <Button variant="contained" onClick={() => {
                    setEditingUser(null)
                    setOpenForm(true)
                }}>
                    Agregar Usuario
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        {role === 'admin' && <TableCell>Concesionario</TableCell>}
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.email}</TableCell>
                            {role === 'admin' && (
                                <TableCell>{u.dealer?.name || '—'}</TableCell>
                            )}
                            <TableCell align="right">
                                <IconButton onClick={() => {
                                    setEditingUser(u)
                                    setOpenForm(true)
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => setDeleteId(u.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar este usuario?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
                    <Button color="error" onClick={handleDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>

            <UserFormDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                initialData={editingUser}
                dealers={dealers}
                hideDealerSelect={role !== 'admin'} // oculta el select si no es admin
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

export default Users
