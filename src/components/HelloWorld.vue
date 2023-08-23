<script setup lang="ts">
import { ref } from 'vue'

//defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <!--<h1>{{ msg }}</h1>-->

  <h1 class="container mx-auto">Hello World!</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Bienvenido a tu aplicación Vue + Vite
      <!--<code>Upload csv</code> to test HMR-->
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
