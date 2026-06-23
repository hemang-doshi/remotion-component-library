---
name: remotion-component-library
description: >
  A comprehensive component library system for building Remotion video compositions with minimal code.
  Use this skill whenever you need to create Remotion scenes, animate UI components in video, or compose
  talking-head overlays with animated elements. This skill covers 30 pre-built animated primitives
  (cards, windows, badges, SVG connectors, terminals, captions) across two design systems (Phase 1 and Phase 2),
  along with scene templates, composition patterns, and the user's editing style for pacing and transitions.
  Always prefer using these components over writing custom animated elements from scratch.
  Consult this skill before building any new Remotion scene to see if existing components can be composed instead.
---

# Remotion Component Library

A system of 30 pre-built animated UI primitives for Remotion. The library is designed to minimize the amount of code you write — instead of building animated elements from scratch, you import and compose existing components like building blocks.

The library lives at `src/daily-posting-d3/` and `src/daily-posting-d3-phase1/`. Always prefer these components over writing custom animated elements.

Also read `/remotion-best-practices` and apply those guidelines on top of what's here.

## Principles

- **Compose, don't build.** Every scene is a composition of existing primitives. You should rarely need to write a new animated element.
- **Props are your API.** Components expose `left`, `top`, `width`, `delay`, `accent` — position and timing via props, no layout code.
- **Spring-based entrance by default.** Every component animates in with `spring()` on mount. You control timing via `delay` and nothing else.
- **Pure, always.** All components are pure functions of `useCurrentFrame()`. No side effects, no async, no external state.

## Design System

### Colors
```
Canvas:  #F1F5F9  (light slate)
Panel:   #FFFFFF
Primary: #0F172A  (near-black)
Muted:   #64748B

Accents:
blue:    #0284C7  cyan:    #0EA5E9  green:  #10B981
yellow:  #D97706  pink:    #E11D48  purple: #7C3AED
orange:  #EA580C  red:     #DC2626
```

Use accents for: accent bars on PanelCard, StickyNote colors, status pill dots, flow wire colors. Pass the accent color directly — `COLORS.blue`, `C.blue`, etc. Phase 1 also supports accent *names* as type-safe `Accent` union: `"blue" | "cyan" | "green" | "yellow" | "pink" | "purple" | "orange" | "red"`.

### Fonts
```
display: Avenir Next (headlines, titles)
body:    Inter (body, captions)
mono:    JetBrains Mono (code, labels, status)
```

### Shadows
```
panel:    0 24px 64px rgba(15,23,42,0.12)   — cards, windows
floating: 0 30px 80px rgba(15,23,42,0.16)   — terminals, modals
sticker:  0 16px 34px rgba(15,23,42,0.14)   — sticky notes, small elements
```

Phase 1 also has accent-specific shadows: `accentBlue`, `accentPurple`, `accentGreen`.

### Spacing (Phase 1 tokens)
```
xs: 8  sm: 12  md: 16  lg: 24  xl: 32  xxl: 40
```

### Radii (Phase 1 tokens)
```
lg: 20  xl: 28  xxl: 32  pill: 999
```

### Motion Springs
```
standard:   {damping: 13, stiffness: 90}   — default
punchy:     {damping: 10, stiffness: 120}  — sticky notes, state badges
controlled: {damping: 18, stiffness: 110, mass: 0.9}  — chips, rows
click:      {damping: 16, stiffness: 180}  — subtle pops
```

### Safe Zones & Canvas
```
Canvas:  1080 × 1920 (9:16 portrait)
Main content:  x=120 y=250  w=840  h=1120
With face PiP: x=390 y=260  w=600  h=1080  (avoid x<420, y<620)
Caption safe:  y=1400+       bottom=280px padding
```

The face PiP area is `x=72 y=150 w=300 h=390 rounded 28px`. Nothing should be placed in `x=0 y=0 w=420 h=620` (the pipAvoid zone) as it gets hidden behind the talking head.

## Component Quick Reference

