import { z } from 'zod'
import type { Movie } from '#shared/types/movie'

const popularQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export default defineCachedEventHandler(
  async (event): Promise<Movie[]> => {
    const { page } = await getValidatedQuery(event, (query) => popularQuerySchema.parse(query))
    return getPopularMovies(event, page)
  },
  {
    name: 'tmdb-popular',
    maxAge: 60 * 10,
    getKey: (event) => String(getQuery(event).page ?? 1),
  },
)
