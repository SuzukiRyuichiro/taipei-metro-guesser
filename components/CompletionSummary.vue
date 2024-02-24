<template>
  <div class="flex flex-row gap-2 bg-slate-200">
    <CompletionDoughnut
      v-for="{ id, color, total, completed, lineAcronym } in hello"
      :key="id"
      :color="color"
      :total="total"
      :completed="completed"
      :lineAcronym="lineAcronym"
    />
  </div>
</template>

<script lang="ts" setup>
const hello = [
  { id: 1, color: "#ff0000", total: 20, completed: 1, lineAcronym: 'BL' },
  { id: 2, color: "#00ff00", total: 20, completed: 8, lineAcronym: 'R' },
  { id: 3, color: "#23ee00", total: 20, completed: 19, lineAcronym: 'Y' },
  { id: 4, color: "#10e24f", total: 20, completed: 10, lineAcronym: 'O' },
];
</script>
