<template>
  <div class="glass-panel rounded-xl p-4">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="mt-3 text-center">
      <p class="text-sm font-medium">{{ label }}</p>
      <p class="text-xs text-base-content/70">Risk Score: {{ score }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps<{
  label: string;
  score: number;
}>();

const scoreColor = computed(() => {
  if (props.score >= 67) return '#ef4444';
  if (props.score >= 40) return '#f59e0b';
  return '#22c55e';
});

const chartData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Risk', 'Remaining'],
  datasets: [
    {
      data: [props.score, 100 - props.score],
      backgroundColor: [scoreColor.value, 'rgba(255, 255, 255, 0.08)'],
      borderWidth: 0,
      cutout: '72%'
    }
  ]
}));

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
};
</script>
