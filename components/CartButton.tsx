'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartButton() {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    refresh()
  }, [])
  async function refresh() {
    const r = await fetch('/api/cart/list')
    const j = await r.json()
    setCount(j.items?.length ?? 0)
  }
  return <Link href="/cart" className="btn">Cart ({count})</Link>
}

