<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>  
  <div class="flex flex-col items-center gap-5 container mx-auto py-8">
    <div class="flex justify-center">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <h1 class="welcome-title">Bienvenido</h1>

  <div class="flex justify-center items-center space-x-4">
    <router-link to="/">HOME</router-link>
    <router-link to="/csv">UPLOAD-CSV</router-link>
  </div>
    <!--<HelloWorld msg="Vite + Vue" />-->
</div>
<router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.welcome-title {
  margin-bottom: 40px; /* Agrega margen superior de 50px */
}
</style>
