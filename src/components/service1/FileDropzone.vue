<template>
  <div
    v-bind="getRootProps()"
    class="rounded-2xl border-2 border-dashed p-8 text-center transition"
    :class="isDragActive ? 'border-emerald-400 bg-emerald-500/10' : 'border-base-300 bg-base-200/30'"
  >
    <input v-bind="getInputProps()" />
    <UploadCloud class="mx-auto h-10 w-10 text-emerald-400" />
    <h3 class="mt-3 text-lg font-semibold">Drag and drop DNA files here</h3>
    <p class="mt-1 text-sm text-base-content/70">Supports .txt, .zip, 23andMe, Ancestry, MyHeritage</p>
    <button type="button" class="btn btn-outline btn-sm mt-4">Select Files</button>
  </div>
</template>

<script setup lang="ts">
import { UploadCloud } from 'lucide-vue-next';
import { useDropzone } from 'vue3-dropzone';

const emit = defineEmits<{
  (e: 'files-added', files: File[]): void;
}>();

const onDrop = (acceptedFiles: File[]) => {
  if (acceptedFiles.length) emit('files-added', acceptedFiles);
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  multiple: true,
  accept: {
    'text/plain': ['.txt'],
    'application/zip': ['.zip']
  }
});
</script>
