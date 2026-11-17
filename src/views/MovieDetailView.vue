<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MovieDetail } from '../types'
import { fetchMovieDetail, checkIsFavorite, addFavorite, removeFavorite } from '../api/localDb'

const route = useRoute()
const router = useRouter()

const movieId = Number(route.params.id)
const movie = ref<MovieDetail | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')
const isFavorite = ref(false)
const favActionError = ref('')
const isTogglingFav = ref(false)

const loadMovieAndFavoriteStatus = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const detail = await fetchMovieDetail(movieId)
    movie.value = detail
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Eroare la încărcarea detaliilor filmului'
    errorMessage.value = msg
  } finally {
    isLoading.value = false
  }

  try {
    isFavorite.value = await checkIsFavorite(movieId)
  } catch {
    isFavorite.value = false
  }
}

const handleToggleFavorite = async () => {
  if (!movie.value) return
  isTogglingFav.value = true
  favActionError.value = ''

  try {
    if (isFavorite.value) {
      await removeFavorite(movie.value.id)
      isFavorite.value = false
    } else {
      await addFavorite({
        id: movie.value.id,
        title: movie.value.title,
        year: movie.value.year,
        image: movie.value.image
      })
      isFavorite.value = true
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Autentificarea este necesară'
    favActionError.value = msg
    if (msg.toLowerCase().includes('token required') || msg.toLowerCase().includes('invalid token')) {
      router.push('/login')
    }
  } finally {
    isTogglingFav.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  loadMovieAndFavoriteStatus()
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-6 px-4">
    <!-- Buton Înapoi -->
    <button 
      @click="goBack"
      type="button"
      class="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
    >
      <span class="text-xl">←</span>
      <span class="font-medium text-sm">Înapoi la lista de filme</span>
    </button>

    <!-- State de încărcare -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-gray-400">
      <div class="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p>Se încarcă detaliile filmului...</p>
    </div>

    <!-- State de eroare -->
    <div v-else-if="errorMessage" class="bg-red-950/50 border border-red-800 p-6 rounded-xl text-center text-red-400">
      <p class="text-lg font-semibold mb-2">Eroare</p>
      <p>{{ errorMessage }}</p>
      <button @click="loadMovieAndFavoriteStatus" class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
        Reîncearcă
      </button>
    </div>

    <!-- Prezentare detalii film -->
    <div v-else-if="movie" class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <!-- Banner Backdrop -->
      <div v-if="movie.backdropImage" class="relative h-64 md:h-80 w-full overflow-hidden bg-gray-950">
        <img :src="movie.backdropImage" :alt="movie.title" class="w-full h-full object-cover opacity-60" />
        <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      <div class="p-6 md:p-8 flex flex-col md:flex-row gap-8 relative -mt-16 md:-mt-24">
        <!-- Poster Poster Image -->
        <div class="w-48 md:w-56 shrink-0 mx-auto md:mx-0">
          <img 
            :src="movie.image" 
            :alt="movie.title" 
            class="w-full rounded-xl shadow-2xl border-2 border-gray-800 object-cover aspect-[2/3]"
          />
        </div>

        <!-- Informații Film -->
        <div class="flex-grow flex flex-col justify-between pt-4 md:pt-16">
          <div>
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-white">{{ movie.title }}</h1>
              <span class="text-gray-400 text-lg">({{ movie.year }})</span>
            </div>

            <!-- Metadata Badges -->
            <div class="flex flex-wrap items-center gap-3 my-4 text-xs text-gray-300">
              <span v-if="movie.voteAverage" class="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                ★ {{ movie.voteAverage.toFixed(1) }}
              </span>
              <span v-if="movie.runtime" class="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full">
                ⏱ {{ movie.runtime }} min
              </span>
              <span v-for="genre in movie.genres" :key="genre" class="bg-red-950/60 text-red-400 border border-red-900/50 px-3 py-1 rounded-full font-medium">
                {{ genre }}
              </span>
            </div>

            <!-- Sinopsis / Overview -->
            <p v-if="movie.overview" class="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              {{ movie.overview }}
            </p>
          </div>

          <!-- Acțiune Favorite -->
          <div class="mt-8 pt-6 border-t border-gray-800 flex flex-col gap-3">
            <p v-if="favActionError" class="text-xs text-red-400 font-medium">
              {{ favActionError }}
            </p>

            <button 
              @click="handleToggleFavorite"
              :disabled="isTogglingFav"
              type="button"
              class="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
              :class="isFavorite ? 'bg-zinc-800 hover:bg-zinc-700 text-red-400 border border-red-500/30' : 'bg-red-600 hover:bg-red-700 text-white'"
            >
              <span class="text-lg">{{ isFavorite ? '★' : '☆' }}</span>
              <span>{{ isFavorite ? 'Șterge din Favorite' : 'Adaugă la Favorite' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
