<template>
  <div class="p-8" v-if="country">
    <button class="dark:bg-gray-800 bg-gray-100 shadow-lg cursor-pointer rounded-lg w-[150px] py-2" @click="router.go(-1)">Back</button>

    <div class="grid grid-cols-12 mt-10 md:gap-10">
      <div class="md:col-span-6 col-span-12">
        <NuxtImg class="object-cover rounded w-full" loading="lazy" format="webp" :src="country.flags.svg" :alt="country.flags.alt" />
      </div>



      <div class="md:col-span-6 col-span-12 md:mt-0 mt-8">
        <h1 class="font-bold text-4xl mb-10">{{ country.name.common }}</h1>

        <div class="flex gap-10">
          <div class="space-y-4">
            <Row label="Native Name" :value="Object.values(country.name.nativeName).pop()?.common"/>
            <Row label="Population" :value="country.population.toLocaleString()"/>
            <Row label="Region" :value="country.region"/>
            <Row label="Sub Region" :value="country.subregion"/>
            <Row label="Capital" :value="country.capital.join(', ')"/>
          </div>

          <div class="space-y-4">
            <Row label="Top Level Domain" :value="country.tld.join(', ')"/>
            <Row label="Currencies" :value="Object.values(country.currencies).map(c=>c.name).join(', ')"/>
            <Row label="Languages" :value="Object.values(country.languages).join(', ')"/>
          </div>
        </div>

        <div class="flex items-center mt-[100px] gap-2">
          <p class="font-medium">Border Countries:</p>
          <div class="flex gap-3 flex-wrap">
            <button v-for="b in country.borders" :key="b" class="dark:bg-gray-800 bg-gray-100 w-[100px] rounded py-1">{{ b }}</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {useAsyncData, useHead, useRoute, useRouter} from "nuxt/app"
import {getCountryWithName} from "@/services/countries.services"
import type {CountryWithName} from "@/types/countries.type"
import {computed} from "vue";

const route = useRoute()
const router = useRouter()

const { data } = await useAsyncData<CountryWithName[]>("country", () =>
    getCountryWithName(route.params.name as string)
)

const country = computed(() => data.value)

const countryName = country.value?.name.common ?? 'Country'


useHead({
  title: `${countryName} - Country Details`,
  meta: [
    { name: 'description', content: `Details about ${countryName}: population, region, capital, and flag.` },
    { property: 'og:title', content: `${countryName} - Country Details` },
    { property: 'og:description', content: `Explore details of ${countryName}: population, region, capital, and flag.` },
    { property: 'og:image', content: country.value?.flags.png }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Country",
        "name": countryName,
        "image": country.value?.flags.png,
        "description": `Population: ${country.value?.population}, Region: ${country.value?.region}, Capital: ${country.value?.capital?.[0]}`,
        "url": `https://example.com/${countryName}`
      })
    }
  ]
})
</script>

<style scoped>

</style>