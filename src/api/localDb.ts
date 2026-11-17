import { httpWrapper } from './httpWrapper'
import type { Movie, MovieDetail } from '../types'
import { useAuth } from '../composables/useAuth'

const BASE_URL = 'http://localhost:3000'

interface TmdbRawMovie {
  id: number
  title: string
  release_date?: string
  poster_path?: string
  backdrop_path?: string
  overview?: string
  vote_average?: number
  runtime?: number
  genres?: Array<{ id: number; name: string }>
}

export async function loginUser(username: string, password?: string): Promise<string> {
  const data = await httpWrapper<{ token: string }>(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  if (data.token) {
    const { setToken } = useAuth()
    setToken(data.token)
  }
  return data.token
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const data = await httpWrapper<{ results?: TmdbRawMovie[] }>(`${BASE_URL}/api/movies/popular`)
  if (!data.results) return []
  return data.results.map((m: TmdbRawMovie) => ({
    id: m.id,
    title: m.title,
    year: m.release_date ? parseInt(m.release_date.split('-')[0], 10) : 2025,
    image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''
  }))
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetail> {
  const data = await httpWrapper<TmdbRawMovie>(`${BASE_URL}/api/movies/${movieId}`)
  return {
    id: data.id,
    title: data.title,
    year: data.release_date ? parseInt(data.release_date.split('-')[0], 10) : 2025,
    image: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
    backdropImage: data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : '',
    overview: data.overview || '',
    voteAverage: data.vote_average || 0,
    runtime: data.runtime || 0,
    genres: data.genres ? data.genres.map(g => g.name) : []
  }
}

export async function fetchFavorites(): Promise<Movie[]> {
  return await httpWrapper<Movie[]>(`${BASE_URL}/favorites`)
}

export async function checkIsFavorite(movieId: number): Promise<boolean> {
  const data = await httpWrapper<{ isFavorite: boolean }>(`${BASE_URL}/favorites/${movieId}`)
  return data.isFavorite
}

export async function addFavorite(movie: Movie): Promise<void> {
  await httpWrapper(`${BASE_URL}/favorites`, {
    method: 'POST',
    body: JSON.stringify(movie)
  })
}

export async function removeFavorite(movieId: number): Promise<void> {
  await httpWrapper(`${BASE_URL}/favorites/${movieId}`, {
    method: 'DELETE'
  })
}
