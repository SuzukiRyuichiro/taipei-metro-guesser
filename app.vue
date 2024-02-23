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
import nuxtStorage from "nuxt-storage";

const { fetchTaipeiMetroData, findStation } = useTaipeiMetro();
const query = ref("");
const { map, flyTo, addAnsweredStationFill } = useMap();

const submit = async () => {
  // look through names
  const stationData = nuxtStorage.localStorage.getData("station-data");
  const station = findStation(stationData, query.value);

  if (station === null) return;

  const { coordinates, nameEn, nameTw, stationCode, color } = station;
  flyTo(coordinates);
  addAnsweredStationFill({ coordinates, nameEn, nameTw, stationCode, color });
  query.value = "";
};

onMounted(async () => {
  await fetchTaipeiMetroData();
});
</script>
