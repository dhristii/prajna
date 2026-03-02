<template>
  <div class="drawer lg:drawer-open">
    <input id="nexus-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex min-h-screen flex-col">
      <AppTopNav />
      <main class="flex-1 p-4 sm:p-6">
        <RouterView />
      </main>
      <AppFooter />
    </div>

    <div class="drawer-side z-30">
      <label for="nexus-drawer" class="drawer-overlay" aria-label="Close sidebar menu"></label>
      <AppSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppTopNav from '@/components/layout/AppTopNav.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>
