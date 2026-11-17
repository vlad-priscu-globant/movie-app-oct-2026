import { movieSchema } from '#shared/types/movie'
import type { Movie } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<Movie> => {
  const { username } = await requireUser(event)
  const movie = await readValidatedBody(event, (body) => movieSchema.parse(body))

  const added = await useFavoritesRepository().add(username, movie)
  if (!added) {
    throw createError({ statusCode: 409, statusMessage: 'Movie already in favorites' })
  }

  setResponseStatus(event, 201)
  return movie
})
