import { useState } from 'react'
import './AddTransactionModal.css'

export default function AddTransactionModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ date: '', category: 'Expense', amount: '', memo: '' })
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.date || !form.amount || !form.memo) { setError('All fields are required.'); return }
    if (isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) { setError('Amount must be a positive number.'); return }
    onAdd(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <p className="modal-error">{error}</p>}
          <label>
            Date
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </label>
          <label>
            Category
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </label>
          <label>
            Amount ($)
            <input type="number" min="0.01" step="0.01" placeholder="0.00"
              value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
          </label>
          <label>
            Memo
            <input type="text" placeholder="Description..."
              value={form.memo} onChange={e => setForm(f => ({ ...f, memo: e.target.value }))} />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
