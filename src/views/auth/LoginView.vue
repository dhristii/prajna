<template>
  <div class="grid min-h-screen place-items-center p-4">
    <div class="card w-full max-w-md border border-base-300 bg-base-200 shadow-2xl">
      <div class="card-body">
        <h1 class="text-2xl font-bold">Welcome back to DNA Nexus</h1>
        <p class="text-sm text-base-content/70">Securely access your genetic insights.</p>

        <form class="mt-4 space-y-3" @submit.prevent="submit">
          <label class="form-control w-full">
            <span class="label-text mb-1">Email</span>
            <input v-model="email" type="email" class="input input-bordered" required />
          </label>

          <label class="form-control w-full">
            <span class="label-text mb-1">Password</span>
            <input v-model="password" type="password" class="input input-bordered" required minlength="6" />
          </label>

          <button type="submit" class="btn btn-success w-full" :disabled="isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="mt-3 text-center text-sm text-base-content/70">
          New here?
          <RouterLink to="/register" class="link link-success">Create account</RouterLink>
        </p>

        <div class="mt-4 rounded border border-warning/30 bg-warning/10 p-2 text-xs">
          Not medical advice - for educational use only.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const email = ref('clinician@dnanexus.io');
const password = ref('password123');
const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  try {
    await auth.login(email.value, password.value);
    toast.success('Signed in successfully.');
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/service1/upload';
    router.push(redirect);
  } catch {
    toast.error('Unable to sign in. Please retry.');
  } finally {
    isLoading.value = false;
  }
};
</script>
