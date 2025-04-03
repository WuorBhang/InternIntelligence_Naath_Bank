import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import RecentTransactions from '../components/RecentTransactions'
import AccountSummary from '../components/AccountSummary'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const TransactionsPage = () => {
  const { accountNumber } = useParams()
  const [transactions, setTransactions] = useState([])
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [accountRes, transactionsRes] = await Promise.all([
          axios.get(`/api/banking/accounts/${accountNumber}/`),
          axios.get(`/api/banking/accounts/${accountNumber}/transactions/`)
        ])
        setAccount(accountRes.data)
        setTransactions(transactionsRes.data)
      } catch (error) {
        toast.error('Failed to load account data')
        console.error('Account error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accountNumber])

  return (
    <div className="space-y-6">
      <Link to="/accounts" className="flex items-center text-equity-blue hover:underline">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Accounts
      </Link>

      {account && <AccountSummary account={account} />}

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
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

export default TransactionsPage