### D3 Phase 2 (`daily-posting-d3/components/BoardPrimitives.tsx`)

Design tokens in `daily-posting-d3/style.ts` — import `COLORS`, `FONTS`, `SHADOWS`, `fullFrame`, `safeFrame`.

| Component | Props | Defaults | Description |
|---|---|---|---|
| `BoardCanvas` | `accent?: string, subtle?: boolean` | accent=COLORS.blue | Full-screen background with animated gradient glow grid + decorative SVG scribbles. `subtle` removes scribbles. |
| `FaceBubbleSafeArea` | `showGuide?: boolean` | false | Red dashed guide overlay for face PiP zone. Returns null when hidden. |
| `PipFrame` | `showGuide?: boolean` | false | White glass PiP frame overlay. Returns null when hidden. |
| `EyebrowChip` | `label, color?, left, top, delay?` | color=COLORS.blue | Mono uppercase badge with colored border. Enters from below. |
| `EditorialHeadline` | `title, subtitle?, left?, top?, maxWidth?, align?, color?` | left=120, top=250, maxWidth=840 | Main scene title with spring scale+translate. Can contain JSX in `title`. |
| `PanelCard` | `title?, eyebrow?, left, top, width, height?, delay?, accent?, children?` | accent=COLORS.blue | Rounded card with left accent bar. Content in children. |
| `StickyNote` | `label, color, left, top, width?, delay?, rotation?, textColor?` | width=220, rotation=0 | Colored sticky note with rotation and punchy spring scale. |
| `MetricRow` | `label, value, color?, delay?` | color=COLORS.blue | Label + value row with colored dot. Slides in from left. |
| `FlowWire` | `d(path string), color?, delay?, width?` | color=COLORS.cyan, width=6 | 3-layer SVG animated curving wire: glow background, solid draw, dashed motion overlay. |
| `DoodleArrow` | `d(path string), color?, delay?` | color=COLORS.orange | Hand-drawn SVG arrow that draws itself in. |
| `TerminalCard` | `title?, code:string[], left, top, width?, height?, delay?` | width=540 | Dark terminal window with macOS dots, title bar, typewriter code lines + blinking cursor. |
| `BigCaption` | `children, top?, maxWidth?` | top=1460, maxWidth=820 | Bottom-safe-zone caption text positioned in the safe layout area. |
| `SystemList` | `items:{label,detail,color}[], left, top, width, delay?` | — | Wraps PanelCard + multiple MetricRows with staggered delays. |

### Phase 1 (`daily-posting-d3-phase1/primitives.tsx`)

Design tokens in `daily-posting-d3-phase1/tokens.ts` — import `colors`, `fonts`, `shadows`, `radii`, `spacing`, `motionSprings`.

| Component | Props | Defaults | Description |
|---|---|---|---|
| `BoardCanvas` | `accent?: string` | accent=colors.blue | Phase 1 canvas variant with animated glow + grid + scribbles. |
| `SceneTitle` | `label, title, subtitle, accent?, left?, top?, delay?` | left=98, top=122 | Eyebrow chip + title (supports `\n`) + subtitle. Spring entrance. |
| `StatusPill` | `label, accent?, delay?` | accent='green' | Inline colored dot + uppercase label with spring. Returns an inline-flex element. |
| `StateChangeBadge` | `from, to, accent?, delay?` | accent='yellow' | `from → to` state transition badge with rotation spring. |
| `SystemWindow` | `title, accent?, left, top, width, height, delay?, children?` | — | macOS-window container: title bar with traffic lights, title label, StatusPill("synced"), accent left border. |
| `FileEditorWindow` | `filename, lines:{number,text,accent?}[], left, top, width, height, delay?` | — | VS Code-style editor inside SystemWindow with line numbers and cursor blink on last line. |
| `AgentWindow` | `title?, left, top, width, height, delay?` | title="Agent Plan" | Pre-configured SystemWindow with 3 items (load repo, check memory, preserve correction). |
| `PipelineNode` | `label, sublabel, accent?, left, top, width?, delay?` | width=220, accent='cyan' | Small step card with label + accent-colored sublabel. |
| `MemoryRecord` | `title, detail, accent?, left, top, width?, delay?` | width=280, accent='green' | Sticky-note-style record card with "memory record" eyebrow, rotation + scale spring. |
| `RequirementDocument` | `left, top, width, height, delay?` | — | SystemWindow with 3 requirement bullets (orange dots + text). |
| `CodeDiffCard` | `left, top, width, delay?` | — | Card with code diff lines (red/green), StatusPill badge. |
| `StorageModuleCard` | `left, top, width, delay?` | — | SystemWindow with 3 storage categories (Preferences, Decisions, Mistakes). |
| `FlowCable` | `points?: [x,y][], d?: string, accent?, delay?, progress?: number, color?: string` | accent='cyan' | Animated SVG connector line: glow layer, solid draw, dashed motion. **Enhanced**: pass `d` for raw SVG paths, `progress` for pre-computed animation, `color` for explicit color bypassing accent. |
| `CursorActor` | `from:[x,y], to:[x,y], startFrame, endFrame, dragging?` | — | Animated cursor SVG that moves between points with press animation when dragging. |
| `CaptionSafeGuide` | (none) | — | Dashed red border showing caption safe zone. |
| `NotebookTape` | `left, top, rotate?` | — | Decorative torn-paper tape strip. |
| `LayoutFrame` | `children` | — | Full-scene wrapper: BoardCanvas + CaptionSafeGuide + 2 NotebookTapes + children. |

## Scene Templates

These are pre-built composition patterns you use as a starting point. Copy the structure, swap in the data.

### SceneShell (D3 Phase 2 pattern)

The standard scene wrapper. Used in all 13 D3 scenes:

```tsx
import {AbsoluteFill} from 'remotion';
import {BoardCanvas, PipFrame, FaceBubbleSafeArea} from './components/BoardPrimitives';

const SceneShell: React.FC<{
  accent: string;
  children: React.ReactNode;
  showGuides?: boolean;
}> = ({accent, children, showGuides = false}) => (
  <AbsoluteFill>
    <BoardCanvas accent={accent} />
    {children}
    <PipFrame showGuide={showGuides} />
    <FaceBubbleSafeArea showGuide={showGuides} />
  </AbsoluteFill>
);
```

Set `showGuides={true}` while positioning elements. Keep it false for final renders.

### LayoutFrame (Phase 1 pattern)

A ready-to-use full-scene wrapper:

```tsx
import {LayoutFrame, SceneTitle, StatusPill} from './primitives';

const MyScene = () => (
  <LayoutFrame>
    <SceneTitle label="LABEL" title="Title Text" subtitle="Description" />
    {/* your content here */}
  </LayoutFrame>
);
```

LayoutFrame already includes BoardCanvas + CaptionSafeGuide + decorative NotebookTapes.

### Title Scene Template

```tsx
const TitleScene = () => (
  <SceneShell accent={COLORS.yellow}>
    <EyebrowChip label="Label" left={390} top={150} color={COLORS.yellow} />
    <EditorialHeadline
      left={390} top={250} maxWidth={610}
      title={'Day 001\nAgent Memory\nInfrastructure'}
      subtitle="A subtitle that explains the concept."
    />
    <StickyNote label="key point" color="#DCFCE7" left={416} top={900} width={190} rotation={-4} />
    <StickyNote label="another point" color="#FFEDD5" left={626} top={860} width={180} rotation={3} delay={4} />
    <BigCaption top={1450}>The single takeaway line at the bottom.</BigCaption>
  </SceneShell>
);
```

### Data Panel Scene Template

