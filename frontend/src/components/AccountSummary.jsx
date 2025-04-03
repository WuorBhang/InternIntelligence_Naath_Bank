import { format } from 'date-fns'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

const AccountSummary = ({ account }) => {
  const balanceColor = account.balance >= 0 ? 'text-green-600' : 'text-red-600'
  const balanceIcon = account.balance >= 0 ? (
    <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
  ) : (
    <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
  )

  return (
    <div className="card bg-equity-blue/5 border-l-4 border-equity-blue">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
          <p className="text-sm text-gray-500">{account.account_number}</p>
          <p className="text-sm text-gray-500 capitalize">{account.account_type.toLowerCase()} account</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Balance</h3>
          <div className="flex items-center space-x-2">
            {balanceIcon}
            <span className={`text-xl font-bold ${balanceColor}`}>
              KES {account.balance.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Account Since</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(account.created_at), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccountSummary