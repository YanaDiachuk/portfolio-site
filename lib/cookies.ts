import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

const COOKIE_NAME = 'sid'

export function getOrSetSessionId(): string {
  const jar = cookies()
  let sid = jar.get(COOKIE_NAME)?.value
  if (!sid) {
    sid = randomUUID()
    jar.set(COOKIE_NAME, sid, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60*60*24*60 })
  }
  return sid
}

