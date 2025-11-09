'use client'
import { useEffect, useState } from 'react'
import BlogFilters from '@/components/BlogFilters'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  useEffect(() => { /* начальная загрузка */ }, [])
  return (
    <section>
      <h1 className="h1 mb-6">Blog</h1>
      <BlogFilters onResult={setPosts} />
      <div className="mt-6 grid gap-4">
        {posts.map(p => (
          <article key={p.id} className="card">
            <h3 className="h2 mb-1">{p.title}</h3>
            <div className="opacity-70 text-sm mb-2">{p.published_at}</div>
            <p>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
