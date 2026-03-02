<template>
  <section class="card border border-base-300 bg-base-200/70 shadow-lg">
    <div class="card-body">
      <h3 class="card-title text-base sm:text-lg">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-base-content/70">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
