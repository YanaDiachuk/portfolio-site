'use client'
import { useEffect, useState } from 'react'
import { money } from '@/lib/formatting'

export default function CartList() {
  const [items, setItems] = useState<any[]>([])
  async function load() {
    const r = await fetch('/api/cart/list'); const j = await r.json()
    setItems(j.items ?? [])
  }
  useEffect(() => { load() }, [])
  async function removeItem(id: string) {
    await fetch('/api/cart/remove', { method: 'POST', body: JSON.stringify({ cartItemId: id }) })
    load()
  }
  async function clearAll() {
    await fetch('/api/cart/clear', { method: 'POST' })
    load()
  }
  const total = items.reduce((s, it) => s + (it.artworks?.price_cents ?? 0) * (it.qty ?? 1), 0)

  return (
    <div className="card">
      <h2 className="h2 mb-4">Cart</h2>
      {items.length === 0 ? <p>Cart is empty.</p> : (
        <ul className="space-y-3">
          {items.map(it => (
            <li key={it.id} className="flex items-center justify-between">
              <div>
                <div className="font-techno">{it.artworks?.title}</div>
                <div className="text-sm opacity-70">{money(it.artworks?.price_cents)}</div>
              </div>
              <button className="btn" onClick={() => removeItem(it.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div>Total: {money(total)}</div>
        <div className="flex gap-2">
          <button className="btn" onClick={clearAll}>Clear</button>
          <button className="btn" disabled>Checkout (later)</button>
        </div>
      </div>
    </div>
  )
}

