import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

const COOKIE_NAME = 'sid'

export async function POST(req: NextRequest) {
  // читаем или создаём sid
  let sid = req.cookies.get(COOKIE_NAME)?.value
  const needSet = !sid
  if (!sid) sid = crypto.randomUUID()

  const supa = supabaseServer()
  await supa.from('cart_items').delete().eq('session_id', sid)

  // формируем ответ и при необходимости ставим cookie
  const res = NextResponse.json({ ok: true })
  if (needSet) {
    res.cookies.set(COOKIE_NAME, sid, { httpOnly: true, sameSite: 'lax', path: '/' })
  }
  return res
}
