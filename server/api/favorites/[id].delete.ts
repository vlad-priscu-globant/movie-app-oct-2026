import { movieIdParamsSchema } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<null> => {
  const { id: userId } = await requireUser(event)
  const { id } = await getValidatedRouterParams(event, (params) => movieIdParamsSchema.parse(params))
  const repository = await useFavoritesRepository(event)

  const removed = await repository.remove(userId, id)
  if (!removed) {
    throw createError({ statusCode: 404, statusMessage: 'Favorite not found' })
  }

  setResponseStatus(event, 204)
  return null
})
