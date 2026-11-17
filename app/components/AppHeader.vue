<script setup lang="ts">
defineProps<{
  username: string | null
}>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <header class="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 bg-linear-to-b from-black via-zinc-950 to-transparent sticky top-0 z-50 backdrop-blur-sm">
    <NuxtLink to="/" class="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 hover:text-red-500 transition-colors shrink-0">
      MovieApp
    </NuxtLink>

    <nav class="flex gap-2 sm:gap-4 items-center">
      <template v-if="username">
        <NuxtLink
          to="/favorites"
          class="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-300 hover:text-red-500 transition-colors px-2 py-1"
        >
          <span class="text-red-500">★</span>
          <span class="hidden sm:inline">Favorite</span>
        </NuxtLink>

        <div class="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm text-gray-200">
          <svg class="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span class="font-medium max-w-[60px] sm:max-w-[150px] truncate">{{ username }}</span>
        </div>

        <button
          type="button"
          class="text-xs sm:text-sm bg-zinc-800 border border-zinc-700 hover:bg-red-600 hover:border-red-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg font-semibold active:scale-95 transition-all text-white cursor-pointer"
          @click="emit('logout')"
        >
          <span class="hidden sm:inline">Deconectare</span>
          <span class="sm:hidden">Ieșire</span>
        </button>
      </template>

      <NuxtLink
        v-else
        to="/login"
        class="text-xs sm:text-sm bg-red-600 px-3.5 sm:px-5 py-1.5 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all text-white"
      >
        Autentificare
      </NuxtLink>
    </nav>
  </header>
</template>
