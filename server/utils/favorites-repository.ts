import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { movieSchema } from '#shared/types/movie'
import type { Movie } from '#shared/types/movie'
import type { Database } from '#shared/types/database.types'

/**
 * Persistence abstraction for user favourites backed by Supabase PostgreSQL
 * (`public.favorites(user_id, movie_id)`) with Row-Level Security (RLS).
 */
export interface FavoritesRepository {
  list(userId: string): Promise<Movie[]>
  has(userId: string, movieId: number): Promise<boolean>
  /** Returns `false` when the movie is already a favourite. */
  add(userId: string, movie: Movie): Promise<boolean>
  /** Returns `false` when the movie was not a favourite. */
  remove(userId: string, movieId: number): Promise<boolean>
}

/** Creates a request-scoped Supabase repository enforcing the caller's RLS session. */
export async function useFavoritesRepository(event: H3Event): Promise<FavoritesRepository> {
  const client = await serverSupabaseClient<Database>(event)

  return {
    async list(userId) {
      const { data, error } = await client
        .from('favorites')
        .select('movie_id')
        .eq('user_id', userId)

      if (error) {
        console.error('[favorites] Failed to list favorites:', error.message)
        throw createError({ statusCode: 500, statusMessage: 'Failed to load favorites' })
      }

      const settled = await Promise.allSettled(
        (data ?? []).map(async (row) => {
          const detail = await getMovieDetail(event, Number(row.movie_id))
          return movieSchema.parse({
            id: detail.id,
            title: detail.title,
            year: detail.year,
            image: detail.image,
          })
        }),
      )

      return settled
        .filter((result): result is PromiseFulfilledResult<Movie> => result.status === 'fulfilled')
        .map((result) => result.value)
    },

    async has(userId, movieId) {
      const { data, error } = await client
        .from('favorites')
        .select('movie_id')
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .maybeSingle()

      if (error) {
        console.error('[favorites] Failed to check favorite:', error.message)
        throw createError({ statusCode: 500, statusMessage: 'Failed to check favorite' })
      }

      return data !== null
    },

    async add(userId, movie) {
      const { error } = await client.from('favorites').insert({
        user_id: userId,
        movie_id: movie.id,
      })

      if (error) {
        if (error.code === '23505') return false
        console.error('[favorites] Failed to insert favorite:', error.message)
        throw createError({ statusCode: 500, statusMessage: 'Failed to save favorite' })
      }

      return true
    },

    async remove(userId, movieId) {
      const { data, error } = await client
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .select('movie_id')

      if (error) {
        console.error('[favorites] Failed to remove favorite:', error.message)
        throw createError({ statusCode: 500, statusMessage: 'Failed to remove favorite' })
      }

      return (data?.length ?? 0) > 0
    },
  }
}
