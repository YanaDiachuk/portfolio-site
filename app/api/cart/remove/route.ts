import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

const COOKIE_NAME = 'sid'

export async function POST(req: NextRequest) {
  const { cartItemId } = await req.json()

  // читаем или создаём sid
  let sid = req.cookies.get(COOKIE_NAME)?.value
  const needSet = !sid
  if (!sid) sid = crypto.randomUUID()

  const supa = supabaseServer()
  await supa.from('cart_items').delete().match({ id: cartItemId, session_id: sid })

  // ответ
  const res = NextResponse.json({ ok: true })
  if (needSet) {
    res.cookies.set(COOKIE_NAME, sid, { httpOnly: true, sameSite: 'lax', path: '/' })
  }
  return res
}
