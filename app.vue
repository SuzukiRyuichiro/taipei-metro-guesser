<template>
  <div class="h-screen overflow-hidden relative">
      <label
        ref="input"
        for="search"
        class="absolute p-2.5 -translate-x-2/4 top-4 left-1/2 shadow-md bg-gray-50 flex whitespace-nowrap items-center justify-between gap-3 border border-gray-300 text-gray-900 text-sm rounded-full w-10/12 sm:w-8/12"
      >
        <input
          name="search"
          type="text"
          placeholder="Station"
          v-on:keyup.enter="submit"
          v-model="query"
          class="w-full h-6 bg-inherit px-2 outline-none"
        />
        <SearchIcon></SearchIcon>
      </label>
      <CompletionSummary
        :allStationsFound="allStationsFound"
        class="absolute bottom-3 -translate-x-2/4 left-1/2 rounded"
      ></CompletionSummary>
    <div id="map" class="h-full">
    </div>
  </div>
</template>

<script setup lang="ts" async>
import nuxtStorage from "nuxt-storage";
import type { StationData } from "./types/stationData";

const { fetchTaipeiMetroData, findStations } = useTaipeiMetro();
const query = ref("");
const { map, flyTo, addAnsweredStationFill } = useMap();
const input = ref<HTMLInputElement>();

const allStationsFound = ref(
  nuxtStorage.localStorage.getData("answered-data") || {}
);

const mergeStations = (allStations, newStations) => {
  // Iterate over each line in the newStations object
  Object.keys(newStations).forEach((line) => {
    if (allStations[line]) {
      // If the line exists, merge stations
      Object.keys(newStations[line]).forEach((stationCode) => {
        allStations[line][stationCode] = newStations[line][stationCode];
      });
    } else {
      // If the line does not exist, add the new line and stations
      allStations[line] = newStations[line];
    }
  });
  return allStations;
};

const goThroughStationDataAndFill = (
  stationData,
  callback?: (coordinates: number[]) => {}
) => {
  Object.keys(stationData).forEach((lineName) => {
    Object.keys(stationData[lineName]).forEach((stationCode) => {
      const { coordinates, name_en, name_tw, color } =
        stationData[lineName][stationCode];
      addAnsweredStationFill({
        coordinates,
        nameEn: name_en,
        nameTw: name_tw,
        stationCode,
        color,
      });
      if (callback && typeof callback === "function") {
        callback(coordinates);
      }
    });
  });
};

const submit = async () => {
  // look through names
  const stationData = nuxtStorage.localStorage.getData("station-data");
  const stationsFound = findStations(stationData, query.value);

  if (Object.keys(stationsFound).length === 0) {
    input.value?.classList.add(
      "animate-shake",
      "shadow-red-500/50",
      "border-red-500"
    );
    setTimeout(() => {
      input.value?.classList.remove(
        "animate-shake",
        "shadow-red-500/50",
        "border-red-500"
      );
    }, 2000);
    return;
  }

  // save to the all stations
  allStationsFound.value = mergeStations(allStationsFound.value, stationsFound);
  nuxtStorage.localStorage.setData("answered-data", allStationsFound.value);

  // add fill and go fly there
  goThroughStationDataAndFill(stationsFound, flyTo);
  query.value = "";
};

onBeforeMount(async () => {
  await fetchTaipeiMetroData();
})

onMounted(async () => {
  setTimeout(() => {
    goThroughStationDataAndFill(allStationsFound.value);
  }, 1000);
});
</script>
