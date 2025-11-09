# Journey Mentor

**Live Demo:** [https://journey-mentor-ipwz.vercel.app/](https://journey-mentor-ipwz.vercel.app/)

Journey Mentor is a Nuxt 3 web application that allows users to explore countries around the world, including details such as population, region, capital, flags, and more. The app features search, filtering, and population range selection for enhanced usability.

## Features

- **Search Countries:** Search by country name in real-time.
- **Filter by Region:** Filter countries by region using a dropdown.
- **Population Slider:** Select a population range to dynamically filter countries.
- **Pagination & Infinite Scroll:**
    - Standard pages show 12 countries per page with “Load More” functionality.
    - `/lazy` page implements a virtualized scroll where data is **appended when scrolling down** and **removed from the DOM when scrolling up** for better performance on large datasets.
- **SEO Optimized:** Each page has dynamic titles and meta descriptions based on search and filters.
- **Dark Mode Support:** Toggle between light and dark themes.

## `/lazy` Page Details

The `/lazy` page demonstrates an efficient virtualized list:

- Only a subset of countries (12 at a time) is rendered in the DOM.
- When the user scrolls to the bottom, the next batch of countries is loaded and appended.
- When scrolling up, previously rendered countries are removed from the DOM to improve performance.
- Router query updates accordingly (`?page=2`, etc.) to maintain state across refreshes.

## Technologies

- **Nuxt 3**
- **Vue 3**
- **Tailwind CSS (v4)**
- **Vite**
- **Lodash** (debounce)

## Live Preview

Visit the live site: [https://journey-mentor-ipwz.vercel.app/](https://journey-mentor-ipwz.vercel.app/)
