import './SummaryCards.css'

const fmt = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function SummaryCards({ income, expenses, net }) {
  return (
    <div className="cards">
      <div className="card card-income">
        <span className="card-label">Total Income</span>
        <span className="card-value">{fmt(income)}</span>
      </div>
      <div className="card card-expense">
        <span className="card-label">Total Expenses</span>
        <span className="card-value">{fmt(expenses)}</span>
      </div>
      <div className={`card ${net >= 0 ? 'card-positive' : 'card-negative'}`}>
        <span className="card-label">Net Savings</span>
        <span className="card-value">{fmt(net)}</span>
      </div>
    </div>
  )
}
