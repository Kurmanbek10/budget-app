import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './SpendingChart.css'

export default function SpendingChart({ transactions }) {
  const byMonth = {}
  transactions.forEach(t => {
    const month = t.date.slice(0, 7)
    if (!byMonth[month]) byMonth[month] = { month, Income: 0, Expense: 0 }
    byMonth[month][t.category] = (byMonth[month][t.category] || 0) + t.amount
  })

  const data = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month))

  if (data.length === 0) return null

  return (
    <div className="chart-card">
      <h2 className="chart-title">Monthly Overview</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={v => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
          <Legend />
          <Bar dataKey="Income" fill="#22c55e" radius={[4,4,0,0]} />
          <Bar dataKey="Expense" fill="#ef4444" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
