import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from '../components/layout/shared/ProtectedRoute'
import Dealers from '../pages/admin/Dealers'
import Users from '../pages/admin/users'
import Vehicles from '../pages/admin/Vehicles'
import Accessories from '../pages/admin/Accessories'
import Posts from '../pages/admin/Posts'
import Leads from '../pages/admin/Leads'


const AdminRoutes = () => {
	return (
		<Routes>

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


			<Route path="/admin/accesorios" element={
				<ProtectedRoute allowedRoles={['dealer']}>
					<AdminLayout>
						<Accessories />
					</AdminLayout>
				</ProtectedRoute>
			} />


			<Route path="/admin/publicaciones" element={
				<ProtectedRoute allowedRoles={['dealer']}>
					<AdminLayout>
						<Posts />
					</AdminLayout>
				</ProtectedRoute>
			} />


			<Route path="/admin/cotizaciones" element={
				<ProtectedRoute allowedRoles={['dealer']}>
					<AdminLayout>
						<Leads />
					</AdminLayout>
				</ProtectedRoute>
			} />

		</Routes>
	)
}

export default AdminRoutes
