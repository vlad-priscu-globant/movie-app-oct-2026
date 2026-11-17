import { movieIdParamsSchema } from '#shared/types/movie'
import type { MovieDetail } from '#shared/types/movie'

export default defineCachedEventHandler(
  async (event): Promise<MovieDetail> => {
    const { id } = await getValidatedRouterParams(event, (params) => movieIdParamsSchema.parse(params))
    return getMovieDetail(event, id)
  },
  {
    name: 'tmdb-movie-detail',
    maxAge: 60 * 60,
    getKey: (event) => String(getRouterParam(event, 'id')),
  },
)
