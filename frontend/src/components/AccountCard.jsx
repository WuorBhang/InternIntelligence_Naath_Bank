import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext'
import { FaPiggyBank, FaWallet, FaLandmark } from 'react-icons/fa'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

const AccountCard = ({ account }) => {
  const { user } = useAuth()
  const balanceColor = account.balance >= 0 ? 'text-green-600' : 'text-red-600'
  const balanceIcon = account.balance >= 0 ? (
    <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
  ) : (
    <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
  )

  const getAccountIcon = () => {
    switch(account.account_type) {
      case 'SAVINGS': return <FaPiggyBank className="text-navy text-2xl" />
      case 'CURRENT': return <FaWallet className="text-navy-light text-2xl" />
      case 'FIXED': return <FaLandmark className="text-navy text-2xl" />
      default: return <FaWallet className="text-gray-600 text-2xl" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-navy hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-navy">Naath Bank</h3>
          <p className="text-gray-600 text-sm">{account.account_type} Account</p>
        </div>
        {getAccountIcon()}
      </div>
      
      <div className="mb-2">
        <p className="text-gray-600 text-sm">Account Number</p>
        <p className="font-mono text-lg text-navy">{account.account_number}</p>
      </div>
      
      <div className="mb-2">
        <p className="text-gray-600 text-sm">Account Holder</p>
        <p className="text-lg text-navy">{user?.first_name} {user?.last_name}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">Available Balance</p>
        <div className="flex items-center space-x-2">
          {balanceIcon}
          <span className={`text-2xl font-bold ${balanceColor}`}>
            KES {account.balance.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Opened on {format(new Date(account.created_at), 'MMM d, yyyy')}
      </div>
    </div>
  )
}

export default AccountCard
