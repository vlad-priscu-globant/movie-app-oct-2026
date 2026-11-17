import { SignJWT, jwtVerify } from 'jose'
import type { H3Event } from 'h3'
import { sessionUserSchema } from '#shared/types/auth'
import type { Credentials, SessionUser } from '#shared/types/auth'

const AUTH_COOKIE_NAME = 'auth_token'
const SESSION_TTL_SECONDS = 60 * 60 * 24

// TODO(session-08): remove when Supabase Auth lands. These are demo credentials only.
const DEMO_USERS: ReadonlyArray<Readonly<Credentials>> = [
  { email: 'student@adresa.ro', password: 'password123' },
]
// TODO(session-08): remove when Supabase Auth lands. Accepted with ANY password.
const DEMO_PASSWORDLESS_USERNAMES: ReadonlyArray<string> = ['guest', 'student']

/** Returns the session user for valid (demo) credentials, otherwise `null`. */
export function authenticateDemoUser({ email, password }: Credentials): SessionUser | null {
  const matchesUser = DEMO_USERS.some((user) => user.email === email && user.password === password)
  return matchesUser || DEMO_PASSWORDLESS_USERNAMES.includes(email) ? { username: email } : null
}

function getJwtSecret(event: H3Event): Uint8Array {
  const { jwtSecret } = useRuntimeConfig(event)
  if (!jwtSecret) {
    console.error('[auth] NUXT_JWT_SECRET is not configured')
    throw createError({ statusCode: 500, statusMessage: 'Authentication is not configured' })
  }
  return new TextEncoder().encode(jwtSecret)
}

export async function startSession(event: H3Event, user: SessionUser): Promise<void> {
  const token = await new SignJWT({ username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getJwtSecret(event))

  setCookie(event, AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: getRequestURL(event).protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export function endSession(event: H3Event): void {
  deleteCookie(event, AUTH_COOKIE_NAME, { path: '/' })
}

export async function getSessionUser(event: H3Event): Promise<SessionUser | null> {
  const token = getCookie(event, AUTH_COOKIE_NAME)
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getJwtSecret(event))
    const parsed = sessionUserSchema.safeParse(payload)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

/** Guard for protected routes. Throws 401 when there is no valid session. */
export async function requireUser(event: H3Event): Promise<SessionUser> {
  const user = await getSessionUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }
  return user
}
