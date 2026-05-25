import { useState } from 'react'
import './TransactionTable.css'

const fmt = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function TransactionTable({ transactions }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })

  const visible = transactions
    .filter(t => t.memo.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let va = a[sort.key], vb = b[sort.key]
      if (sort.key === 'amount') { va = +va; vb = +vb }
      if (va < vb) return sort.dir === 'asc' ? -1 : 1
      if (va > vb) return sort.dir === 'asc' ? 1 : -1
      return 0
    })

  function toggleSort(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })
  }

  function arrow(key) {
    if (sort.key !== key) return ' ↕'
    return sort.dir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h2 className="chart-title">Transactions</h2>
        <input
          className="search"
          placeholder="Search memo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th onClick={() => toggleSort('date')}>Date{arrow('date')}</th>
              <th onClick={() => toggleSort('category')}>Category{arrow('category')}</th>
              <th onClick={() => toggleSort('amount')}>Amount{arrow('amount')}</th>
              <th>Memo</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr><td colSpan={4} className="empty">No transactions found.</td></tr>
            )}
            {visible.map(t => (
              <tr key={t.id}>
                <td className="date">{t.date}</td>
                <td>
                  <span className={`badge ${t.category === 'Income' ? 'badge-income' : 'badge-expense'}`}>
                    {t.category}
                  </span>
                </td>
                <td className={`amount ${t.category === 'Income' ? 'positive' : 'negative'}`}>
                  {t.category === 'Income' ? '+' : '-'}{fmt(t.amount)}
                </td>
                <td className="memo">{t.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="row-count">{visible.length} transaction{visible.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
