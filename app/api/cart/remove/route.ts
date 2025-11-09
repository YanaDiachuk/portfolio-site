import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { getOrSetSessionId } from '@/lib/cookies'

export async function POST(req: Request) {
  const { cartItemId } = await req.json()
  const sid = getOrSetSessionId()
  const supa = supabaseServer()
  await supa.from('cart_items').delete().match({ id: cartItemId, session_id: sid })
  return NextResponse.json({ ok: true })
}

