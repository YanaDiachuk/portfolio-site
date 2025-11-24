// app/api/artworks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

// Если хочешь, можно явно указать среду выполнения
// export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const supa = supabaseServer()

  // На будущее: поддержка ?limit=12
  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? Number(limitParam) : null

  let query = supa
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  if (limit && Number.isFinite(limit) && limit > 0) {
    query = query.limit(limit)
  }

  const { data: artworks, error } = await query

  if (error) {
    console.error('[GET /api/artworks] Supabase error:', error)
    return NextResponse.json(
      { error: 'Failed to load artworks' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    items: artworks ?? [],
  })
}
