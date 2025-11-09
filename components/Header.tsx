'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CartButton from './CartButton'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/artworks', label: 'Artworks' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const p = usePathname()
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="h2">Yana • Portfolio</Link>
      <nav className="flex gap-4">
        {links.map(l => (
          <Link key={l.href} className={`btn ${p===l.href ? 'bg-goth-accent/10' : ''}`} href={l.href}>{l.label}</Link>
        ))}
        <CartButton />
      </nav>
    </header>
  )
}

