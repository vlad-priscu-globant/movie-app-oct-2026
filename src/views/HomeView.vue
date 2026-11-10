<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Movie } from '../types'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'

// Starea listei de filme
const movies = ref<Movie[]>([
  { id: 1, title: 'Inception', year: 2010, image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 2, title: 'Interstellar', year: 2014, image: 'https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeMacBjQcs45u.jpg' },
  { id: 3, title: 'Dunkirk', year: 2017, image: 'https://image.tmdb.org/t/p/w500/ebSnODcju8UT016dzcqhU3N8ZcZ.jpg' }
])

// Starea input-ului de căutare
const searchQuery = ref('')

// Stare pentru filme favorite (demonstrație state)
const favoriteIds = ref<Set<number>>(new Set())

// Stare derivată: returnează doar filmele care conțin textul din searchQuery
const filteredMovies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return movies.value
  return movies.value.filter(movie => 
    movie.title.toLowerCase().includes(query)
  )
})

// Handlers pentru emisiile de la MovieCard
const handleSelectMovie = (movie: Movie) => {
  console.log('Filmul selectat:', movie.title)
}

const handleToggleFavorite = (movieId: number) => {
  const updated = new Set(favoriteIds.value)
  if (updated.has(movieId)) {
    updated.delete(movieId)
  } else {
    updated.add(movieId)
  }
  favoriteIds.value = updated
}
</script>

<template>
  <div>
    <!-- Căutare delegată către componenta SearchBar -->
    <div class="mb-8">
      <SearchBar 
        v-model="searchQuery" 
        placeholder="Filtrează filme după titlu..." 
      />
    </div>

    <!-- Lista Filtrată utilizând MovieCard -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MovieCard
        v-for="movie in filteredMovies" 
        :key="movie.id" 
        :movie="movie"
        :is-favorite="favoriteIds.has(movie.id)"
        @select-movie="handleSelectMovie"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>