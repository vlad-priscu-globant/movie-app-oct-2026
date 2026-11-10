<script setup lang="ts">
const props = defineProps<{
  title: string
  year?: number
  image?: string
}>()
</script>

<template>
  <article class="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_12px_24px_rgba(220,38,38,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
    <div class="relative aspect-3/4 overflow-hidden bg-zinc-950">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
    </div>
    <div class="p-4 flex-grow flex flex-col justify-between bg-zinc-900/40">
      <div>
        <h3 class="font-bold text-white group-hover:text-red-500 transition-colors text-sm line-clamp-1">
          {{ title }}
        </h3>
        <span v-if="year" class="text-xs text-gray-500 font-medium block mt-1">{{ year }}</span>
      </div>
    </div>
    <slot name="default"></slot>
    <slot name="extraInfo"></slot>
  </article>
</template>