import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        const storedUserId = localStorage.getItem('userId');
        const storedDealerId = localStorage.getItem('dealerId');
        const storedEmail = localStorage.getItem('email');
        const storedDealerName = localStorage.getItem('dealerName');

        if (storedToken && storedRole && storedUserId) {
            setToken(storedToken);
            setRole(storedRole);
            setUser({
                id: storedUserId,
                role: storedRole,
                email: storedEmail,
                dealerId: storedDealerId ? parseInt(storedDealerId) : null,
                dealer: { name: storedDealerName }
            });
        }

        setLoading(false);
    }, []);


    const login = async (email, password) => {
        const { token, user } = await loginService(email, password)
        localStorage.setItem('token', token)
        localStorage.setItem('role', user.role)
        localStorage.setItem('userId', user.id)
        localStorage.setItem('dealerId', user.dealerId || '')
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('dealerName', user.dealer?.name || '');
        setToken(token)
        setUser(user)
        setRole(user.role)


    }




    const logout = () => {
        localStorage.clear()
        setUser(null)
        setRole(null)
        setToken(null)
        navigate('/')
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                token,
                login,
                logout,
                loading,
                dealerId: user?.dealerId || null
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
