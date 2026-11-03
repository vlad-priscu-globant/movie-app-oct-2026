<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <section id="center">
    <div>
      <h1>Get started, aaa</h1>
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    </div>
    <p>Count is {{ count }}</p>
    <div class="flex w-12 justify-between">
      <button type="button" @click="count++" >
        +
      </button>
      <button type="button" @click="count--" >
        -
      </button>
    </div>
  </section>

</template>