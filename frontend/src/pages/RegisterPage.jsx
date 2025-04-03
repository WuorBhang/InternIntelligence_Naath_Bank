import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    security_question: '',
    security_answer: ''
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (userData.password !== userData.password2) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    const { success, error } = await register({
      username: userData.username,
      password: userData.password,
      email: userData.email,
      phone: userData.phone,
      first_name: userData.first_name,
      last_name: userData.last_name,
      security_question: userData.security_question,
      security_answer: userData.security_answer
    })
    setLoading(false)
    
    if (success) {
      toast.success('Registration successful! You have been automatically logged in.')
    } else {
      toast.error(error || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-equity-blue to-equity-light-blue">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-equity-blue mb-8">Create an Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Question
            </label>
            <select
              name="security_question"
              value={userData.security_question}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a security question</option>
              <option value="What was your first pet's name?">What was your first pet's name?</option>
              <option value="What city were you born in?">What city were you born in?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Answer
            </label>
            <input
              type="text"
              name="security_answer"
              value={userData.security_answer}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={userData.password2}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center mt-6"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-equity-blue hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage