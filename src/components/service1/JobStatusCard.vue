<template>
  <div class="card border border-base-300 bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Analysis Progress</h2>
      <p class="text-sm text-base-content/70">{{ status.statusText }}</p>
      <progress class="progress progress-success mt-2 w-full" :value="status.progress" max="100"></progress>
      <p class="mt-1 text-right text-sm font-semibold">{{ status.progress }}%</p>

      <ul class="steps steps-vertical mt-4 lg:steps-horizontal">
        <li class="step" :class="status.progress >= 20 ? 'step-success' : ''">Parsing DNA</li>
        <li class="step" :class="status.progress >= 45 ? 'step-success' : ''">Calculating PRS</li>
        <li class="step" :class="status.progress >= 70 ? 'step-success' : ''">Generating Gifts</li>
        <li class="step" :class="status.progress >= 95 ? 'step-success' : ''">AI Report</li>
      </ul>

      <div class="mt-3 rounded border border-warning/30 bg-warning/10 p-3 text-xs">
        Not medical advice - for educational use only.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JobStatusResponse } from '@/types/service1';

defineProps<{ status: JobStatusResponse }>();
</script>
