'use client'
export default function CalendarFilter({ from, to, onChange }:{
  from:string|undefined,to:string|undefined,onChange:(v:{from?:string,to?:string})=>void
}) {
  return (
    <div className="flex gap-2">
      <input data-cy='from-date' className="input" type="date" value={from||''} onChange={e=>onChange({from:e.target.value,to})}/>
      <input data-cy='to-date' className="input" type="date" value={to||''} onChange={e=>onChange({from,to:e.target.value})}/>
    </div>
  )
}

