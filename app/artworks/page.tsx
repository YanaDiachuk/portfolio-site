import { supabaseServer } from '@/lib/supabaseServer'
import ArtworkCard from '@/components/ArtworkCard'

export default async function Artworks() {
  const supa = supabaseServer()
  const { data: artworks } = await supa.from('artworks').select('*').order('created_at', { ascending: false })
  return (
    <section>
      <h1 className="h1 mb-6">Artworks</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {artworks?.map(a => <ArtworkCard key={a.id} artwork={a} />)}
      </div>
    </section>
  )
}
