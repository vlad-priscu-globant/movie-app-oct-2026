<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { isAuthenticated, username, logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
    <!-- Header Semantic -->
    <header class="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 bg-linear-to-b from-black via-zinc-950 to-transparent sticky top-0 z-50 backdrop-blur-sm">
      <RouterLink to="/" class="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 hover:text-red-500 transition-colors shrink-0">
        MovieApp
      </RouterLink>
      <nav class="flex gap-2 sm:gap-4 items-center">
        <!-- User Authenticated Nav Options -->
        <template v-if="isAuthenticated">
          <RouterLink 
            to="/favorites"
            class="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-300 hover:text-red-500 transition-colors px-2 py-1"
          >
            <span class="text-red-500">★</span>
            <span class="hidden sm:inline">Favorite</span>
          </RouterLink>

          <!-- User Info Badge -->
          <div class="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm text-gray-200">
            <svg class="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span class="font-medium max-w-[60px] xs:max-w-[100px] sm:max-w-[150px] truncate">{{ username || 'Utilizator' }}</span>
          </div>

          <!-- Logout CTA -->
          <button 
            @click="handleLogout"
            type="button"
            class="text-xs sm:text-sm bg-zinc-800 border border-zinc-700 hover:bg-red-600 hover:border-red-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg font-semibold active:scale-95 transition-all text-white cursor-pointer"
          >
            <span class="hidden sm:inline">Deconectare</span>
            <span class="sm:hidden">Ieșire</span>
          </button>
        </template>

        <!-- Unauthenticated Auth Button -->
        <template v-else>
          <RouterLink 
            to="/login" 
            class="text-xs sm:text-sm bg-red-600 px-3.5 sm:px-5 py-1.5 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all text-white"
          >
            Autentificare
          </RouterLink>
        </template>
      </nav>
    </header>
    
    <!-- Zona Principală de Conținut (Rutele se încarcă aici) -->
    <main class="flex-grow p-6">
      <RouterView />
    </main>

    <!-- Footer Semantic -->
    <footer class="text-center text-gray-500 text-xs p-6 border-t border-zinc-900 bg-zinc-950/30">
      &copy; 2026 MovieApp. Toate drepturile rezervate.
    </footer>
  </div>
</template>