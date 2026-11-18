<script setup lang="ts">
useSeoMeta({ title: 'Confirmare cont | MovieApp' })

const { isAuthenticated } = useAuth()

watch(isAuthenticated, async (authenticated) => {
  if (authenticated) {
    await navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="max-w-md mx-auto mt-16 text-center bg-gray-900 border border-gray-800 rounded-xl p-8">
    <LoadingSpinner message="Se confirmă autentificarea..." />
    <NuxtLink to="/login" class="inline-block mt-6 text-sm text-gray-400 hover:text-white transition-colors">
      Înapoi la autentificare
    </NuxtLink>
  </div>
</template>
