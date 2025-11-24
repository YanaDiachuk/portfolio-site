'use client'

import Image from 'next/image'
import { money } from '@/lib/formatting'

type Artwork = {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  price_cents: number
  currency: string
  in_stock: boolean
}

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  async function addToCart() {
    await fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ artworkId: artwork.id, qty: 1 }),
    })
    alert('Added to cart')
  }

  return (
    <div className="card">
      <div className="relative w-full h-130 mb-3">
        {artwork.image_url && (
          <Image
            src={artwork.image_url}
            alt={artwork.title}
            fill
            className="object-cover rounded-2xl"
          />
        )}
      </div>

      <h3 className="h2 mb-1">{artwork.title}</h3>

      {artwork.description && (
        <p className="opacity-80 mb-2">{artwork.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="font-techno">
          {money(artwork.price_cents)}
        </span>

        <button
          className="btn"
          onClick={addToCart}
          disabled={!artwork.in_stock}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
