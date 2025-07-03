import { useEffect, useState } from 'react';
import {
    Box, Card, CardContent, Typography, CircularProgress, Grid, Divider, useTheme, Container
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { getAllDealers } from '../../services/dealerService';
import { getAllUsers, getUsersByDealerId } from '../../services/userService';
import { getVehiclesByDealerId } from '../../services/vehicleService';

const AdminDashboardCharts = () => {
    const [loading, setLoading] = useState(true);
    const [dealers, setDealers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [vehiclesByDealer, setVehiclesByDealer] = useState([]);
    const [usersByDealer, setUsersByDealer] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dealers = await getAllDealers();
                const users = await getAllUsers();
                setDealers(dealers);
                setTotalUsers(users.length);

                const vehiclesData = await Promise.all(
                    dealers.map(async (dealer) => {
                        const vehicles = await getVehiclesByDealerId(dealer.id);
                        return {
                            name: dealer.name,
                            count: vehicles.length,
                        };
                    })
                );

                const usersData = await Promise.all(
                    dealers.map(async (dealer) => {
                        const users = await getUsersByDealerId(dealer.id);
                        return {
                            name: dealer.name,
                            count: users.length,
                        };
                    })
                );

                setVehiclesByDealer(vehiclesData);
                setUsersByDealer(usersData);
            } catch (err) {
                console.error('Error al cargar datos del dashboard', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderBarChart = (title, data, color) => (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
                            <XAxis type="number" allowDecimals={false} stroke={theme.palette.text.primary} />
                            <YAxis type="category" dataKey="name" width={150} stroke={theme.palette.text.primary} />
                            <Tooltip />
                            <Bar dataKey="count" fill={color} radius={[0, 6, 6, 0]}>
                                <LabelList dataKey="count" position="right" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth={false} sx={{ py: 4, px: 4, width: '100%', backgroundColor: 'green' }}>
            <Grid container spacing={4}>


                <Grid container direction="column" spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Grid container direction="row" spacing={4}>
                            <Grid item>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Total de Concesionarios</Typography>
                                        <Typography variant="h3" color="primary" fontWeight={600}>{dealers.length}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Total de Usuarios</Typography>
                                        <Typography variant="h3" color="secondary" fontWeight={600}>{totalUsers}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid container direction="row">
                            <Grid item xs={12} md={6} sx={{ p: 2 }}>
                                {renderBarChart('Vehículos por Concesionario', vehiclesByDealer, '#2196f3')}
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ p: 2 }}>
                                {renderBarChart('Usuarios por Concesionario', usersByDealer, '#4caf50')}
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


                <Grid sx={{ width: '100%' }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Resumen por Concesionario</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={3}>
                                {dealers.map((dealer) => {
                                    const vCount = vehiclesByDealer.find(d => d.name === dealer.name)?.count || 0;
                                    const uCount = usersByDealer.find(d => d.name === dealer.name)?.count || 0;
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={dealer.id}>
                                            <Box p={2} border="1px solid #ccc" borderRadius={2} height="100%">
                                                <Typography fontWeight={600}>{dealer.name}</Typography>
                                                <Typography variant="body2">ID: {dealer.id}</Typography>
                                                <Typography variant="body2">Email: {dealer.email}</Typography>
                                                <Typography variant="body2" color="primary">Vehículos: {vCount}</Typography>
                                                <Typography variant="body2" color="secondary">Usuarios: {uCount}</Typography>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboardCharts;
