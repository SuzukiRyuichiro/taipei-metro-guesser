<template>
  <div class="sm:w-16 sm:h-16 w-10 h-10">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";

const props = defineProps<{
  color: string;
  total: number;
  completed: number;
  lineAcronym: string;
}>();

ChartJS.register(ArcElement);
// ChartJS.register({
//   id: "drawInside",
//   beforeDatasetDraw(chart, args, pluginOptions) {
//     const { ctx, data, config, chartArea } = chart;
//     ctx.save();
//     const baseSize = Math.min(
//       chartArea.right - chartArea.left,
//       chartArea.bottom - chartArea.top
//     );
//     const fontSize = Math.max(12, baseSize / 4); // Adjust the divisor to control the scale

//     // Apply the responsive font size
//     ctx.font = `bold ${fontSize}px sans-serif`;

//     // draw circle
//     const centerX = (chartArea.left + chartArea.right) / 2;
//     const centerY = (chartArea.top + chartArea.bottom) / 2;

//     // Draw the background circle
//     const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
//     const bgCircleColor = chart.getDatasetMeta(0)._dataset.backgroundColor[1]; // Color of the filled circle background
//     ctx.fillStyle = bgCircleColor;
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
//     ctx.fill();

//     const xCoordinate = chart.getDatasetMeta(0).data[0].x;
//     const yCoordinate = chart.getDatasetMeta(0).data[0].y;
//     const { lineAcronym } = data.datasets[0];
//     ctx.fillStyle = lineAcronym === "O" ? "#110905" : "#fff";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(lineAcronym, xCoordinate, yCoordinate);
//   },
// });

const chartData = computed(() => ({
  datasets: [
    {
      lineAcronym: props.lineAcronym,
      backgroundColor: ["#fff", props.color], // Directly access props.color
      data: [props.total - props.completed, props.completed], // Directly use props.total and props.completed
      labels: ["Not Answered", "Answered"],
      cutout: "80%",
    },
  ],
}));

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
