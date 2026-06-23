import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);

// ─── Component library exports ─────────────────────────────────────
export * from './daily-posting-d3/components/BoardPrimitives';
export * from './daily-posting-d3/style';
export * from './daily-posting-d3/timeline';
export * from './daily-posting-d3-phase1/primitives';
export * from './daily-posting-d3-phase1/tokens';
