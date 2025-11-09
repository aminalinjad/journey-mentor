<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{ label:string, value:string | number | undefined }>()
</script>

<template>
  <div class="flex items-center">
    <p class="font-medium">{{label}}:</p>
    <p class="text-gray-600 dark:text-gray-200 ms-1 truncate">{{value}}</p>
  </div>
</template>
