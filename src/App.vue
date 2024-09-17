<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="max-h-screen flex items-center px-4 md:px-[calc(var(--section-gap) / 2)]">
    <div class="flex items-center justify-center w-1/4 md:w-auto mr-4">
        <img src="./components/icons/logoClima.png" alt="Logo" class="h-20 w-20 md:h-20 md:w-20">
      </div>
    <h1 class="text-3xl font-bold text-white mb-4 mr-4">Sky Forecast</h1>
    <div class="flex flex-col items-center w-full max-w-screen-xl mx-auto">
      <div class="wrapper flex flex-wrap items-start">
        <nav
          class="w-full text-center text-xs mt-8 md:text-base md:text-left md:mt-4 md:py-4 md:ml-[-1rem]  text-cyan-300">
          <RouterLink to="/"
            class="inline-block px-4 border-l border-gray-200 first:border-0 hover:bg-transparent text-current "
            active-class="bg-cyan-950 text-white" exact-active-class="bg-cyan-950 text-white">
            Search Location
          </RouterLink>
          <RouterLink to="/about"
            class="inline-block px-4 border-l border-gray-200 first:border-0 hover:bg-transparent text-current "
            active-class="bg-cyan-950 text-white" exact-active-class="bg-cyan-950 text-white">
            My Location
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>

