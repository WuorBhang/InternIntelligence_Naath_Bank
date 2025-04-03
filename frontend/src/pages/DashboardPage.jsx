import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AccountCard from '../components/AccountCard'
import RecentTransactions from '../components/RecentTransactions'
import QuickActions from '../components/QuickActions'

const DashboardPage = () => {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [accountsRes, transactionsRes] = await Promise.all([
          axios.get('/api/banking/accounts/'),
          axios.get('/api/banking/accounts/transactions/')
        ])
        setAccounts(accountsRes.data)
        setTransactions(transactionsRes.data.slice(0, 5))
      } catch (error) {
        toast.error('Failed to load dashboard data')
        console.error('Dashboard error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-equity-blue">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Summary */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">My Accounts</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map(account => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-12 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <RecentTransactions transactions={transactions} />
        )}
      </div>
    </div>
  )
}

export default DashboardPage