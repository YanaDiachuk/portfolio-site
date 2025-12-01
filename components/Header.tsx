// components/Header.tsx
'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      {/* Логотип / название сайта */}
      <Link
        href="/"
        className="font-main text-xl tracking-wide"
      >
        Angie
      </Link>

      <nav className="flex flex-wrap gap-2">
        <Link href="/artworks" data-cy="artworks-btn" className="btn px-3 py-1 text-sm md:text-base">
          Artworks
        </Link>
        <Link href="/blog" data-cy="blog-btn" className="btn px-3 py-1 text-sm md:text-base">
          Blog
        </Link>
        <Link href="/contact" data-cy="contact-btn" className="btn px-3 py-1 text-sm md:text-base">
          Contact
        </Link>
        <Link href="/cart" data-cy="cart-btn" className="btn px-3 py-1 text-sm md:text-base">
          Cart
        </Link>
      </nav>
    </header>
  )
}
