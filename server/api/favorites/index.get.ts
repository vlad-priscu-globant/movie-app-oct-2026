import type { Movie } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<Movie[]> => {
  const { username } = await requireUser(event)
  return useFavoritesRepository().list(username)
})
