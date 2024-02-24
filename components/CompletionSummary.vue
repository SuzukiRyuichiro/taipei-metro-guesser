<template>
  <div class="flex flex-row gap-2 bg-slate-200">
    <CompletionDoughnut
      v-for="(
        { id, color, total, completed, lineAcronym }, lineName
      ) in completionData"
      :key="id"
      :color="color"
      :total="total"
      :completed="completed"
      :lineAcronym="lineAcronym"
    />
  </div>
</template>

<script lang="ts" setup>
import nuxtStorage from "nuxt-storage";
const stationData = computed(() => {
  return nuxtStorage.localStorage.getData("station-data");
});

const { allStationsFound } = defineProps<{
  allStationsFound: object;
}>();

const completionData = computed(() => {
  const lines = Object.keys(stationData.value);
  if (lines == null) return {};

  const obj = {};

  lines.forEach((line, index) => {
    const color = Object.values(stationData.value[line])[0].color;
    const total = Object.values(stationData.value[line]).length;
    const completed = Object.values(allStationsFound[line] || 0).length;
    const lineAcronym = Object.keys(stationData.value[line])[0].match(
      /^[A-Za-z]{1,2}/
    )[0];

    obj[line] = { color, total, completed, lineAcronym, id: index };
  });

  return obj;
});
</script>
