import { z } from 'zod'
import { movieSchema } from '#shared/types/movie'
import type { Movie } from '#shared/types/movie'
import favoritesSeed from '../data/favorites.seed.json'

/**
 * Persistence abstraction for favourites. Handlers depend on this interface
 * only, so Session 08 can swap the storage implementation for Supabase
 * without touching any route (Dependency Inversion).
 */
export interface FavoritesRepository {
  list(username: string): Promise<Movie[]>
  has(username: string, movieId: number): Promise<boolean>
  /** Returns `false` when the movie is already a favourite. */
  add(username: string, movie: Movie): Promise<boolean>
  /** Returns `false` when the movie was not a favourite. */
  remove(username: string, movieId: number): Promise<boolean>
}

const seedSchema = z.array(movieSchema.extend({ addedBy: z.string() }))

function seedFor(username: string): Movie[] {
  return seedSchema
    .parse(favoritesSeed.favorites)
    .filter((entry) => entry.addedBy === username)
    .map(({ addedBy: _addedBy, ...movie }) => movie)
}

/**
 * Nitro `useStorage('data')` implementation. It is file-backed in local dev
 * (`.data/kv`) and in-memory on serverless hosts. Session 08 replaces it.
 */
function createStorageFavoritesRepository(): FavoritesRepository {
  const storage = useStorage('data')
  const keyFor = (username: string): string => `favorites:${username}`

  const read = async (username: string): Promise<Movie[]> => {
    const stored = await storage.getItem(keyFor(username))
    if (stored === null) return seedFor(username)
    return z.array(movieSchema).parse(stored)
  }

  const write = (username: string, movies: Movie[]): Promise<void> => storage.setItem(keyFor(username), movies)

  return {
    list: read,

    async has(username, movieId) {
      const movies = await read(username)
      return movies.some((movie) => movie.id === movieId)
    },

    async add(username, movie) {
      const movies = await read(username)
      if (movies.some((existing) => existing.id === movie.id)) return false
      await write(username, [...movies, movie])
      return true
    },

    async remove(username, movieId) {
      const movies = await read(username)
      const remaining = movies.filter((movie) => movie.id !== movieId)
      if (remaining.length === movies.length) return false
      await write(username, remaining)
      return true
    },
  }
}

let repository: FavoritesRepository | undefined

/** Single swap point for the favourites persistence implementation. */
export function useFavoritesRepository(): FavoritesRepository {
  repository ??= createStorageFavoritesRepository()
  return repository
}
