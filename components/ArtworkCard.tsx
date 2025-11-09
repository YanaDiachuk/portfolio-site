'use client'
import Image from 'next/image'
import { money } from '@/lib/formatting'

export default function ArtworkCard({ artwork }: { artwork: any }) {
  async function addToCart() {
    await fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ artworkId: artwork.id, qty: 1 }),
    })
    alert('Added to cart')
  }

  return (
    <div className="card">
      <div className="relative aspect-[4/3] mb-3 grid-plate">
        {artwork.image_url && (
          <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover rounded-2xl" />
        )}
      </div>
      <h3 className="h2 mb-1">{artwork.title}</h3>
      <p className="opacity-80 mb-2">{artwork.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-techno">{money(artwork.price_cents, artwork.currency)}</span>
        <button className="btn" onClick={addToCart} disabled={!artwork.in_stock}>Add to cart</button>
      </div>
    </div>
  )
}

