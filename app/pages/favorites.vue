<script setup lang="ts">
import type { Movie } from '#shared/types/movie'

definePageMeta({ middleware: 'auth' })
useSeoMeta({ title: 'Favorite | MovieApp' })

const { favorites, status, errorMessage, refresh, whenReady, toggleFavorite } = useFavorites()
await whenReady()

async function handleSelectMovie(movie: Movie): Promise<void> {
  await navigateTo(`/movie/${movie.id}`)
}
</script>

<template>
  <div class="max-w-6xl mx-auto py-6 px-4">
    <h1 class="text-3xl font-bold text-white mb-6 flex items-center gap-2">
      <span class="text-red-600">★</span>
      <span>Filmele Mele Favorite</span>
    </h1>

    <LoadingSpinner v-if="status === 'pending'" message="Se încarcă filmele favorite..." />

    <ErrorPanel v-else-if="errorMessage" :message="errorMessage" @retry="refresh()" />

    <div v-else-if="favorites.length === 0" class="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center">
      <div class="text-5xl mb-4">🎬</div>
      <p class="text-xl font-semibold text-white mb-2">Nu ai adăugat încă niciun film la favorite</p>
      <p class="text-gray-400 mb-6">Explorează filmele disponibile și adaugă-le pe cele preferate.</p>
      <NuxtLink to="/" class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
        Explorează Filme
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
        is-favorite
        @select-movie="handleSelectMovie"
        @toggle-favorite="toggleFavorite(movie)"
      />
    </div>
  </div>
</template>
