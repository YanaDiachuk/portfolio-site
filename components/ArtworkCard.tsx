'use client'
import { useState } from 'react'
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

  // 1. ДОБАВЛЕНО состояние для тоста
  const [showToast, setShowToast] = useState(false)

  // 2. ПЕРЕПИСАНА функция addToCart — alert УДАЛЁН,
  //    заменён на showToast (toast)
  async function addToCart() {
    await fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ artworkId: artwork.id, qty: 1 }),
    })

    // 3. Вместо alert — включаем тост
    setShowToast(true)

    // 4. Тост исчезает через 2 секунды
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="card relative">

      {/* ОБРАБОТКА ИЗОБРАЖЕНИЯ */}
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

      <h3 className="h2 mb-1" data-cy="artwork-title">{artwork.title}</h3>

      {artwork.description && (
        <p className="opacity-80 mb-2">{artwork.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="font-techno">
          {money(artwork.price_cents)}
        </span>

        {/* 5. ДОБАВЛЕН data-cy для Cypress */}
        <button
          className="btn"
          onClick={addToCart}
          disabled={!artwork.in_stock}
          data-cy="add-to-cart"
        >
          Add to cart
        </button>
      </div>

      {/* 6. ДОБАВЛЕН тост. Появляется поверх карточки. */}
      {showToast && (
        <div
          data-cy="cart-toast"
          className="
            absolute 
            bottom-4 right-4
            bg-goth-card/90
            border border-neutral-700
            rounded-xl
            px-3 py-2
            text-sm
            shadow-brass
          "
        >
          Item added to cart
        </div>
      )}
    </div>
  )
}
