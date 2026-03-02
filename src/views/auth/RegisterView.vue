<template>
  <div class="grid min-h-screen place-items-center p-4">
    <div class="card w-full max-w-md border border-base-300 bg-base-200 shadow-2xl">
      <div class="card-body">
        <h1 class="text-2xl font-bold">Create your DNA Nexus account</h1>
        <p class="text-sm text-base-content/70">Begin secure genetic insights in minutes.</p>

        <form class="mt-4 space-y-3" @submit.prevent="submit">
          <label class="form-control w-full">
            <span class="label-text mb-1">Full Name</span>
            <input v-model="name" type="text" class="input input-bordered" required />
          </label>

          <label class="form-control w-full">
            <span class="label-text mb-1">Email</span>
            <input v-model="email" type="email" class="input input-bordered" required />
          </label>

          <label class="form-control w-full">
            <span class="label-text mb-1">Password</span>
            <input v-model="password" type="password" class="input input-bordered" required minlength="6" />
          </label>

          <button type="submit" class="btn btn-success w-full" :disabled="isLoading">
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="mt-3 text-center text-sm text-base-content/70">
          Already registered?
          <RouterLink to="/login" class="link link-success">Sign in</RouterLink>
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
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const name = ref('Research User');
const email = ref('research@dnanexus.io');
const password = ref('password123');
const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  try {
    await auth.register(name.value, email.value, password.value);
    toast.success('Account created successfully.');
    router.push('/service1/upload');
  } catch {
    toast.error('Registration failed. Please retry.');
  } finally {
    isLoading.value = false;
  }
};
</script>
