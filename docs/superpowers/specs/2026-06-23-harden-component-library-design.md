# Harden Remotion Component Library for Agent-Driven Reels

Date: 2026-06-23

## Problem

The repo is a good prototype but has several issues preventing it from being a reliable agent-driven design system:

1. No AGENTS.md — agents don't know to read the skill doc
2. package.json scripts lack `typecheck` and `render:browser`
3. ComponentBrowser duration hardcoded (1320) when actual content needs 1200
4. LayoutFrame always renders red debug guides
5. Skill doc SceneShell example is misleading (PipFrame/FaceBubbleSafeArea show nothing by default)
6. Motion helpers (progressSpring/enterProgress) are local, not importable
7. Several Phase 1 components have hardcoded content (AgentWindow, RequirementDocument, CodeDiffCard, StorageModuleCard)
8. Prop types aren't exported
9. ComponentBrowser catalog uses `any` for component/props
10. README lacks agent usage and verification sections

## Design

### Group A: Agent onboarding

**AGENTS.md** at repo root. Forces coding agents to read COMPONENT_LIBRARY_SKILL.md before creating any Remotion scene. Lists the component library categories and a pre/post implementation checklist.

**README.md** updated with:
- Agent Usage section pointing to AGENTS.md and COMPONENT_LIBRARY_SKILL.md
- Verification section with `npm run typecheck` and `npm run render:browser`
- Note about `showGuides` behavior
- Visual style identity preserved

### Group B: Repo hygiene

**package.json scripts:**
```json
{
  "studio": "remotion studio src/index.ts",
  "render:browser": "remotion render src/index.ts ComponentBrowser out/browser.mp4",
  "build": "npm run render:browser",
  "typecheck": "tsc --noEmit"
}
```

**ComponentBrowser duration:** Export `COMPONENT_BROWSER_FRAMES_PER_PAGE` and `COMPONENT_BROWSER_DURATION` from ComponentBrowser.tsx. Root.tsx imports and uses them. Duration auto-updates when catalog changes.

### Group C: Component fixes

**LayoutFrame:** Add `showGuides?: boolean` prop (default `false`). Only renders CaptionSafeGuide when true. Export `LayoutFrameProps` interface.

**AgentWindow:** Add `items?: AgentWindowItem[]` prop. Default items preserve current behavior. Export `AgentWindowItem` and `AgentWindowProps`.

**RequirementDocument:** Add `title?: string` and `bullets?: string[]` props. Defaults preserve current behavior. Export `RequirementDocumentProps`.

**CodeDiffCard:** Add `title?: string`, `badge?: string`, `lines?: CodeDiffLine[]` props. Defaults preserve current behavior. Export `CodeDiffLine`, `CodeDiffLineType`, `CodeDiffCardProps`.

**StorageModuleCard:** Add `title?: string` and `items?: StorageModuleItem[]` props. Defaults preserve current behavior. Export `StorageModuleItem` and `StorageModuleCardProps`.

### Group D: Shared infrastructure

**src/motion.ts:** Created with:
- `motionSprings` (4 spring configs: standard, punchy, controlled, click)
- `MotionSpringKey` type
- `MotionSpringConfig` type
- `enterProgress` helper function

Both BoardPrimitives.tsx and primitives.tsx refactored to import from `../motion`. The D3 helper `progressSpring` is unified into the Phase 1 `enterProgress` API (identical behavior, just one name).

Exported from src/index.ts via `export * from './motion'`.

**Prop type exports:** Named interfaces exported for: LayoutFrameProps, AgentWindowProps, AgentWindowItem, RequirementDocumentProps, CodeDiffCardProps, CodeDiffLine, CodeDiffLineType, StorageModuleCardProps, StorageModuleItem, SystemWindowProps (if not already), StatusPillProps, SceneTitleProps, FileEditorWindowProps.

### Group E: Documentation fix

**COMPONENT_LIBRARY_SKILL.md:** SceneShell template updated to add `showGuides?: boolean` prop and pass it to PipFrame and FaceBubbleSafeArea. Explanation added: "Set `showGuides={true}` while positioning elements. Keep it false for final renders."

### Group F: Type safety

**ComponentBrowser catalog:** Add `defineEntry` helper function for type-safe component entries. Apply to all entries without JSX children (~24 of 30). Entries with JSX children (PanelCard, SystemWindow, etc.) remain as-is with current types.

### Non-goals reaffirmed

- No visual redesign of any component
- No new dependencies
- No framework migration
- No new scene-specific components
- No removal of backwards compatibility

## Files changed

```
AGENTS.md                          (new)
README.md                          (updated)
package.json                       (updated)
src/index.ts                       (updated - motion export)
src/Root.tsx                       (updated - derived duration)
src/motion.ts                      (new)
src/component-browser/ComponentBrowser.tsx  (updated - exports, defineEntry)
src/daily-posting-d3/components/BoardPrimitives.tsx  (updated - motion import)
src/daily-posting-d3-phase1/primitives.tsx  (updated - LayoutFrame, prop-driven, motion import)
COMPONENT_LIBRARY_SKILL.md         (updated - SceneShell fix)
```

## Verification

```sh
npm install
npm run typecheck
npm run render:browser
```
