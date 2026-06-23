import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);

// ─── Component library exports ─────────────────────────────────────
// D3 Phase 2 primitives (BoardCanvas aliased to avoid collision)
export {
  BoardCanvas as D3BoardCanvas,
  FaceBubbleSafeArea,
  PipFrame,
  EyebrowChip,
  EditorialHeadline,
  PanelCard,
  StickyNote,
  MetricRow,
  FlowWire,
  DoodleArrow,
  TerminalCard,
  BigCaption,
  SystemList,
} from './daily-posting-d3/components/BoardPrimitives';

// Phase 1 primitives
export {
  BoardCanvas,
  SceneTitle,
  StatusPill,
  StateChangeBadge,
  SystemWindow,
  FileEditorWindow,
  AgentWindow,
  PipelineNode,
  MemoryRecord,
  RequirementDocument,
  CodeDiffCard,
  StorageModuleCard,
  FlowCable,
  CursorActor,
  CaptionSafeGuide,
  NotebookTape,
  LayoutFrame,
} from './daily-posting-d3-phase1/primitives';

// Design tokens
export * from './daily-posting-d3/style';
export * from './daily-posting-d3/timeline';
export * from './daily-posting-d3-phase1/tokens';

