<template>
  <div class="space-y-6">
    <section class="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-base-300 bg-base-200 p-5">
      <div>
        <h1 class="text-2xl font-bold">Your Genetic Insights</h1>
        <p class="text-sm text-base-content/70">Comprehensive, educational genomic summary for Service 1.</p>
      </div>
      <button class="btn btn-outline" type="button">
        <Download class="mr-2 h-4 w-4" /> Download PDF
      </button>
    </section>

    <SectionCard title="Health Risk Scores" subtitle="Polygenic risk profile across key health markers.">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RiskGauge
          v-for="risk in results?.riskScores"
          :key="risk.key"
          :label="risk.label"
          :score="risk.score"
        />
      </div>
    </SectionCard>

    <GeneticRadar v-if="results" :gifts="results.gifts" />

    <SectionCard title="AI Personalized Report" subtitle="Plain-language interpretation generated from your DNA pattern.">
      <article class="prose prose-invert max-w-none rounded-lg border border-base-300 bg-base-100 p-4" v-html="reportHtml"></article>
      <AiChat :job-id="jobId" />
    </SectionCard>

    <div class="flex flex-wrap gap-2">
      <RouterLink class="btn btn-success" to="/service1/upload">Re-analyze</RouterLink>
      <button class="btn btn-outline" type="button">Share Results</button>
      <button class="btn btn-outline" type="button">View Raw Data (secure)</button>
    </div>

    <div class="rounded border border-warning/30 bg-warning/10 p-3 text-xs">
      Not medical advice - for educational use only.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Download } from 'lucide-vue-next';
import { marked } from 'marked';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getJobResults } from '@/api/service1';
import AiChat from '@/components/service1/AiChat.vue';
import GeneticRadar from '@/components/service1/GeneticRadar.vue';
import RiskGauge from '@/components/service1/RiskGauge.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { useService1Store } from '@/stores/service1';

const props = defineProps<{ jobId: string }>();
const service1 = useService1Store();
const toast = useToast();

const resultsQuery = useQuery({
  queryKey: ['service1-results', props.jobId],
  queryFn: () => getJobResults(props.jobId)
});

const results = computed(() => resultsQuery.data.value ?? service1.results);
const reportHtml = computed(() => marked.parse(results.value?.reportMarkdown ?? 'No report generated yet.') as string);
const jobId = computed(() => props.jobId);

watch(
  () => resultsQuery.data.value,
  (payload) => {
    if (!payload) return;
    service1.setResults(payload);
    if (!service1.chatHistory.length) {
      service1.addChatMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'I can explain any risk score or gift trait. Ask me anything about your report.',
        createdAt: new Date().toISOString()
      });
    }
  },
  { immediate: true }
);

watch(
  () => resultsQuery.isError.value,
  (isError) => {
    if (isError) toast.error('Failed to load results. Please retry.');
  },
  { immediate: true }
);
</script>
