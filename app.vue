<template>
  <input
    ref="input"
    type="text"
    placeholder="Station"
    v-on:keyup.enter="submit"
    v-model="query"
    class="absolute -translate-x-2/4 top-4 left-1/2 shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
  />
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts" async>
import nuxtStorage from "nuxt-storage";

const { fetchTaipeiMetroData, findStations } = useTaipeiMetro();
const query = ref("");
const { map, flyTo, addAnsweredStationFill } = useMap();
const input = ref<HTMLInputElement>();

const submit = async () => {
  // look through names
  const stationData = nuxtStorage.localStorage.getData("station-data");
  const stationsFound = findStations(stationData, query.value);

  if (Object.keys(stationsFound).length === 0) {
    input.value?.classList.add("animate-shake", "shadow-red-500/50");
    setTimeout(() => {
      input.value?.classList.remove("animate-shake", "shadow-red-500/50");
    }, 2000);
    return
  }

  Object.keys(stationsFound).forEach((lineName) => {
    Object.keys(stationsFound[lineName]).forEach((stationCode) => {
      const { coordinates, name_en, name_tw, color } =
        stationsFound[lineName][stationCode];
      flyTo(coordinates);
      addAnsweredStationFill({
        coordinates,
        nameEn: name_en,
        nameTw: name_tw,
        stationCode,
        color,
      });
    });
  });
  query.value = "";
};

onMounted(async () => {
  await fetchTaipeiMetroData();
});
</script>
