import Link from 'next/link'
import { supabaseServer } from '@/lib/supabaseServer'

export default async function BlogPage() {
  const supabase = supabaseServer()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })

  if (!posts) return <div>No posts yet.</div>

  return (
    <section className="space-y-8">
      <h1 className="h1 mb-6">Blog</h1>

      {posts.map((post) => (
        <article key={post.id} className="card">
          <h2 className="h2 mb-2">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className="text-neutral-400 text-xs mb-2">
            {post.published_at && new Date(post.published_at).toLocaleDateString()}
          </p>

          {/* Если хочешь показать кусочек статьи */}
          {post.content_md && (
            <p className="text-sm text-neutral-200 line-clamp-3 whitespace-pre-line">
              {post.content_md.slice(0, 200)}...
            </p>
          )}
        </article>
      ))}
    </section>
  )
}
