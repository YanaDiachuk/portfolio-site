'use client'
import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import CalendarFilter from './CalendarFilter'

export default function BlogFilters({ onResult }: { onResult: (posts: any[]) => void }) {
  const [q, setQ] = useState('')
  const [from, setFrom] = useState<string | undefined>()
  const [to, setTo] = useState<string | undefined>()
  const [selected, setSelected] = useState<string[]>([]) // под теги, на будущее

  useEffect(() => {
    // При первом рендере сразу загружаем посты с текущими параметрами (по сути, все)
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function search() {
    const r = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ q, tagIds: selected, from, to })
    })
    const j = await r.json()
    onResult(j.posts ?? [])
  }

  return (
    <div className="space-y-2 text-xs text-neutral-400">
      <SearchInput value={q} onChange={v => setQ(v)} />

      <CalendarFilter
        from={from}
        to={to}
        onChange={({ from, to }) => {
          setFrom(from)
          setTo(to)
        }}
      />

      {/* Кнопка минимальная, без лишнего акцента */}
      <button
        type="button"
        data-cy="apply-filters"
        className="btn !px-2 !py-1 !text-xs border-neutral-700"
        onClick={search}
      >
        Apply
      </button>
    </div>
  )
}
