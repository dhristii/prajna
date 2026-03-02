import { apiClient } from '@/api/client';
import type {
  ChatRequest,
  JobStatusResponse,
  Service1Result,
  UploadResponse
} from '@/types/service1';
import { mockResults, mockStatus } from '@/utils/mockData';

const apiAvailable = (): boolean => Boolean(import.meta.env.VITE_API_URL);

export const uploadDnaFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  if (!apiAvailable()) {
    return { jobId: crypto.randomUUID(), submittedAt: new Date().toISOString() };
  }

  const { data } = await apiClient.post<UploadResponse>('/api/service1/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;
};

export const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
  try {
    const { data } = await apiClient.get<JobStatusResponse>(`/api/service1/jobs/${jobId}/status`);
    return data;
  } catch {
    const seed = Number((Date.now() / 2000).toFixed(0)) % 100;
    return mockStatus(jobId, Math.min(100, Math.max(7, seed)));
  }
};

export const getJobResults = async (jobId: string): Promise<Service1Result> => {
  try {
    const { data } = await apiClient.get<Service1Result>(`/api/service1/results/${jobId}`);
    return data;
  } catch {
    return mockResults(jobId);
  }
};

export const streamChatResponse = async (
  payload: ChatRequest,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/service1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.body) {
    onChunk('No stream available from server.');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onChunk(chunk);
  }
};
