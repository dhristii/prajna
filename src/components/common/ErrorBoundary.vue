<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else class="mx-auto mt-20 max-w-xl rounded-xl border border-error/30 bg-base-200 p-6 text-center">
      <h2 class="text-xl font-semibold text-error">Unexpected UI Error</h2>
      <p class="mt-2 text-sm text-base-content/80">
        An error occurred while rendering this view. Refresh and try again.
      </p>
      <button class="btn btn-error btn-sm mt-4" type="button" @click="reset">Retry Render</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';

const hasError = ref(false);

onErrorCaptured(() => {
  hasError.value = true;
  return false;
});

const reset = () => {
  hasError.value = false;
};
</script>