```tsx
const DataScene = () => (
  <SceneShell accent={COLORS.green}>
    <EyebrowChip label="Category" left={390} top={150} />
    <EditorialHeadline left={390} top={250} maxWidth={610}
      title={'Main\nHeadline'} subtitle="Supporting text." />
    <PanelCard left={396} top={780} width={560} accent={COLORS.green} eyebrow="LABEL" title="Title">
      <MetricRow label="Metric" value="value" color={COLORS.green} />
      <MetricRow label="Metric 2" value="value 2" color={COLORS.orange} delay={6} />
      <MetricRow label="Metric 3" value="value 3" color={COLORS.pink} delay={12} />
    </PanelCard>
  </SceneShell>
);
```

## Composition Recipes

Common patterns for combining components.

### Staggered list (SystemList)

```tsx
<SystemList
  left={396} top={760} width={560}
  items={[
    {label: 'Item', detail: 'detail', color: COLORS.blue},
    {label: 'Item 2', detail: 'detail 2', color: COLORS.orange},
    {label: 'Item 3', detail: 'detail 3', color: COLORS.pink},
  ]}
/>
```
Each MetricRow gets `delay={index * 6}` automatically.

### Two-panel comparison

```tsx
<PanelCard left={396} top={760} width={250} accent={COLORS.blue} eyebrow="LEFT" title="Left panel">
  <MetricRow label="Metric" value="value" color={COLORS.blue} />
</PanelCard>
<PanelCard left={690} top={760} width={266} accent={COLORS.green} eyebrow="RIGHT" title="Right panel">
  <MetricRow label="Metric" value="value" color={COLORS.green} delay={6} />
</PanelCard>
{/* Connect them */}
<FlowWire d="M652 980 C680 980, 690 980, 706 980" color={COLORS.cyan} delay={14} />
```

### Sticky note cluster

```tsx
<StickyNote label="first point" color="#DCFCE7" left={410} top={760} width={280} rotation={-4} />
<StickyNote label="second point" color="#FFEDD5" left={670} top={860} width={300} rotation={5} delay={6} />
<StickyNote label="third point" color="#FCE7F3" left={482} top={1030} width={240} rotation={-2} delay={10} />
{/* Connect them visually */}
<DoodleArrow d="M754 780 C842 734, 936 752, 964 832" color={COLORS.orange} delay={16} />
```

### Terminal + notes

```tsx
<TerminalCard left={400} top={770} width={560} delay={8}
  code={['line 1', 'line 2', 'line 3']}
/>
<StickyNote label="note about result" color="#DCFCE7" left={416} top={1200} width={260} rotation={-4} />
<StickyNote label="another note" color="#FCE7F3" left={706} top={1180} width={260} rotation={5} delay={5} />
```

## Animation Patterns

### Entrance delay conventions

Stagger delays by element type:
- **Single elements** (headlines, titles, single cards): `delay={0}` or no delay
- **Data rows** (MetricRow, list items): `delay={index * 6}` for smooth stagger
- **Secondary elements** (notes, arrows, wires): `delay={12}` to `delay={24}`
- **Tertiary elements** (decorative, captions): `delay={18}` to `delay={36}`

### Scene transitions

Use fade + scale for transitions between scenes:
```tsx
const transitionProgress = spring({
  frame: Math.max(0, frame - transitionStart),
  fps,
  config: motionSprings.controlled,
  durationInFrames: 30,
});

// Outgoing content
<AbsoluteFill style={{
  opacity: interpolate(transitionProgress, [0, 1], [1, 0]),
  transform: `scale(${interpolate(transitionProgress, [0, 1], [1, 0.95])})`,
}}>
  {/* previous scene content */}
</AbsoluteFill>

// Incoming content
<AbsoluteFill style={{
  opacity: interpolate(transitionProgress, [0, 1], [0, 1]),
  transform: `scale(${interpolate(transitionProgress, [0, 1], [0.95, 1])})`,
}}>
  {/* next scene content */}
</AbsoluteFill>
```

Transition duration: 20–30 frames. Use `spring()` from remotion for smooth ease.

### The `enterProgress` helper

Import from `src/motion.ts`:

```ts
import {enterProgress, motionSprings} from '../motion';
```

