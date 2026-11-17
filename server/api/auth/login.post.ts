import { credentialsSchema } from '#shared/types/auth'
import type { SessionUser } from '#shared/types/auth'

export default defineEventHandler(async (event): Promise<SessionUser> => {
  const credentials = await readValidatedBody(event, (body) => credentialsSchema.parse(body))
  const user = authenticateDemoUser(credentials)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  await startSession(event, user)
  return user
})
