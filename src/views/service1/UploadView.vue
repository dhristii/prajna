<template>
  <div class="space-y-6">
    <section class="rounded-2xl border border-base-300 bg-gradient-to-r from-nexus-900 to-nexus-800 p-6 shadow-glow">
      <h1 class="text-2xl font-bold sm:text-3xl">Upload your DNA & discover your genetic story</h1>
      <p class="mt-2 max-w-2xl text-sm text-base-content/80 sm:text-base">
        Service 1 delivers polygenic risk scores and your strongest genetic gifts in one secure report.
      </p>
      <p class="mt-3 text-xs text-warning">Not medical advice - for educational use only.</p>
    </section>

    <SectionCard title="DNA File Upload" subtitle="Drag and drop your existing DNA export files.">
      <FileDropzone @files-added="addFiles" />

      <TransitionGroup
        tag="ul"
        name="fade"
        class="mt-4 divide-y divide-base-300 rounded-lg border border-base-300 bg-base-100"
      >
        <li
          v-for="item in files"
          :key="item.id"
          class="flex items-center justify-between gap-2 p-3 text-sm"
        >
          <div>
            <p class="font-medium">{{ item.file.name }}</p>
            <p class="text-xs text-base-content/70">{{ (item.file.size / 1024).toFixed(1) }} KB</p>
          </div>
          <button class="btn btn-ghost btn-sm" type="button" @click="removeFile(item.id)" aria-label="Remove file">
            <Trash2 class="h-4 w-4" />
          </button>
        </li>
      </TransitionGroup>

      <div class="mt-4 flex flex-wrap gap-2 text-xs">
        <span class="badge badge-outline"><FileText class="mr-1 h-3 w-3" /> .txt</span>
        <span class="badge badge-outline"><Archive class="mr-1 h-3 w-3" /> .zip</span>
        <span class="badge badge-outline">23andMe</span>
        <span class="badge badge-outline">Ancestry</span>
        <span class="badge badge-outline">MyHeritage</span>
      </div>

      <button class="btn btn-success mt-5" type="button" :disabled="!files.length || isPending" @click="analyze">
        {{ isPending ? 'Submitting...' : 'Analyze Now' }}
      </button>
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { Archive, FileText, Trash2 } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { uploadDnaFile } from '@/api/service1';
import FileDropzone from '@/components/service1/FileDropzone.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { useService1Store } from '@/stores/service1';
import type { UploadedFile } from '@/types/service1';

const files = ref<UploadedFile[]>([]);
const router = useRouter();
const toast = useToast();
const service1 = useService1Store();

const { mutateAsync, isPending } = useMutation({ mutationFn: uploadDnaFile });

const addFiles = (incoming: File[]) => {
  const additions = incoming.map((file) => ({ id: crypto.randomUUID(), file }));
  files.value = [...files.value, ...additions];
};

const removeFile = (id: string) => {
  files.value = files.value.filter((item) => item.id !== id);
};

const analyze = async () => {
  if (!files.value.length) return;
  try {
    const response = await mutateAsync(files.value[0].file);
    service1.reset();
    toast.success('DNA file uploaded. Analysis started.');
    router.push(`/service1/analysis/${response.jobId}`);
  } catch {
    toast.error('Upload failed. Verify file format and retry.');
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
