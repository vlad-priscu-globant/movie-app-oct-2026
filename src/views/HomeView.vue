<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Movie } from '../types'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'
import { fetchPopularMovies } from '../api/localDb'

const router = useRouter()

// Starea listei de filme (cu fallback-uri inițiale)
const movies = ref<Movie[]>([
  { id: 1, title: 'Inception', year: 2010, image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 2, title: 'Interstellar', year: 2014, image: 'https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeMacBjQcs45u.jpg' },
  { id: 3, title: 'Dunkirk', year: 2017, image: 'https://image.tmdb.org/t/p/w500/ebSnODcju8UT016dzcqhU3N8ZcZ.jpg' }
])

// Starea input-ului de căutare
const searchQuery = ref('')

// Încărcare date publice din Backend (Server Express & TMDB proxy)
const loadData = async () => {
  try {
    const popular = await fetchPopularMovies()
    if (popular.length > 0) {
      movies.value = popular
    }
  } catch (e) {
    console.warn('Nu s-au putut prelua filmele din TMDB proxy, se folosesc cele locale:', e)
  }
}

onMounted(() => {
  loadData()
})

// Stare derivată: returnează doar filmele care conțin textul din searchQuery
const filteredMovies = computed(() => {
  return movies.value.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Navigation către pagina de detalii a filmului
const handleSelectMovie = (movie: Movie) => {
  router.push(`/movie/${movie.id}`)
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
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
      <MovieCard 
        v-for="movie in filteredMovies" 
        :key="movie.id" 
        :movie="movie"
        @select-movie="handleSelectMovie"
      />
    </div>
  </div>
</template>