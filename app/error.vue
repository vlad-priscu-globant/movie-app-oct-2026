<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: () => (isNotFound.value ? 'Pagina nu există | MovieApp' : 'Eroare | MovieApp') })

function handleBackHome(): Promise<void> {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div class="max-w-xl mx-auto py-20 text-center">
      <p class="text-7xl font-bold text-red-600 mb-4">{{ error.statusCode }}</p>
      <h1 class="text-2xl font-semibold text-white mb-2">
        {{ isNotFound ? 'Pagina căutată nu există' : 'A apărut o eroare neașteptată' }}
      </h1>
      <p class="text-gray-400 mb-8">
        {{ isNotFound ? 'Verifică adresa sau întoarce-te la lista de filme.' : 'Te rugăm să încerci din nou mai târziu.' }}
      </p>
      <button
        type="button"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
        @click="handleBackHome"
      >
        Înapoi la filme
      </button>
    </div>
  </NuxtLayout>
</template>
