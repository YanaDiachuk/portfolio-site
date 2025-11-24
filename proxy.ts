// proxy.ts
import { NextResponse, type NextRequest } from 'next/server'

const COOKIE_NAME = 'sid'
const MAX_AGE = 60 * 60 * 24 * 60 // 60 дней

// Важно: именно функция с именем proxy
export function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const hasSid = req.cookies.get(COOKIE_NAME)?.value
  if (!hasSid) {
    // В Node Runtime глобальный crypto тоже есть
    const sid = crypto.randomUUID()

    res.cookies.set(COOKIE_NAME, sid, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure:
        req.nextUrl.protocol === 'https:' ||
        process.env.NODE_ENV === 'production',
      maxAge: MAX_AGE,
    })
  }

  return res
}

// Не трогаем статику и ассеты — как было в middleware
export const config = {
  matcher: [
    // всё кроме _next, статики и файлов по расширениям
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|txt)).*)',
  ],
}
