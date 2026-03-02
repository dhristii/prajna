<template>
  <div class="card border border-base-300 bg-base-200/70 shadow-lg">
    <div class="card-body">
      <h3 class="card-title">Ask AI About Your Results</h3>
      <p class="text-xs text-base-content/70">Not medical advice - for educational use only.</p>

      <div class="mt-3 h-72 space-y-3 overflow-y-auto rounded-lg border border-base-300 bg-base-100 p-3">
        <div
          v-for="message in chatHistory"
          :key="message.id"
          class="chat"
          :class="message.role === 'user' ? 'chat-end' : 'chat-start'"
        >
          <div class="chat-bubble" :class="message.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-accent'">
            {{ message.text }}
          </div>
        </div>
      </div>

      <form class="mt-3 flex gap-2" @submit.prevent="sendMessage">
        <input
          v-model="messageInput"
          type="text"
          class="input input-bordered w-full"
          placeholder="What does my coronary risk score mean?"
          aria-label="Ask AI about your genetic report"
          :disabled="isStreaming"
        />
        <button type="submit" class="btn btn-success" :disabled="isStreaming || !messageInput.trim()">
          {{ isStreaming ? 'Streaming...' : 'Send' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { streamChatResponse } from '@/api/service1';
import { useService1Store } from '@/stores/service1';

const props = defineProps<{ jobId: string }>();

const store = useService1Store();
const toast = useToast();
const messageInput = ref('');
const isStreaming = ref(false);

const chatHistory = computed(() => store.chatHistory);

const sendMessage = async () => {
  const text = messageInput.value.trim();
  if (!text) return;

  const userMessageId = crypto.randomUUID();
  store.addChatMessage({
    id: userMessageId,
    role: 'user',
    text,
    createdAt: new Date().toISOString()
  });
  messageInput.value = '';

  const assistantId = crypto.randomUUID();
  store.addChatMessage({
    id: assistantId,
    role: 'assistant',
    text: '',
    createdAt: new Date().toISOString()
  });

  isStreaming.value = true;

  try {
    await streamChatResponse({ jobId: props.jobId, message: text }, (chunk) => {
      const message = store.chatHistory.find((item) => item.id === assistantId);
      if (message) message.text += chunk;
    });
  } catch {
    const message = store.chatHistory.find((item) => item.id === assistantId);
    if (message && !message.text) {
      message.text =
        'Unable to reach live AI analysis right now. Your report still reflects validated score data.';
    }
    toast.error('AI chat is temporarily unavailable.');
  } finally {
    isStreaming.value = false;
  }
};
</script>
