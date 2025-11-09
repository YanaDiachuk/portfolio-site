
import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'Portfolio', description: 'Art • Blog • Contact' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Header />
          <main className="mt-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
