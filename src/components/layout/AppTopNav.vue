<template>
  <header class="navbar border-b border-base-300 bg-base-200/70 px-4 backdrop-blur">
    <div class="flex-1">
      <label for="nexus-drawer" class="btn btn-ghost btn-square lg:hidden" aria-label="Open sidebar menu">
        <Menu class="h-5 w-5" />
      </label>
      <h2 class="ml-2 text-sm font-semibold sm:text-base">DNA Nexus - Service 1</h2>
    </div>

    <div class="flex-none gap-2">
      <details class="dropdown dropdown-end">
        <summary class="btn btn-ghost btn-sm">Service Switcher</summary>
        <ul class="menu dropdown-content z-[1] mt-2 w-56 rounded-box border border-base-300 bg-base-200 p-2 shadow">
          <li><a class="active">Service 1 (Active)</a></li>
          <li><a class="pointer-events-none opacity-50">Service 2 (Coming Soon)</a></li>
          <li><a class="pointer-events-none opacity-50">Service 3 (Coming Soon)</a></li>
          <li><a class="pointer-events-none opacity-50">Service 4 (Coming Soon)</a></li>
        </ul>
      </details>

      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-circle avatar" aria-label="User menu">
          <div class="w-9 rounded-full border border-base-300">
            <img :src="avatarSrc" alt="User avatar" />
          </div>
        </button>
        <ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box border border-base-300 bg-base-200 p-2 shadow">
          <li><p class="font-medium">{{ userName }}</p></li>
          <li><button type="button" @click="handleLogout">Sign out</button></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Menu } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const userName = computed(() => auth.user?.name ?? 'Research User');
const avatarSrc = computed(
  () => auth.user?.avatarUrl ?? 'https://api.dicebear.com/9.x/notionists/svg?seed=dna-nexus'
);

const handleLogout = () => {
  auth.logout();
  toast.info('You have been signed out.');
  router.push({ name: 'login' });
};
</script>
