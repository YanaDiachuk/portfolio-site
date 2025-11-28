import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import localFont from 'next/font/local'

// ВАЖНО: правильный путь
const mainFont = localFont({
  src: '../public/fonts/Chillax-Variable.ttf',
  variable: '--font-main',
});


export const metadata = { title: 'Portfolio', description: 'Art • Blog • Contact' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={mainFont.variable}>
      <body className="font-sans">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Header />
          <main className="mt-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
