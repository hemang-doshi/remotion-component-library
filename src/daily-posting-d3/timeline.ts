export const D3_WIDTH = 1080;
export const D3_HEIGHT = 1920;
export const D3_FPS = 30;
export const D3_TOTAL_FRAMES = 2791;

export const SAFE_ZONES = {
  top: 120,
  bottom: 280,
  left: 64,
  right: 64,
  facePip: {
    x: 72,
    y: 150,
    width: 300,
    height: 390,
    borderRadius: 28,
  },
  pipAvoid: {
    x: 0,
    y: 0,
    width: 420,
    height: 620,
  },
  mainContent: {
    x: 120,
    y: 250,
    width: 840,
    height: 1120,
  },
  mainContentWithPip: {
    x: 390,
    y: 260,
    width: 600,
    height: 1080,
  },
  captionBaselineY: 1640,
  captionSafeBottom: 1400,
} as const;

export const D3_TIMELINE = {
  hook: {start: 0, end: 103},
  modelMemoryBroken: {start: 103, end: 208},
  titleSting: {start: 208, end: 268},
  repoInstructions: {start: 268, end: 484},
  productReveal: {start: 484, end: 651},
  repeatedMistake: {start: 651, end: 1006},
  forgottenCards: {start: 1006, end: 1285},
  ragVsMemory: {start: 1285, end: 1700},
  localLayerArchitecture: {start: 1700, end: 1854},
  memoryQuestions: {start: 1854, end: 2188},
  requirementReset: {start: 2188, end: 2310},
  requirementAnalysis: {start: 2310, end: 2593},
  workingMemoryFinale: {start: 2593, end: 2791},
} as const;

export type TimelineKey = keyof typeof D3_TIMELINE;
