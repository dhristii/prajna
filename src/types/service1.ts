export interface ApiError {
  message: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface UploadedFile {
  id: string;
  file: File;
}

export type JobPhase = 'PARSING_DNA' | 'CALCULATING_PRS' | 'GENERATING_GIFTS' | 'AI_REPORT' | 'COMPLETED' | 'FAILED';

export interface UploadResponse {
  jobId: string;
  submittedAt: string;
}

export interface JobStatusResponse {
  jobId: string;
  progress: number;
  phase: JobPhase;
  statusText: string;
  updatedAt: string;
}

export interface RiskScore {
  key: string;
  label: string;
  score: number;
}

export type GiftTier = 'Elite' | 'Above Average' | 'Average';

export interface GiftScore {
  key: string;
  label: string;
  score: number;
  tier: GiftTier;
}

export interface Service1Result {
  jobId: string;
  generatedAt: string;
  riskScores: RiskScore[];
  gifts: GiftScore[];
  reportMarkdown: string;
  rawDataUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

export interface ChatRequest {
  jobId: string;
  message: string;
}
