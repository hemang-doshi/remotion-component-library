# Remotion Component Library

30 animated UI primitives for Remotion video compositions, built for 1080×1920 (9:16 portrait) canvas.

## Contents

### D3 Phase 2 (`src/daily-posting-d3/components/BoardPrimitives.tsx`)

13 components with a design system in `style.ts`:
BoardCanvas, FaceBubbleSafeArea, PipFrame, EyebrowChip, EditorialHeadline, PanelCard, StickyNote, MetricRow, FlowWire, DoodleArrow, TerminalCard, BigCaption, SystemList

### Phase 1 (`src/daily-posting-d3-phase1/primitives.tsx`)

17 evolved components with tokens in `tokens.ts`:
BoardCanvas, SceneTitle, StatusPill, StateChangeBadge, SystemWindow, FileEditorWindow, AgentWindow, PipelineNode, MemoryRecord, RequirementDocument, CodeDiffCard, StorageModuleCard, FlowCable, CursorActor, CaptionSafeGuide, NotebookTape, LayoutFrame

## Getting started

```sh
npm install
npx remotion studio
```

Select the `ComponentBrowser` composition to browse all 30 components with live animations.

## Render

```sh
npx remotion render src/index.ts ComponentBrowser out/browser.mp4
```

## Usage

Import components from their respective module:

```ts
import {PanelCard, StickyNote} from './daily-posting-d3/components/BoardPrimitives';
import {SystemWindow, StatusPill} from './daily-posting-d3-phase1/primitives';
```

All components are pure functions of `useCurrentFrame()` — no side effects, no async state.
