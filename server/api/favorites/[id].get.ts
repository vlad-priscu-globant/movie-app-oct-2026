import { movieIdParamsSchema } from '#shared/types/movie'
import type { FavoriteStatus } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<FavoriteStatus> => {
  const { id: userId } = await requireUser(event)
  const { id } = await getValidatedRouterParams(event, (params) => movieIdParamsSchema.parse(params))
  const repository = await useFavoritesRepository(event)

  return { isFavorite: await repository.has(userId, id) }
})
