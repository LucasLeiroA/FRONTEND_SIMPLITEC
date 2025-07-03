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
    const [dealerUserCount, setDealerUserCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [vehiclesByDealer, setVehiclesByDealer] = useState([]);
    const [usersByDealer, setUsersByDealer] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dealers = await getAllDealers();
                const users = await getAllUsers();

                const clientsUser = users.filter(user => user.role === 'client');
                const dealersUser = users.filter(user => user.role === 'dealer');


                setDealerUserCount(dealersUser.length);
                setClientCount(clientsUser.length);


                setDealers(dealers);

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
        <Container maxWidth={false} sx={{ py: 4, px: 4, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Total de Concesionarios</Typography>
                                <Typography variant="h3" color="primary" fontWeight={600}>
                                    {dealers.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Total de Usuarios Consesonarios</Typography>
                                <Typography variant="h3" color="secondary" fontWeight={600}>
                                    {dealerUserCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Total de Usarios</Typography>
                                <Typography variant="h3" color="secondary" fontWeight={600}>
                                    {clientCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        {renderBarChart('Vehículos por Concesionario', vehiclesByDealer, '#2196f3')}
                    </div>
                    <div style={{ flex: 1 }}>
                        {renderBarChart('Usuarios por Concesionario', usersByDealer, '#4caf50')}
                    </div>
                </div>

                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Resumen por Concesionario</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                            }}>
                                {dealers.map((dealer) => {
                                    const vCount = vehiclesByDealer.find(d => d.name === dealer.name)?.count || 0;
                                    const uCount = usersByDealer.find(d => d.name === dealer.name)?.count || 0;
                                    return (
                                        <div key={dealer.id} style={{
                                            width: '100%',
                                            maxWidth: '400px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '1rem',
                                        }}>
                                            <Typography fontWeight={600}>{dealer.name}</Typography>
                                            <Typography variant="body2">ID: {dealer.id}</Typography>
                                            <Typography variant="body2">Email: {dealer.email}</Typography>
                                            <Typography variant="body2" color="primary">Vehículos: {vCount}</Typography>
                                            <Typography variant="body2" color="secondary">Usuarios: {uCount}</Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>

    );
};

export default AdminDashboardCharts;
