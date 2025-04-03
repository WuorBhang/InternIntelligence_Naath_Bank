import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const TransferPage = () => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    reference: ''
  })
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [accountLoading, setAccountLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountLoading(true)
        const response = await axios.get('/api/banking/accounts/')
        setAccounts(response.data)
        if (response.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            fromAccount: response.data[0].account_number
          }))
        }
      } catch (error) {
        toast.error('Failed to load accounts')
        console.error('Accounts error:', error)
      } finally {
        setAccountLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post('/api/banking/transfer/', {
        from_account: formData.fromAccount,
        to_account: formData.toAccount,
        amount: parseFloat(formData.amount),
        reference: formData.reference
      })
      toast.success('Transfer successful!')
      navigate('/accounts')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transfer failed')
      console.error('Transfer error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link to="/accounts" className="flex items-center text-equity-blue hover:underline">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Accounts
      </Link>

      <h1 className="text-3xl font-bold text-equity-blue">Transfer Money</h1>

      <div className="card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Account
            </label>
            {accountLoading ? (
              <div className="input-field bg-gray-200 animate-pulse h-10"></div>
            ) : (
              <select
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleChange}
                className="input-field"
                required
              >
                {accounts.map(account => (
                  <option key={account.id} value={account.account_number}>
                    {account.account_number} - {account.account_type} (KES {account.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Account Number
            </label>
            <input
              type="text"
              name="toAccount"
              value={formData.toAccount}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter recipient account number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (KES)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field"
              min="1"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter reference/description"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center"
            disabled={loading || accountLoading}
          >
            {loading ? 'Processing...' : 'Transfer Money'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransferPage