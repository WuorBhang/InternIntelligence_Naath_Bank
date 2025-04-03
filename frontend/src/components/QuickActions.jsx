import { Link } from 'react-router-dom'
import { ArrowUpTrayIcon, ArrowDownTrayIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const QuickActions = () => {
  const actions = [
    {
      name: 'Transfer Money',
      icon: <ArrowUpTrayIcon className="h-5 w-5 text-equity-blue" />,
      path: '/transfer'
    },
    {
      name: 'Deposit',
      icon: <ArrowDownTrayIcon className="h-5 w-5 text-equity-blue" />,
      path: '/deposit'
    },
    {
      name: 'Pay Bill',
      icon: <CurrencyDollarIcon className="h-5 w-5 text-equity-blue" />,
      path: '/pay-bill'
    }
  ]

  return (
    <div className="card space-y-4">
      {actions.map((action) => (
        <Link
          key={action.name}
          to={action.path}
          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="p-2 bg-equity-blue/10 rounded-full">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-gray-700">{action.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default QuickActions