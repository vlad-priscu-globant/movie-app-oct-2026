import type { ComputedRef } from 'vue'
import { z } from 'zod'
import type { Credentials, SignUpResult } from '#shared/types/auth'
import type { Database } from '#shared/types/database.types'

interface UseAuth {
  isAuthenticated: ComputedRef<boolean>
  username: ComputedRef<string | null>
  login: (credentials: Credentials) => Promise<void>
  register: (credentials: Credentials) => Promise<SignUpResult>
  logout: () => Promise<void>
}

const userMetadataSchema = z.object({
  username: z.string().trim().min(1).optional(),
})

/**
 * SSR-safe Supabase auth state backed by `@nuxtjs/supabase` cookies and claims.
 */
export function useAuth(): UseAuth {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient<Database>()

  const isAuthenticated = computed(() => Boolean(user.value?.sub))

  const username = computed(() => {
    const claims = user.value
    if (!claims?.sub) return null

    const parsedMetadata = userMetadataSchema.safeParse(claims.user_metadata)
    if (parsedMetadata.success && parsedMetadata.data.username) {
      return parsedMetadata.data.username
    }

    const email = typeof claims.email === 'string' ? claims.email : ''
    return email.split('@')[0] || email || 'Utilizator'
  })

  async function syncClaims(): Promise<void> {
    const { data } = await supabase.auth.getClaims()
    user.value = data?.claims ?? null
  }

  async function login(credentials: Credentials): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    await syncClaims()
    clearNuxtData(FAVORITES_KEY)
  }

  async function register(credentials: Credentials): Promise<SignUpResult> {
    const emailRedirectTo = import.meta.client ? `${window.location.origin}/confirm` : undefined
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: emailRedirectTo ? { emailRedirectTo } : undefined,
    })

    if (error) {
      throw new Error(error.message)
    }

    if (data.session) {
      await syncClaims()
      clearNuxtData(FAVORITES_KEY)
      return { needsEmailConfirmation: false }
    }

    return { needsEmailConfirmation: true }
  }

  async function logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }

    user.value = null
    clearNuxtData(FAVORITES_KEY)
  }

  return { isAuthenticated, username, login, register, logout }
}