```ts
enterProgress(frame, fps, delay = 0, config = {damping:13, stiffness:90}, durationInFrames = 24)
```

This handles frame offset and duration consistently with the rest of the library.

When building a custom scene, extract a `revealProgress(frame, fps, startFrame, durationInFrames, config?)` helper to manage staggered entrances cleanly instead of writing inline spring calls for each element.

## Best Practices

### Component composition rules

1. **Always start from a template.** `SceneShell` or `LayoutFrame` gives you the canvas and safe zones for free.
2. **Position content in the main content zone.** For D3: `x=390-990, y=260-1340` (when face PiP is active). For standalone scenes: `x=120-960, y=250-1370`.
3. **Use `Sequence` for scene timing.** Each scene is a `<Sequence from={startFrame} durationInFrames={endFrame - startFrame}>`. Never hardcode frame numbers inside a scene component — use `D3_TIMELINE` or equivalent constants.
4. **Keep caption text in the safe zone.** `y >= 1400` and `bottom padding = 280px`. Use `BigCaption` with default positioning.
5. **Wire flow connectors after positioning.** Place `FlowWire`/`FlowCable`/`DoodleArrow` components last in the scene, after all positioned elements. Their SVG paths reference the coordinates of already-placed elements.

### The "drag and drop" workflow

1. Import `SceneShell` or `LayoutFrame` as your canvas
2. Choose components from the reference table above
3. Set `left`, `top` to position them in the main content zone
4. Set `delay` for staggered entrances (index-based for lists)
5. Wrap in `<Sequence>` with scene timing from your timeline
6. Wire connections between elements with `FlowWire`/`FlowCable`/`DoodleArrow`

This is the entire workflow. You should not be writing custom animated elements — every UI piece you need already exists.

### Code reduction checklist

Before writing a new component, ask:
- Can I use `PanelCard` with children instead of a custom card?
- Can I use `SystemWindow` or `FileEditorWindow` instead of a custom container?
- Can I use `SystemList` with `MetricRow` items instead of a custom list?
- Can I use `StickyNote` with different colors and rotations instead of a custom note?
- Can I use `FlowWire`/`FlowCable` with SVG path data instead of a custom connector?
- Can I use `SceneTitle` or `EditorialHeadline` instead of custom title layout?
- Can I use `StatusPill` or `StateChangeBadge` instead of a custom status indicator?

If the answer to any of these is yes, use the existing component.

### Remotion-specific rules

These apply on top of the general /remotion-best-practices:
- All components are pure functions of `useCurrentFrame()` — no async, no side effects, no `useState`/`useEffect` in scene code
- Use `spring()` for entrances, not raw `interpolate()` — springs handle easing naturally and look more polished
- Prefers `enterProgress()` helper pattern for consistent animation across scenes
- SVG connectors (`FlowWire`, `FlowCable`, `DoodleArrow`) use `pathLength=1` + `strokeDasharray="1"` + `strokeDashoffset` for draw animations
- Use `<Sequence>` for time-based composition, not conditional rendering with `frame > x`
- Scenes must be deterministic — same frame always produces the same render

### Phase selection guide

**Use Phase 2 (D3)** when:
- You need the SceneShell pattern (BoardCanvas + PipFrame + FaceBubbleSafeArea)
- You want EditorialHeadline for title blocks
- You need SystemList for grouped data
- You want BigCaption for bottom text
- You're working in an environment with the PiP talking-head overlay

**Use Phase 1** when:
- You need OS-window metaphors (SystemWindow, FileEditorWindow, AgentWindow)
- You want pipeline diagrams with PipelineNode + FlowCable
- You need memory/concept cards (MemoryRecord)
- You want animated cursor (CursorActor)
- StatusPill / StateChangeBadge for inline status
- You want LayoutFrame as a complete scene wrapper

**Mix and match freely** — both libraries share the same canvas dimensions (1080×1920), design language, and spring system. You can import from both in the same scene.
