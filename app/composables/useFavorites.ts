import type { ComputedRef, Ref } from 'vue'
import type { AsyncDataRequestStatus } from '#app'
import type { Movie } from '#shared/types/movie'

export const FAVORITES_KEY = 'favorites'

interface UseFavorites {
  favorites: Ref<Movie[]>
  status: Ref<AsyncDataRequestStatus>
  errorMessage: ComputedRef<string | null>
  refresh: () => Promise<void>
  whenReady: () => Promise<void>
  isFavorite: (movieId: number) => boolean
  toggleFavorite: (movie: Movie) => Promise<void>
}

/**
 * Favourites state shared under one `useFetch` key. `favoriteIds` is derived
 * (computed) instead of a mutated `Set`, which avoids the reactivity gotcha
 * documented in `.agents/memory/gotchas.md`.
 */
export function useFavorites(): UseFavorites {
  const { isAuthenticated } = useAuth()

  const asyncData = useFetch<Movie[]>('/api/favorites', {
    key: FAVORITES_KEY,
    default: () => [],
    immediate: isAuthenticated.value,
  })
  const { data, status, error, refresh } = asyncData
  const whenReady = async (): Promise<void> => {
    await asyncData
  }

  const favoriteIds = computed(() => new Set(data.value.map((movie) => movie.id)))
  const errorMessage = computed(() => (error.value ? 'Eroare la încărcarea listei de favorite' : null))

  const isFavorite = (movieId: number): boolean => favoriteIds.value.has(movieId)

  async function toggleFavorite(movie: Movie): Promise<void> {
    if (isFavorite(movie.id)) {
      await $fetch(`/api/favorites/${movie.id}`, { method: 'DELETE' })
      data.value = data.value.filter((favorite) => favorite.id !== movie.id)
      return
    }

    const { id, title, year, image } = movie
    await $fetch('/api/favorites', { method: 'POST', body: { id, title, year, image } })
    data.value = [...data.value, { id, title, year, image }]
  }

  return { favorites: data, status, errorMessage, refresh, whenReady, isFavorite, toggleFavorite }
}
