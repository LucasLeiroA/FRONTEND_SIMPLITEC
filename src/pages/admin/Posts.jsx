import {
    Box, Button, Typography, Table, TableHead, TableRow,
    TableCell, TableBody, IconButton, Stack, Dialog,
    DialogTitle, DialogActions, Snackbar, Alert, CircularProgress
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
    getPostsByDealer,
    createPost,
    updatePost,
    deletePost
} from '../../services/postServicea'
import PostFormDialog from '../../components/admin/PostFormDialog'

const Posts = () => {
    const { user } = useAuth()
    const dealerId = user?.dealerId

    const [posts, setPosts] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [editingPost, setEditingPost] = useState(null)
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

    const loadPosts = async () => {
        try {
            const res = await getPostsByDealer(dealerId)
            setPosts(res.data)
        } catch (err) {
            console.error(err)
            showAlert('Error al cargar publicaciones', 'error')
        }
    }

    useEffect(() => {
        if (dealerId) loadPosts()
    }, [dealerId])

    const handleSave = async (formData, postId) => {
        try {
            setLoading(true)
            if (postId) {
                await updatePost(dealerId, postId, formData)
                showAlert('Publicación actualizada')
            } else {
                await createPost(dealerId, formData)
                showAlert('Publicación creada')
            }
            setOpenForm(false)
            loadPosts()
        } catch (err) {
            console.error(err)
            showAlert('Error al guardar publicación', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setLoadingDelete(true)
            await deletePost(dealerId, deleteId)
            showAlert('Publicación eliminada')
            setDeleteId(null)
            loadPosts()
        } catch (err) {
            console.error(err)
            showAlert('Error al eliminar publicación', 'error')
        } finally {
            setLoadingDelete(false)
        }
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5">Mis Publicaciones</Typography>
                <Button variant="contained" onClick={() => {
                    setEditingPost(null)
                    setOpenForm(true)
                }}>
                    Agregar Publicación
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
                        <TableCell>Imagen</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Vehículos</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>
                                <img
                                    src={p.images?.[0]?.url || ''}
                                    alt="preview"
                                    style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                                />
                            </TableCell>
                            <TableCell>{p.title}</TableCell>
                            <TableCell>${p.price}</TableCell>
                            <TableCell>
                                {p.vehicles.map(v => `${v.vehicle.brand} ${v.vehicle.model}`).join(', ')}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => {
                                    setEditingPost(p)
                                    setOpenForm(true)
                                }}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => setDeleteId(p.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar esta publicación?</DialogTitle>
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

            <PostFormDialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSave={handleSave}
                initialData={editingPost}
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

export default Posts
