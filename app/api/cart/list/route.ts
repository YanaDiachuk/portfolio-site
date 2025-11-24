import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

const COOKIE_NAME = 'sid'

export async function GET(req: NextRequest) {
  let sid = req.cookies.get(COOKIE_NAME)?.value
  const needSet = !sid
  if (!sid) sid = crypto.randomUUID()

  const supa = supabaseServer()

  const { data: items, error } = await supa
    .from('cart_items')
    .select(`
      id,
      qty,
      artwork_id,
      artworks (
        id,
        title,
        price_cents,
        image_url,
        in_stock
      )
    `)
    .eq('session_id', sid)

  const res = NextResponse.json({ items })

  if (needSet) {
    res.cookies.set(COOKIE_NAME, sid, { httpOnly: true, sameSite: 'lax', path: '/' })
  }

  return res
}
