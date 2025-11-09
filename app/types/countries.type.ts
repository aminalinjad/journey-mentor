// src/types/countries.type.ts
export interface Country {
    flags: {
        png: string
        svg: string
        alt?: string
    }
    name: {
        common: string
        official: string
        nativeName?: {
            [key: string]: {
                official: string
                common: string
            }
        }
    }
    capital?: string[]       // ممکنه خالی باشه
    region?: string
    population?: number
}


export type CountryWithName = {
    name: {
        common: string
        official: string
        nativeName?: {
            [key: string]: {
                official: string
                common: string
            }
        }
    }
    currencies?: {
        [key: string]: {
            name: string
            symbol: string
        }
    }
    capital?: string[]
    region?: string
    subregion?: string
    languages?: {
        [key: string]: string
    }
    population?: number
    flags?: {
        png?: string
        svg?: string
        alt?: string
    }
    tld?: string[],
    borders?:string[]
}
