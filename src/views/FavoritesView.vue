<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Movie } from '../types'
import { fetchFavorites } from '../api/localDb'
import { useAuth } from '../composables/useAuth'
import MovieCard from '../components/MovieCard.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

const favorites = ref<Movie[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const loadFavorites = async () => {
  if (!isAuthenticated.value) {
    isLoading.value = false
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    favorites.value = await fetchFavorites()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Eroare la încărcarea listei de favorite'
    errorMessage.value = msg
  } finally {
    isLoading.value = false
  }
}

const handleSelectMovie = (movie: Movie) => {
  router.push(`/movie/${movie.id}`)
}

const goToLogin = () => {
  router.push('/login')
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  loadFavorites()
})
</script>

<template>
  <div class="max-w-6xl mx-auto py-6 px-4">
    <h1 class="text-3xl font-bold text-white mb-6 flex items-center gap-2">
      <span class="text-red-600">★</span>
      <span>Filmele Mele Favorite</span>
    </h1>

    <!-- Neautentificat -->
    <div v-if="!isAuthenticated" class="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
      <p class="text-xl font-semibold text-white mb-2">Acces restricționat</p>
      <p class="text-gray-400 mb-6">Trebuie să fii autentificat pentru a vedea lista ta de filme favorite.</p>
      <button 
        @click="goToLogin"
        type="button"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
      >
        Autentificare
      </button>
    </div>

    <!-- Încărcare -->
    <div v-else-if="isLoading" class="flex flex-col items-center justify-center py-20 text-gray-400">
      <div class="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p>Se încarcă filmele favorite...</p>
    </div>

    <!-- Eroare -->
    <div v-else-if="errorMessage" class="bg-red-950/50 border border-red-800 p-6 rounded-xl text-center text-red-400">
      <p class="text-lg font-semibold mb-2">Eroare</p>
      <p>{{ errorMessage }}</p>
      <button @click="loadFavorites" class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
        Reîncearcă
      </button>
    </div>

    <!-- Lista Goadă -->
    <div v-else-if="favorites.length === 0" class="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center">
      <div class="text-5xl mb-4">🎬</div>
      <p class="text-xl font-semibold text-white mb-2">Nu ai adăugat încă niciun film la favorite</p>
      <p class="text-gray-400 mb-6">Explorează filmele disponibile și adaugă-le pe cele preferate.</p>
      <button 
        @click="goToHome"
        type="button"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
      >
        Explorează Filme
      </button>
    </div>

    <!-- Lista de Filme Favorite -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
      <MovieCard 
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
        @select-movie="handleSelectMovie"
      />
    </div>
  </div>
</template>
