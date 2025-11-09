<template>
  <header class="h-20 shadow-md flex items-center dark:bg-gray-800 bg-gray-100 transition-colors">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- عنوان -->
      <h1 class="text-xl font-bold text-gray-900 dark:text-white transition-colors">
        Where in the world?
      </h1>

      <button
          @click="toggleDark"
          class="flex items-center gap-2 px-4 py-2 rounded bg-transparent transition-colors"
      >
        <span>{{ isDark ? 'Light' : 'Dark' }}</span>

        <Icon class="text-purple" v-if="isDark" name="uil:sun" />
        <Icon class="text-purple" v-else name="uil:moon" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

const darkCookie = useCookie('dark')
const isDark = ref(darkCookie.value)


const toggleDark = () => {
  let newTheme = darkCookie.value === true ? false: true
  darkCookie.value = newTheme
  document.documentElement.classList.toggle('dark', darkCookie.value)
  isDark.value = darkCookie.value
}
</script>

<style scoped>
header {
  transition: background-color 0.3s;
}
button {
  transition: background-color 0.3s, color 0.3s;
}
</style>