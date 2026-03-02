import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatMessage, JobStatusResponse, Service1Result } from '@/types/service1';

export const useService1Store = defineStore('service1', () => {
  const currentJob = ref<JobStatusResponse | null>(null);
  const results = ref<Service1Result | null>(null);
  const chatHistory = ref<ChatMessage[]>([]);

  const setJob = (job: JobStatusResponse | null) => {
    currentJob.value = job;
  };

  const setResults = (payload: Service1Result | null) => {
    results.value = payload;
  };

  const addChatMessage = (message: ChatMessage) => {
    chatHistory.value.push(message);
  };

  const clearChatHistory = () => {
    chatHistory.value = [];
  };

  const reset = () => {
    currentJob.value = null;
    results.value = null;
    chatHistory.value = [];
  };

  return {
    currentJob,
    results,
    chatHistory,
    setJob,
    setResults,
    addChatMessage,
    clearChatHistory,
    reset
  };
});
