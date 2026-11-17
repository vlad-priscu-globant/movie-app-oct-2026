<script setup lang="ts">
const { username, logout } = useAuth()

async function handleLogout(): Promise<void> {
  await logout()
  await navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
    <AppHeader :username="username" @logout="handleLogout" />

    <main class="grow p-6">
      <slot />
    </main>

    <footer class="text-center text-gray-500 text-xs p-6 border-t border-zinc-900 bg-zinc-950/30">
      &copy; 2026 MovieApp. Toate drepturile rezervate.
    </footer>
  </div>
</template>
