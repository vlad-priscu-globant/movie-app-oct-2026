import type { SessionUser } from '#shared/types/auth'

export default defineEventHandler((event): Promise<SessionUser | null> => getSessionUser(event))
