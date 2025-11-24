import { supabaseServer } from '@/lib/supabaseServer'

// ВАЖНО: params теперь Promise, поэтому мы должны ждать его с await
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params   // ← ключевая строка: достаём slug правильно

  const supabase = supabaseServer()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)   // ← используем slug, а не params.slug
    .single()

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.published_at}</p>
      <div className="whitespace-pre-line">
        {post.content_md}
      </div>
    </section>
  )
}
