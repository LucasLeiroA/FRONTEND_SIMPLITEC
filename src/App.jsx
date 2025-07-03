import { useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AdminRoutes from './routes/AdminRoutes'
import PublicRoutes from './routes/PublicRoutes'

const App = () => {
  const location = useLocation()
  const { loading } = useAuth()

  if (loading) return <div className="p-10 text-center">Cargando sesión...</div>

  const isAdminPath = location.pathname.startsWith('/admin')
  return isAdminPath ? <AdminRoutes /> : <PublicRoutes />
}

export default App
