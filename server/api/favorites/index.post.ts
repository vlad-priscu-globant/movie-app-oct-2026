import { movieSchema } from '#shared/types/movie'
import type { Movie } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<Movie> => {
  const { id: userId } = await requireUser(event)
  const movie = await readValidatedBody(event, (body) => movieSchema.parse(body))
  const repository = await useFavoritesRepository(event)

  const added = await repository.add(userId, movie)
  if (!added) {
    throw createError({ statusCode: 409, statusMessage: 'Movie already in favorites' })
  }

  setResponseStatus(event, 201)
  return movie
})
