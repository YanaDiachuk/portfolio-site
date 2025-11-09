
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { getOrSetSessionId } from '@/lib/cookies'

export async function GET() {
  const sid = getOrSetSessionId()
  const supa = supabaseServer()
  const { data } = await supa
    .from('cart_items')
    .select('id, qty, artworks(*)')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
  return NextResponse.json({ items: data ?? [] })
}
