import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/auth/login/', credentials)
            const { access } = response.data
            localStorage.setItem('token', access)
            setToken(access)
            const decoded = jwt_decode(access)
            setUser(decoded)
            navigate('/')
            return { success: true }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message)
            return {
                success: false,
                error: error.response?.data?.detail || 
                      error.response?.data?.message || 
                      'Invalid username or password'
            }
        }
    }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register/', userData)
      if (response.status === 201) {
        // Auto-login after successful registration
        const loginResponse = await axios.post('/api/auth/login/', {
          username: userData.username,
          password: userData.password
        })
        const { access } = loginResponse.data
        localStorage.setItem('token', access)
        setToken(access)
        const decoded = jwt_decode(access)
        setUser(decoded)
        navigate('/')
        return { success: true }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false,
        error: error.response?.data || 'Registration failed'
      }
    }
  }

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      setUser(decoded)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)