<script setup lang="ts">
import type { MovieDetail } from '#shared/types/movie'

definePageMeta({
  validate: (route) => typeof route.params.id === 'string' && /^\d+$/.test(route.params.id),
})

const route = useRoute('movie-id')
const movieId = computed(() => Number(route.params.id))

const { isAuthenticated } = useAuth()
const { isFavorite, toggleFavorite } = useFavorites()

const { data: movie, status, error, refresh } = await useFetch<MovieDetail>(() => `/api/movies/${movieId.value}`, {
  key: `movie:${movieId.value}`,
})

if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Filmul nu a fost găsit', fatal: true })
}

useSeoMeta({
  title: () => (movie.value ? `${movie.value.title} | MovieApp` : 'MovieApp'),
  description: () => movie.value?.overview,
  ogTitle: () => movie.value?.title,
  ogDescription: () => movie.value?.overview,
  ogImage: () => movie.value?.image || undefined,
})

const isTogglingFavorite = ref(false)
const favoriteActionError = ref('')
const isCurrentFavorite = computed(() => isFavorite(movieId.value))

async function handleToggleFavorite(): Promise<void> {
  if (!movie.value) return
  if (!isAuthenticated.value) {
    await navigateTo({ path: '/login', query: { redirect: route.fullPath } })
    return
  }

  isTogglingFavorite.value = true
  favoriteActionError.value = ''
  try {
    await toggleFavorite(movie.value)
  } catch {
    favoriteActionError.value = 'Nu am putut actualiza lista de favorite. Încearcă din nou.'
  } finally {
    isTogglingFavorite.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-6 px-4">
    <NuxtLink to="/" class="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
      <span class="text-xl">←</span>
      <span class="font-medium text-sm">Înapoi la lista de filme</span>
    </NuxtLink>

    <LoadingSpinner v-if="status === 'pending'" message="Se încarcă detaliile filmului..." />

    <ErrorPanel v-else-if="error || !movie" message="Eroare la încărcarea detaliilor filmului." @retry="refresh()" />

    <div v-else class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <div v-if="movie.backdropImage" class="relative h-64 md:h-80 w-full overflow-hidden bg-gray-950">
        <NuxtImg
          :src="movie.backdropImage"
          :alt="movie.title"
          width="1280"
          height="720"
          sizes="100vw md:896px"
          preload
          class="w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      <div class="p-6 md:p-8 flex flex-col md:flex-row gap-8 relative -mt-16 md:-mt-24">
        <div class="w-48 md:w-56 shrink-0 mx-auto md:mx-0">
          <NuxtImg
            :src="movie.image || '/poster-placeholder.svg'"
            :alt="movie.title"
            width="500"
            height="750"
            sizes="192px md:224px"
            class="w-full rounded-xl shadow-2xl border-2 border-gray-800 object-cover aspect-2/3"
          />
        </div>

        <div class="grow flex flex-col justify-between pt-4 md:pt-16">
          <div>
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-white">{{ movie.title }}</h1>
              <span class="text-gray-400 text-lg">({{ movie.year ?? '—' }})</span>
            </div>

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

            <p v-if="movie.overview" class="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              {{ movie.overview }}
            </p>
          </div>

          <div class="mt-8 pt-6 border-t border-gray-800 flex flex-col gap-3">
            <p v-if="favoriteActionError" class="text-xs text-red-400 font-medium">
              {{ favoriteActionError }}
            </p>

            <button
              type="button"
              :disabled="isTogglingFavorite"
              class="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
              :class="isCurrentFavorite ? 'bg-zinc-800 hover:bg-zinc-700 text-red-400 border border-red-500/30' : 'bg-red-600 hover:bg-red-700 text-white'"
              @click="handleToggleFavorite"
            >
              <span class="text-lg">{{ isCurrentFavorite ? '★' : '☆' }}</span>
              <span>{{ isCurrentFavorite ? 'Șterge din Favorite' : 'Adaugă la Favorite' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
