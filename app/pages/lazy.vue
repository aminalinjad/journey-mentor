<template>
  <div class="flex flex-col md:flex-row items-center justify-between p-5">

    <div class="relative md:w-1/4 w-full">
      <Icon class="absolute top-5 left-4" name="uil:search" style="color: gray"/>
      <input
          type="text"
          v-model="search"
          class="shadow-sm px-12 w-full rounded h-14 focus:outline-none dark:bg-gray-800 bg-gray-100 placeholder:text-sm"
          placeholder="Search for a country"
      />
    </div>

    <div class="md:w-1/4 w-full md:my-0 my-10">
      <label class="block mb-2 font-medium text-xs mb-5">Population Range</label>
      <Slider
          v-model="populationRange"
          :min="populationLimits[0]"
          :max="populationLimits[1]"
          step="1000000"
          range
      />
      <p class="text-xs mt-4">From {{ populationRange[0].toLocaleString() }} to {{ populationRange[1].toLocaleString() }}</p>
    </div>

    <Select v-model="region">
      <SelectTrigger class="w-40 dark:bg-gray-800 bg-gray-100 md:w-1/4 w-full ">
        <SelectValue placeholder="Filter by region" />
      </SelectTrigger>

      <SelectContent class="dark:bg-gray-800 bg-gray-100">
        <SelectItem value="africa">Africa</SelectItem>
        <SelectItem value="america">America</SelectItem>
        <SelectItem value="asia">Asia</SelectItem>
        <SelectItem value="europe">Europe</SelectItem>
        <SelectItem value="oceania">Oceania</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="grid grid-cols-12 lg:gap-10 gap-5 mt-10">
    <div
        v-for="(country, index) in visibleCountries"
        :key="index"
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-5"
    >
      <nuxt-link :to="`/${country.name.common}`">
        <card :country="country"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from '#app'
import { useAsyncData, useHead } from 'nuxt/app'
import { debounce } from 'lodash'
import { listCountries } from '@/services/countries.services'
import type { Country } from '../types/countries.type'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

const route = useRoute()
const router = useRouter()

const search = ref((route.query.search as string) || '')
const region = ref((route.query.region as string) || '')
const populationRange = ref<[number, number]>([0, 100_000_000])
const page = ref(Number(route.query.page) || 1)
const perPage = 12

const { data: countries } = await useAsyncData<Country[]>('countries', () =>
    listCountries('name,population,region,capital,flags')
)

const populationLimits = computed(() => {
  const pops = (countries.value ?? []).map(c => c.population)
  return [Math.min(...pops), Math.max(...pops)] as [number, number]
})

const filteredCountries = ref<Country[]>([])
const filterCountries = () => {
  const q = search.value.toLowerCase().trim()
  const r = region.value.toLowerCase().trim()
  const [popMin, popMax] = populationRange.value

  filteredCountries.value = (countries.value ?? []).filter(c => {
    const matchesName = c.name.common.toLowerCase().includes(q)
    const matchesRegion = !r || c.region.toLowerCase() === r
    const matchesPopulation = c.population >= popMin && c.population <= popMax
    return matchesName && matchesRegion && matchesPopulation
  })
}
filterCountries()

const visibleCountries = computed(() => {
  return filteredCountries.value.slice(0, page.value * perPage)
})

const syncURL = () => {
  router.replace({
    query: {
      ...route.query,
      search: search.value || undefined,
      region: region.value || undefined,
      page: page.value
    }
  })
}

const debouncedFilter = debounce(() => {
  page.value = 1
  filterCountries()
  syncURL()
}, 300)

// Watchers
watch([search, region], debouncedFilter)
watch(populationRange, debouncedFilter)

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const fullHeight = document.body.offsetHeight

  if (scrollTop + windowHeight >= fullHeight - 200) {
    if (page.value * perPage < filteredCountries.value.length) {
      page.value++
      syncURL()
    }
  }

  if (scrollTop < 100 && page.value > 1) {
    page.value--
    syncURL()
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

useHead({
  title: computed(() => {
    if (search.value) return `Search results for "${search.value}" - Countries`
    if (region.value) return `${region.value} Countries`
    return 'All Countries'
  }),
  meta: [
    { name: 'description', content: 'Explore countries of the world, population, region, capital and flags.' },
    { name: 'keywords', content: 'countries, population, region, capital, flags, travel, geography' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
})
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
</style>
