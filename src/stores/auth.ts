import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { AuthResponse } from '@/types/service1';

const TOKEN_KEY = 'dna-nexus-token';
const USER_KEY = 'dna-nexus-user';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<AuthResponse['user'] | null>(
    localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) as string) : null
  );

  const isAuthenticated = computed(() => Boolean(token.value));

  const persist = () => {
    if (token.value) {
      localStorage.setItem(TOKEN_KEY, token.value);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    if (user.value) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.value));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    token.value = btoa(`${email}:${password}:${Date.now()}`);
    user.value = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      avatarUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(email)}`
    };
    persist();
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    token.value = btoa(`${email}:${password}:${Date.now()}`);
    user.value = {
      id: crypto.randomUUID(),
      name,
      email,
      avatarUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name)}`
    };
    persist();
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    persist();
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout
  };
});
