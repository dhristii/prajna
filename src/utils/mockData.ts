import type { Service1Result, JobStatusResponse } from '@/types/service1';

export const mockStatus = (jobId: string, progress: number): JobStatusResponse => {
  const steps = [
    { threshold: 25, phase: 'PARSING_DNA', text: 'Parsing DNA' },
    { threshold: 55, phase: 'CALCULATING_PRS', text: 'Calculating PRS' },
    { threshold: 80, phase: 'GENERATING_GIFTS', text: 'Generating Gifts' },
    { threshold: 99, phase: 'AI_REPORT', text: 'Building AI report' },
    { threshold: 101, phase: 'COMPLETED', text: 'Analysis complete' }
  ] as const;

  const step = steps.find((item) => progress < item.threshold) ?? steps[steps.length - 1];

  return {
    jobId,
    progress,
    phase: step.phase,
    statusText: step.text,
    updatedAt: new Date().toISOString()
  };
};

export const mockResults = (jobId: string): Service1Result => ({
  jobId,
  generatedAt: new Date().toISOString(),
  riskScores: [
    { key: 'cad', label: 'Coronary Artery Disease', score: 78 },
    { key: 't2d', label: 'Type 2 Diabetes', score: 42 },
    { key: 'alz', label: 'Alzheimer\'s Risk', score: 65 },
    { key: 'htn', label: 'Hypertension', score: 39 },
    { key: 'obesity', label: 'Obesity Susceptibility', score: 51 },
    { key: 'stroke', label: 'Stroke Risk', score: 33 },
    { key: 'afib', label: 'Atrial Fibrillation', score: 47 },
    { key: 'ckd', label: 'Kidney Disease', score: 28 }
  ],
  gifts: [
    { key: 'sprint', label: 'Sprint Power', score: 82, tier: 'Elite' },
    { key: 'memory', label: 'Memory', score: 74, tier: 'Above Average' },
    { key: 'recovery', label: 'Recovery', score: 69, tier: 'Above Average' },
    { key: 'muscle', label: 'Muscle Gain', score: 79, tier: 'Elite' },
    { key: 'endurance', label: 'Endurance', score: 64, tier: 'Above Average' },
    { key: 'focus', label: 'Cognitive Focus', score: 58, tier: 'Average' },
    { key: 'sleep', label: 'Sleep Efficiency', score: 62, tier: 'Above Average' },
    { key: 'stress', label: 'Stress Tolerance', score: 56, tier: 'Average' }
  ],
  reportMarkdown: `## Overview\nYour genomic profile suggests **above-average resilience** in recovery and muscle adaptation with moderate metabolic risks.\n\n## Actionable Suggestions\n- Maintain consistent aerobic activity 4-5x/week.\n- Prioritize Mediterranean-style nutrition and fiber-rich meals.\n- Include quarterly lipid and fasting glucose monitoring with your clinician.\n\n> Not medical advice - for educational use only.`,
  rawDataUrl: '#'
});
