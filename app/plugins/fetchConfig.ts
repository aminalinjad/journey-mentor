export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    nuxtApp.$fetch = $fetch.create({

        // baseURL: config.public.API_BASE_URL,
        baseURL: "https://restcountries.com/v3.1",

        onRequest({ options, request }) {
            console.log(request)
                options.headers = {
                    ...options.headers,
            }
        },

        onResponseError({ error }) {
            console.error("API ERR", error)
        }
    })

})
