import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.message) return NextResponse.json({ ok: false }, { status: 400 })
  const supa = supabaseServer()
  await supa.from('contact_messages').insert({
    name: body.name ?? null,
    email: body.email ?? null,
    message: body.message
  })
  return NextResponse.json({ ok: true })
}

