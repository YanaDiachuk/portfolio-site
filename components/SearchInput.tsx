'use client'
export default function SearchInput({ value, onChange }:{value:string,onChange:(v:string)=>void}) {
  return <input className="input" placeholder="Search by title..." value={value} onChange={e=>onChange(e.target.value)} />
}

