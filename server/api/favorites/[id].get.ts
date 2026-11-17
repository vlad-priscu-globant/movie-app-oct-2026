import { movieIdParamsSchema } from '#shared/types/movie'
import type { FavoriteStatus } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<FavoriteStatus> => {
  const { username } = await requireUser(event)
  const { id } = await getValidatedRouterParams(event, (params) => movieIdParamsSchema.parse(params))

  return { isFavorite: await useFavoritesRepository().has(username, id) }
})
