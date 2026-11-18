import type { Movie } from '#shared/types/movie'

export default defineEventHandler(async (event): Promise<Movie[]> => {
  const { id: userId } = await requireUser(event)
  const repository = await useFavoritesRepository(event)
  return repository.list(userId)
})
