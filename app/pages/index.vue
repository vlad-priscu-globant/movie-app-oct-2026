<script setup lang="ts">
import type { Movie } from '#shared/types/movie'

useSeoMeta({
  title: 'Filme populare | MovieApp',
  description: 'Descoperă cele mai populare filme ale momentului.',
})

const { isAuthenticated } = useAuth()
const { isFavorite, toggleFavorite } = useFavorites()

const { data: movies, status, error, refresh } = await useFetch<Movie[]>('/api/movies/popular', {
  key: 'movies:popular',
  default: () => [],
})

const searchQuery = ref('')

const filteredMovies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return query ? movies.value.filter((movie) => movie.title.toLowerCase().includes(query)) : movies.value
})

async function handleSelectMovie(movie: Movie): Promise<void> {
  await navigateTo(`/movie/${movie.id}`)
}

async function handleToggleFavorite(movie: Movie): Promise<void> {
  if (!isAuthenticated.value) {
    await navigateTo({ path: '/login', query: { redirect: '/' } })
    return
  }
  await toggleFavorite(movie)
}
</script>

<template>
  <div>
    <div class="mb-8">
      <SearchBar v-model="searchQuery" placeholder="Filtrează filme după titlu..." />
    </div>

    <LoadingSpinner v-if="status === 'pending'" message="Se încarcă filmele..." />

    <ErrorPanel v-else-if="error" message="Nu s-au putut încărca filmele populare." @retry="refresh()" />

    <p v-else-if="filteredMovies.length === 0" class="text-center text-gray-400 py-20">
      Niciun film nu corespunde căutării.
    </p>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        :is-favorite="isFavorite(movie.id)"
        @select-movie="handleSelectMovie"
        @toggle-favorite="handleToggleFavorite(movie)"
      />
    </div>
  </div>
</template>
