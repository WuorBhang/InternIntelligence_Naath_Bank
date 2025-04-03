import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-equity-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Naath Bank
        </Link>
        
        {user && (
          <div className="flex items-center space-x-6">
            <Link to="/accounts" className="hover:text-equity-light-blue transition-colors">
              My Accounts
            </Link>
            <Link to="/transfer" className="hover:text-equity-light-blue transition-colors">
              Transfer
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-equity-light-blue transition-colors"
            >
              <span>Logout</span>
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar