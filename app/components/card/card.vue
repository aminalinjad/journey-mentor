<template>
  <div class="shadow-sm rounded-md dark:bg-gray-800 bg-gray-100">
    <NuxtImg width="200" height="200" class="aspect-[4/3] w-full object-fill rounded" loading="lazy" format="webp"  :src="country.flags.png" :alt="country.flags.alt" />

    <div class="p-6 flex flex-col gap-y-4">
      <h3 class="text-xl font-medium truncate ">{{ country.name.common }}</h3>

      <Row label="Population" :value="country.population?.toLocaleString()"/>
      <Row label="Region" :value="country.region"/>
      <Row label="Capital" :value="country.capital[0]"/>
    </div>
  </div>



</template>

<script setup lang="ts">
import type { Country } from '@/src/types/countries.type'
import {defineProps} from "vue";
import Row from "../Row.vue";

defineProps<{
  country: Country
}>()
</script>

<style scoped>

</style>