import { Grid, Typography, Box, CircularProgress, Pagination } from '@mui/material'
import VehicleCard from './VehicleCard'

const VehicleGrid = ({ vehicles, loading, page, setPage, totalPages }) => {
    if (loading) {
        return (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" minHeight={300}>
                <CircularProgress size={48} color="primary" />
            </Box>
        )
    }

    if (!vehicles?.length) {
        return (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" minHeight={300}>
                <Box textAlign="center">
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                        No se encontraron vehículos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Probá modificando los filtros o limpiándolos para ver otras opciones disponibles.
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box flex={1} minHeight="600px" display="flex" flexDirection="column" justifyContent="space-between">
            <Grid container spacing={2}>
                {vehicles.map((vehicle) => (
                    <Grid item key={vehicle.id} xs={12} sm={6} md={4} lg={3}>
                        <VehicleCard vehicle={vehicle} />
                    </Grid>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    )

}
export default VehicleGrid
