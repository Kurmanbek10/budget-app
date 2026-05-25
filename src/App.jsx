import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import SummaryCards from './components/SummaryCards'
import SpendingChart from './components/SpendingChart'
import TransactionTable from './components/TransactionTable'
import AddTransactionModal from './components/AddTransactionModal'
import './App.css'

export default function App() {
  const [transactions, setTransactions] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterMonth, setFilterMonth] = useState('All')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch('/budget.csv')
      .then(r => r.text())
      .then(csv => {
        const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true })
        setTransactions(data.map((row, i) => ({ ...row, id: i, amount: parseFloat(row.amount) })))
      })
  }, [])

  const months = ['All', ...Array.from(new Set(transactions.map(t => t.date.slice(0, 7)))).sort()]

  const filtered = transactions.filter(t => {
    const categoryMatch = filterCategory === 'All' || t.category === filterCategory
    const monthMatch = filterMonth === 'All' || t.date.startsWith(filterMonth)
    return categoryMatch && monthMatch
  })

  const totalIncome = filtered.filter(t => t.category === 'Income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = filtered.filter(t => t.category === 'Expense').reduce((s, t) => s + t.amount, 0)
  const net = totalIncome - totalExpenses

  function handleAdd(entry) {
    setTransactions(prev => [...prev, { ...entry, id: prev.length, amount: parseFloat(entry.amount) }])
    setShowModal(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Budget Dashboard</h1>
            <p className="subtitle">Software Engineer · Illinois</p>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Transaction</button>
        </div>
      </header>

      <main className="app-main">
        <SummaryCards income={totalIncome} expenses={totalExpenses} net={net} />

        <div className="filters">
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
            {months.map(m => <option key={m} value={m}>{m === 'All' ? 'All Months' : m}</option>)}
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <SpendingChart transactions={filtered} />
        <TransactionTable transactions={filtered} />
      </main>

      {showModal && <AddTransactionModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  )
}
