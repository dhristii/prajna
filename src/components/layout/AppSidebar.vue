<template>
  <aside class="h-full w-72 border-r border-base-300 bg-base-200/80 p-4">
    <div class="mb-8 flex items-center gap-3">
      <div class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">DNA</div>
      <div>
        <h1 class="text-lg font-bold">DNA Nexus</h1>
        <p class="text-xs text-base-content/60">Genetic Intelligence Platform</p>
      </div>
    </div>

    <ul class="menu rounded-box gap-1 p-0">
      <li>
        <RouterLink to="/service1/upload" class="active:border-l-2 active:border-emerald-400">
          Service 1: Upload & Analyze
        </RouterLink>
      </li>
      <li><a class="pointer-events-none opacity-50">Service 2: Pharmacogenomics</a></li>
      <li><a class="pointer-events-none opacity-50">Service 3: Longevity Signals</a></li>
      <li><a class="pointer-events-none opacity-50">Service 4: Family Insights</a></li>
    </ul>

    <div class="mt-8 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-warning-content">
      Not medical advice - for educational use only.
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
