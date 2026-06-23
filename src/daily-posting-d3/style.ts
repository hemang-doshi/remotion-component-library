import {D3_HEIGHT, D3_WIDTH, SAFE_ZONES} from './timeline';

export const COLORS = {
  canvas: '#F1F5F9',
  secondaryCanvas: '#E2E8F0',
  panel: '#FFFFFF',
  secondaryPanel: '#F8FAFC',
  primaryText: '#0F172A',
  mutedText: '#64748B',
  border: 'rgba(15, 23, 42, 0.14)',
  softInk: 'rgba(15, 23, 42, 0.08)',
  glow: 'rgba(14, 165, 233, 0.12)',
  blue: '#0284C7',
  cyan: '#0EA5E9',
  green: '#10B981',
  yellow: '#D97706',
  pink: '#E11D48',
  purple: '#7C3AED',
  orange: '#EA580C',
  red: '#DC2626',
  white: '#FFFFFF',
} as const;

export const FONTS = {
  display: '"Avenir Next", "Segoe UI", sans-serif',
  body: 'Inter, "Avenir Next", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", monospace',
} as const;

export const SHADOWS = {
  panel: '0 18px 40px rgba(15, 23, 42, 0.10)',
  floating: '0 24px 70px rgba(15, 23, 42, 0.16)',
  sticker: '0 12px 28px rgba(15, 23, 42, 0.14)',
} as const;

export const fullFrame: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: D3_WIDTH,
  height: D3_HEIGHT,
};

export const safeFrame: React.CSSProperties = {
  position: 'absolute',
  top: SAFE_ZONES.top,
  left: SAFE_ZONES.left,
  right: SAFE_ZONES.right,
  bottom: SAFE_ZONES.bottom,
};
