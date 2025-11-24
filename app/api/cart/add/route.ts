import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

const COOKIE_NAME = 'sid'

export async function POST(req: NextRequest) {
  const { artworkId, qty = 1 } = await req.json()

  // читаем sid из запроса
  let sid = req.cookies.get(COOKIE_NAME)?.value
  const needSet = !sid
  if (!sid) sid = crypto.randomUUID()

  const supa = supabaseServer()
  await supa.from('cart_items').insert({ session_id: sid, artwork_id: artworkId, qty })

  // ставим cookie в ответе, если не было
  const res = NextResponse.json({ ok: true })
  if (needSet) {
    res.cookies.set(COOKIE_NAME, sid, { httpOnly: true, sameSite: 'lax', path: '/' })
  }
  return res
}
