import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const { q, tagIds, from, to } = await req.json() as {
    q?: string, tagIds?: string[], from?: string, to?: string
  }
  const supa = supabaseServer()
  let query = supa.from('posts').select('*, post_tags(tag_id), tags:post_tags(tag_id, tags(name,id))')

  if (q) query = query.ilike('title', `%${q}%`)
  if (from) query = query.gte('published_at', from)
  if (to) query = query.lte('published_at', to)
  // фильтр по тегам (пересечение)
  if (tagIds?.length) {
    // простой путь: заберём все и отфильтруем на сервере позже (MVP)
  }
  const { data } = await query.order('published_at', { ascending: false })
  // если заданы tagIds — фильтр на уровне результата
  const filtered = tagIds?.length ? (data ?? []).filter(p =>
    Array.isArray((p as any).post_tags) &&
    (p as any).post_tags.some((pt: any) => tagIds.includes(pt.tag_id))
  ) : (data ?? [])
  return NextResponse.json({ posts: filtered })
}

