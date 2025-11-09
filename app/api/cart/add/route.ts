import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { getOrSetSessionId } from '@/lib/cookies'

export async function POST(req: Request) {
  const { artworkId, qty = 1 } = await req.json()
  const sid = getOrSetSessionId()
  const supa = supabaseServer()
  await supa.from('cart_items').insert({ session_id: sid, artwork_id: artworkId, qty })
  return NextResponse.json({ ok: true })
}

