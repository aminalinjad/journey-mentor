<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useCookie } from '#app'
import {useHead} from "nuxt/app";


const darkCookie = useCookie('dark')


const isDark = darkCookie.value


  useHead({
    htmlAttrs: {
      class: isDark ? 'dark' : ''
    }
  })



</script>
