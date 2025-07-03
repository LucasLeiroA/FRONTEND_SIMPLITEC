import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, role } = useAuth()

    if (!user) return <Navigate to="/" replace />
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />

    return children
}

export default ProtectedRoute
