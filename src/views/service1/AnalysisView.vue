<template>
  <div class="mx-auto max-w-3xl space-y-6">
    <JobStatusCard v-if="status" :status="status" />

    <div class="card border border-base-300 bg-base-200/70">
      <div class="card-body">
        <h3 class="card-title">Live Workflow</h3>
        <p class="text-sm text-base-content/70">Parsing DNA -> Calculating PRS -> Generating Gifts -> AI Report</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <button class="btn btn-outline btn-warning" type="button" @click="cancelJob">Cancel Analysis</button>
          <RouterLink class="btn btn-ghost" to="/service1/upload">Back to Upload</RouterLink>
        </div>

        <div class="mt-4 rounded border border-warning/30 bg-warning/10 p-3 text-xs">
          Not medical advice - for educational use only.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getJobStatus } from '@/api/service1';
import JobStatusCard from '@/components/service1/JobStatusCard.vue';
import { useService1Store } from '@/stores/service1';

const props = defineProps<{ jobId: string }>();

const router = useRouter();
const toast = useToast();
const service1 = useService1Store();

const statusQuery = useQuery({
  queryKey: ['service1-status', props.jobId],
  queryFn: () => getJobStatus(props.jobId),
  refetchInterval: (query) => (query.state.data?.progress === 100 ? false : 3000)
});

const status = computed(() => statusQuery.data.value ?? service1.currentJob);

watch(
  () => statusQuery.data.value,
  (value) => {
    if (!value) return;
    service1.setJob(value);
    if (value.progress >= 100) {
      toast.success('Analysis complete. Opening results dashboard.');
      router.push(`/service1/results/${props.jobId}`);
    }
  },
  { immediate: true }
);

const cancelJob = () => {
  service1.reset();
  toast.info('Analysis canceled.');
  router.push('/service1/upload');
};
</script>
