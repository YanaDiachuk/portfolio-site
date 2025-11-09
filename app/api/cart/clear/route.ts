import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { getOrSetSessionId } from '@/lib/cookies'

export async function POST() {
  const sid = getOrSetSessionId()
  const supa = supabaseServer()
  await supa.from('cart_items').delete().eq('session_id', sid)
  return NextResponse.json({ ok: true })
}

