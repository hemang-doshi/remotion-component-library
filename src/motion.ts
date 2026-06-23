import {spring} from 'remotion';

export const motionSprings = {
  standard: {damping: 13, stiffness: 90},
  punchy: {damping: 10, stiffness: 120},
  controlled: {damping: 18, stiffness: 110, mass: 0.9},
  click: {damping: 16, stiffness: 180},
} as const;

export type MotionSpringKey = keyof typeof motionSprings;
export type MotionSpringConfig = (typeof motionSprings)[MotionSpringKey];

export const enterProgress = (
  frame: number,
  fps: number,
  delay = 0,
  config: MotionSpringConfig = motionSprings.standard,
  durationInFrames = 24,
) =>
  spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
    durationInFrames,
  });
