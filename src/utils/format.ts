import type { GiftTier } from '@/types/service1';

export const percent = (value: number): string => `${Math.round(value)}%`;

export const tierBadgeClass = (tier: GiftTier): string => {
  if (tier === 'Elite') return 'badge-success';
  if (tier === 'Above Average') return 'badge-warning';
  return 'badge-neutral';
};
