import { z } from 'zod'
import type { H3Event } from 'h3'
import type { Movie, MovieDetail } from '#shared/types/movie'

/**
 * TMDB integration boundary. This is the only module that knows TMDB's URLs,
 * auth scheme and response shape. Handlers only ever see app DTOs.
 */

const tmdbMovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  release_date: z.string().nullish(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish(),
  overview: z.string().nullish(),
  vote_average: z.number().nullish(),
  runtime: z.number().nullish(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).nullish(),
})

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>

const tmdbMoviePageSchema = z.object({
  results: z.array(tmdbMovieSchema),
})

type TmdbQuery = Record<string, string | number>

/** v4 "Read Access Tokens" are JWTs. Anything else is treated as a v3 api_key. */
function isBearerToken(token: string): boolean {
  return token.startsWith('eyJ')
}

async function tmdbGet<T>(event: H3Event, path: string, schema: z.ZodType<T>, query: TmdbQuery = {}): Promise<T> {
  const { tmdb } = useRuntimeConfig(event)

  if (!tmdb.apiToken) {
    console.error('[tmdb] NUXT_TMDB_API_TOKEN is not configured')
    throw createError({ statusCode: 500, statusMessage: 'Movie service is not configured' })
  }

  const useBearer = isBearerToken(tmdb.apiToken)
  const url = new URL(`${tmdb.baseUrl.replace(/\/$/, '')}${path}`)
  url.searchParams.set('language', 'en-US')
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, String(value))
  }
  if (!useBearer) {
    url.searchParams.set('api_key', tmdb.apiToken)
  }

  let response: Response
  try {
    response = await fetch(url, {
      headers: useBearer ? { Authorization: `Bearer ${tmdb.apiToken}` } : {},
    })
  } catch (error) {
    console.error(`[tmdb] network error on ${path}:`, error)
    throw createError({ statusCode: 502, statusMessage: 'Movie service unavailable' })
  }

  if (response.status === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Movie not found' })
  }
  if (!response.ok) {
    console.error(`[tmdb] ${path} responded with ${response.status}`)
    throw createError({ statusCode: 502, statusMessage: 'Movie service unavailable' })
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch (error) {
    console.error(`[tmdb] invalid JSON on ${path}:`, error)
    throw createError({ statusCode: 502, statusMessage: 'Movie service returned invalid data' })
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    console.error(`[tmdb] unexpected payload on ${path}:`, z.prettifyError(parsed.error))
    throw createError({ statusCode: 502, statusMessage: 'Movie service returned invalid data' })
  }

  return parsed.data
}

export async function getPopularMovies(event: H3Event, page: number): Promise<Movie[]> {
  const data = await tmdbGet(event, '/movie/popular', tmdbMoviePageSchema, { page })
  return data.results.map(toMovie)
}

export async function getMovieDetail(event: H3Event, id: number): Promise<MovieDetail> {
  const data = await tmdbGet(event, `/movie/${id}`, tmdbMovieSchema)
  return toMovieDetail(data)
}
