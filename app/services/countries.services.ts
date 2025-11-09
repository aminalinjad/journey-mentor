import type { Country ,CountryWithName} from '@/types/countries.type'

export async function listCountries(query: string): Promise<Country[]> {
    const response = await $fetch<Country[]>(`https://restcountries.com/v3.1/all`, {
        query: {
            fields: query
        }
    })
    return response
}

export async function getCountryWithName(name: string): Promise<CountryWithName> {
    const response = await $fetch<CountryWithName[]>(`https://restcountries.com/v3.1/name/${name}`)
    return response[0]
}