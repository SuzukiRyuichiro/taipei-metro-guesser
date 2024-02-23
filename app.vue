<template>
  <input
    type="text"
    placeholder="Station"
    v-on:keyup.enter="submit"
    v-model="query"
    class="absolute -translate-x-2/4 top-4 left-1/2  drop-shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
  />
  <Map class="h-screen" />
</template>

<script setup lang="ts">
const query = ref("");

const submit = () => {
  console.log(query.value);
  // handle success
  // handle not found
}
</script>
