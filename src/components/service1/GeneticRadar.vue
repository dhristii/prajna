<template>
  <div class="card border border-base-300 bg-base-200/60 shadow-lg">
    <div class="card-body">
      <h3 class="card-title">Genetic Gifts Profile</h3>
      <Radar :data="chartData" :options="chartOptions" class="max-h-[360px]" />
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="gift in gifts"
          :key="gift.key"
          class="badge"
          :class="tierBadgeClass(gift.tier)"
        >
          {{ gift.label }} - {{ gift.tier }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { computed } from 'vue';
import { Radar } from 'vue-chartjs';
import type { GiftScore } from '@/types/service1';
import { tierBadgeClass } from '@/utils/format';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const props = defineProps<{
  gifts: GiftScore[];
}>();

const chartData = computed<ChartData<'radar'>>(() => ({
  labels: props.gifts.map((gift) => gift.label),
  datasets: [
    {
      label: 'Score',
      data: props.gifts.map((gift) => gift.score),
      backgroundColor: 'rgba(16, 185, 129, 0.22)',
      borderColor: '#10b981',
      pointBackgroundColor: '#34d399',
      pointBorderColor: '#052e2b'
    }
  ]
}));

const chartOptions: ChartOptions<'radar'> = {
  responsive: true,
  scales: {
    r: {
      angleLines: { color: 'rgba(255,255,255,0.1)' },
      grid: { color: 'rgba(255,255,255,0.1)' },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        backdropColor: 'transparent',
        color: 'rgba(229,231,235,0.8)'
      },
      pointLabels: {
        color: 'rgba(229,231,235,0.9)'
      }
    }
  },
  plugins: {
    legend: { display: false }
  }
};
</script>
