import type { H3Event } from 'h3'
import { z } from 'zod'
import { serverSupabaseUser } from '#supabase/server'
import { sessionUserSchema } from '#shared/types/auth'
import type { SessionUser } from '#shared/types/auth'

const userMetadataSchema = z.object({
  username: z.string().trim().min(1).optional(),
})

function resolveDisplayName(email: string, metadata: z.infer<typeof userMetadataSchema> | undefined): string {
  if (metadata?.username) return metadata.username
  return email.split('@')[0] || email || 'Utilizator'
}

/** Guard for protected Nitro routes. Validates the Supabase SSR JWT claims. */
export async function requireUser(event: H3Event): Promise<SessionUser> {
  const claims = await serverSupabaseUser(event)
  if (!claims?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }

  const email = typeof claims.email === 'string' ? claims.email : ''
  const parsedMetadata = userMetadataSchema.safeParse(claims.user_metadata)
  const username = resolveDisplayName(email, parsedMetadata.success ? parsedMetadata.data : undefined)

  return sessionUserSchema.parse({
    id: claims.sub,
    email,
    username,
  })
}
