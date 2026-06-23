export const D3P1_WIDTH = 1080;
export const D3P1_HEIGHT = 1920;
export const D3P1_FPS = 30;
export const D3P1_STYLE_SANDBOX_FRAMES = 210;

export const D3P1_SAFE = {
  edge: 48,
  top: 120,
  bottom: 280,
  contentWidth: 884,
  captionSafeTop: 1400,
} as const;

export const colors = {
  canvas: '#F1F5F9',
  secondaryCanvas: '#E2E8F0',
  panel: '#FFFFFF',
  secondaryPanel: '#F8FAFC',
  primaryText: '#0F172A',
  mutedText: '#64748B',
  border: 'rgba(15, 23, 42, 0.14)',
  softBorder: 'rgba(15, 23, 42, 0.08)',
  blue: '#0284C7',
  cyan: '#0EA5E9',
  green: '#10B981',
  yellow: '#D97706',
  pink: '#E11D48',
  purple: '#7C3AED',
  orange: '#EA580C',
  red: '#DC2626',
  ink: 'rgba(15, 23, 42, 0.55)',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radii = {
  lg: 20,
  xl: 28,
  xxl: 32,
  pill: 999,
} as const;

export const fonts = {
  sans: 'Inter, "Avenir Next", "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", monospace',
} as const;

export const shadows = {
  panel: '0 24px 64px rgba(15, 23, 42, 0.12)',
  floating: '0 30px 80px rgba(15, 23, 42, 0.16)',
  sticker: '0 16px 34px rgba(15, 23, 42, 0.14)',
  accentBlue: '0 18px 48px rgba(2, 132, 199, 0.18)',
  accentPurple: '0 18px 48px rgba(124, 58, 237, 0.18)',
  accentGreen: '0 18px 48px rgba(16, 185, 129, 0.18)',
} as const;

export const motionSprings = {
  standard: {damping: 13, stiffness: 90},
  punchy: {damping: 10, stiffness: 120},
  controlled: {damping: 18, stiffness: 110, mass: 0.9},
  click: {damping: 16, stiffness: 180},
} as const;
