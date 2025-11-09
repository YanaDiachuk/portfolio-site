'use client'
import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import CalendarFilter from './CalendarFilter'

export default function BlogFilters({ onResult }:{ onResult:(posts:any[])=>void }) {
  const [q, setQ] = useState('')
  const [from, setFrom] = useState<string|undefined>()
  const [to, setTo] = useState<string|undefined>()
  const [tags, setTags] = useState<any[]>([])
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => { loadTags(); search() }, [])
  async function loadTags() {
    const r = await fetch('/api/search', { method:'POST', body: JSON.stringify({}) })
    // трюк: загрузим теги отдельным эндпойнтом позже; пока пропустим
  }
  async function search() {
    const r = await fetch('/api/search', { method:'POST', body: JSON.stringify({ q, tagIds: selected, from, to }) })
    const j = await r.json()
    onResult(j.posts ?? [])
  }

  return (
    <div className="card space-y-3">
      <SearchInput value={q} onChange={v=>setQ(v)} />
      <CalendarFilter from={from} to={to} onChange={({from,to})=>{setFrom(from); setTo(to)}} />
      {/* Для MVP нарисуем простые чекбоксы позже; сейчас только поиск/календарь */}
      <button className="btn" onClick={search}>Apply filters</button>
    </div>
  )
}

