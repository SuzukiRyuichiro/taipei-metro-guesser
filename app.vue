<template>
  <input
    type="text"
    placeholder="Station"
    v-on:keyup.enter="submit"
    v-model="query"
    class="absolute -translate-x-2/4 top-4 left-1/2 drop-shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
  />
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts" async>
import nuxtStorage from 'nuxt-storage';

const { fetchTaipeiMetroData, findStationCoordinates } = useTaipeiMetro()
const query = ref("");
const { map, flyTo } = useMap();

const submit = async () => {
  // look through names
  const stationData = nuxtStorage.localStorage.getData('station-data')
  const coordinates = findStationCoordinates(stationData, query.value)
  // if found, fly to the location and zoom on map, clear input
  if (coordinates?.length == 2) {
    flyTo(coordinates)
    query.value = ""
  }
  // if not found, change the style fo the input and show error message
};

onMounted(async () => {
  await fetchTaipeiMetroData()
});


</script>
