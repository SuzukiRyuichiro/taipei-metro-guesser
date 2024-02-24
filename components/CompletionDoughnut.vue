<template>
  <div class="w-16 h-16">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement);
ChartJS.register({
  id: 'drawInside',
  beforeDatasetDraw(chart, args, pluginOptions) {
    const { ctx, data, config } = chart
    ctx.save()
    ctx.font = 'bold 24px sans-serif'
    const xCoordinate = chart.getDatasetMeta(0).data[0].x
    const yCoordinate = chart.getDatasetMeta(0).data[0].y
    ctx.fillStyle = '#f1f1f1f1'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(data.datasets[0].lineAcronym, xCoordinate, yCoordinate)
  }
});

const props = defineProps<{
  color: string;
  total: number;
  completed: number;
  lineAcronym: string;
}>();

const chartData = computed(() => ({
  datasets: [
    {
      lineAcronym: props.lineAcronym,
      backgroundColor: ["#fff", props.color], // Directly access props.color
      data: [props.total - props.completed, props.completed], // Directly use props.total and props.completed
      cutout: "80%",
    },
  ],
}));

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
