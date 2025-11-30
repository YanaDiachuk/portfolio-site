'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BlogFilters from '@/components/BlogFilters'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Первоначальная загрузка всех постов
  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    const r = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({})
    })
    const j = await r.json()
    setPosts(j.posts ?? [])
    setLoading(false)
  }

  return (
    <section className="space-y-6">
      <h1 className="h1 mb-2">Blog</h1>

      {/* МАЛЕНЬКИЕ, НЕЗАМЕТНЫЕ ФИЛЬТРЫ ПОД ЗАГОЛОВКОМ */}
      <div className="text-xs text-neutral-400 max-w-sm">
        <BlogFilters onResult={setPosts} />
      </div>

      {/* Список статей */}
      {loading && <p className="text-neutral-500 text-sm">Loading…</p>}

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="card">
            <h2 className="h2 mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>

            <p className="text-neutral-400 text-xs mb-2">
              {post.published_at &&
                new Date(post.published_at).toLocaleDateString()}
            </p>

            {post.content_md && (
              <p className="text-sm text-neutral-200 line-clamp-3 whitespace-pre-line">
                {post.content_md.slice(0, 200)}...
              </p>
            )}
          </article>
        ))}

        {!loading && posts.length === 0 && (
          <p className="text-neutral-500 text-sm">No posts found.</p>
        )}
      </div>
    </section>
  )
}
