import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Login from '../pages/admin/Login'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from '../components/layout/shared/ProtectedRoute'
import Dealers from '../pages/admin/Dealers'
import Users from '../pages/admin/users'
import Vehicles from '../pages/admin/Vehicles'


const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/admin/login" element={<Login />} />

			<Route path="/admin/dashboard" element={
				<ProtectedRoute allowedRoles={['admin']}>
					<AdminLayout>
						<Dashboard />
					</AdminLayout>
				</ProtectedRoute>
			} />


			<Route path="/admin/dealers" element={
				<ProtectedRoute allowedRoles={['admin']}>
					<AdminLayout>
						<Dealers />
					</AdminLayout>
				</ProtectedRoute>
			} />

			<Route path="/admin/users" element={
				<ProtectedRoute allowedRoles={['admin', 'dealer']}>
					<AdminLayout>
						<Users />
					</AdminLayout>
				</ProtectedRoute>
			} />



			<Route path="/admin/mis-autos" element={
				<ProtectedRoute allowedRoles={['dealer']}>
					<AdminLayout>
						<Vehicles />
					</AdminLayout>
				</ProtectedRoute>
			} />



		</Routes>
	)
}

export default AdminRoutes
