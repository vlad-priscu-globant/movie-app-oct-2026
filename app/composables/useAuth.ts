import type { ComputedRef, Ref } from 'vue'
import type { Credentials, SessionUser } from '#shared/types/auth'

interface UseAuth {
  user: Readonly<Ref<SessionUser | null>>
  isAuthenticated: ComputedRef<boolean>
  username: ComputedRef<string | null>
  fetchUser: () => Promise<void>
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
}

/**
 * SSR-safe auth state. The JWT lives in an httpOnly cookie that only the server
 * can read, so the client keeps just the resolved `SessionUser`, hydrated from
 * the SSR payload through `useState`.
 */
export function useAuth(): UseAuth {
  const user = useState<SessionUser | null>('auth:user', () => null)
  const requestFetch = useRequestFetch()

  const isAuthenticated = computed(() => user.value !== null)
  const username = computed(() => user.value?.username ?? null)

  async function fetchUser(): Promise<void> {
    user.value = await requestFetch<SessionUser | null>('/api/auth/me')
  }

  async function login(credentials: Credentials): Promise<void> {
    user.value = await $fetch<SessionUser>('/api/auth/login', { method: 'POST', body: credentials })
    clearNuxtData(FAVORITES_KEY)
  }

  async function logout(): Promise<void> {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    clearNuxtData(FAVORITES_KEY)
  }

  return { user: readonly(user), isAuthenticated, username, fetchUser, login, logout }
}
