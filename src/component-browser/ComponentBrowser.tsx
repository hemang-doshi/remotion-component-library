import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {COLORS, FONTS} from '../daily-posting-d3/style';
import {
  BigCaption,
  BoardCanvas as D3BoardCanvas,
  DoodleArrow,
  EditorialHeadline,
  EyebrowChip,
  FaceBubbleSafeArea,
  FlowWire,
  MetricRow,
  PanelCard,
  PipFrame,
  StickyNote,
  SystemList,
  TerminalCard,
} from '../daily-posting-d3/components/BoardPrimitives';
import {
  AgentWindow,
  BoardCanvas as P1BoardCanvas,
  CaptionSafeGuide,
  CodeDiffCard,
  CursorActor,
  FileEditorWindow,
  FlowCable,
  LayoutFrame,
  MemoryRecord,
  NotebookTape,
  PipelineNode,
  RequirementDocument,
  SceneTitle,
  StateChangeBadge,
  StatusPill,
  StorageModuleCard,
  SystemWindow,
} from '../daily-posting-d3-phase1/primitives';

// ─── Component catalog entry ────────────────────────────────────────
interface ComponentEntry {
  component: React.ComponentType<any>;
  props: Record<string, unknown>;
  name: string;
  desc: string;
  source: 'D3' | 'P1';
}

// ─── Card preview ──────────────────────────────────────────────────
const CARD_W = 480;
const CARD_PREVIEW_H = 360;
const SCALE = CARD_W / 1080;

const Card: React.FC<{
  name: string;
  source: 'D3' | 'P1';
  children: React.ReactNode;
}> = ({name, source, children}) => (
  <div
    style={{
      position: 'absolute',
      width: CARD_W,
      height: CARD_PREVIEW_H + 64,
      borderRadius: 18,
      background: '#FFFFFF',
      border: '1.5px solid rgba(15,23,42,0.10)',
      boxShadow: '0 6px 20px rgba(15,23,42,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        background: '#F8FAFC',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{
        padding: '10px 16px 12px',
        borderTop: '1px solid rgba(15,23,42,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 18,
          fontWeight: 800,
          color: COLORS.primaryText,
          letterSpacing: '-0.02em',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 13,
          fontWeight: 700,
          color: source === 'D3' ? COLORS.blue : COLORS.purple,
          padding: '3px 10px',
          borderRadius: 999,
          background: source === 'D3' ? `${COLORS.blue}12` : `${COLORS.purple}12`,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {source === 'D3' ? 'Phase 2' : 'Phase 1'}
      </div>
    </div>
  </div>
);

// ─── Page layout ───────────────────────────────────────────────────
const GAP = 16;
const COLS = 2;
const ROWS = 3;
const PAGE_X = (1080 - (COLS * CARD_W + (COLS - 1) * GAP)) / 2;
const PAGE_Y = 160;

// ─── Highlight colors for DEMO ─────────────────────────────────────
const C = {
  blue: '#0284C7',
  cyan: '#0EA5E9',
  green: '#10B981',
  orange: '#EA580C',
  pink: '#E11D48',
  purple: '#7C3AED',
  red: '#DC2626',
  yellow: '#D97706',
};

// ─── Demo SVG paths ────────────────────────────────────────────────
const DEMO_WIRE_D = 'M60 220 C160 80, 200 360, 300 140';
const DEMO_ARROW_D = 'M40 300 C120 200, 160 380, 280 240';

// ─── Category definitions ──────────────────────────────────────────
const CATEGORIES: Array<{
  id: string;
  name: string;
  accent: string;
  entries: ComponentEntry[];
}> = [
  {
    id: 'layout',
    name: 'Layout & Canvas',
    accent: C.blue,
    entries: [
      {name: 'BoardCanvas', source: 'D3', desc: 'Canvas bg with animated glow', component: D3BoardCanvas, props: {accent: C.blue}},
      {name: 'BoardCanvas (P1)', source: 'P1', desc: 'Phase 1 canvas variant', component: P1BoardCanvas, props: {accent: C.cyan}},
      {name: 'FaceBubbleSafeArea', source: 'D3', desc: 'Red dashed face-pip guide', component: FaceBubbleSafeArea, props: {showGuide: true}},
      {name: 'PipFrame', source: 'D3', desc: 'White glass PiP frame', component: PipFrame, props: {showGuide: true}},
      {name: 'CaptionSafeGuide', source: 'P1', desc: 'Caption safe-zone border', component: CaptionSafeGuide, props: {}},
      {name: 'LayoutFrame', source: 'P1', desc: 'Canvas + guide + tape wrapper', component: LayoutFrame, props: {}},
    ],
  },
  {
    id: 'text',
    name: 'Text & Typography',
    accent: C.purple,
    entries: [
      {name: 'EyebrowChip', source: 'D3', desc: 'Mono uppercase label with border', component: EyebrowChip, props: {label: 'Hello World', color: C.blue, left: 20, top: 20}},
      {name: 'EditorialHeadline', source: 'D3', desc: 'Title + subtitle spring entrance', component: EditorialHeadline, props: {title: 'Component\nTitle', subtitle: 'Subtitle text for this demo', left: 20, top: 40, maxWidth: 500}},
      {name: 'SceneTitle', source: 'P1', desc: 'Eyebrow + title + subtitle block', component: SceneTitle, props: {label: 'Demo', title: 'Scene Title', subtitle: 'Descriptive subtitle for this component', left: 20, top: 40}},
      {name: 'StatusPill', source: 'P1', desc: 'Colored dot status badge', component: StatusPill, props: {label: 'Active'}},
      {name: 'StateChangeBadge', source: 'P1', desc: 'From→to animated state badge', component: StateChangeBadge, props: {from: 'running', to: 'verified', delay: 8}},
      {name: 'BigCaption', source: 'D3', desc: 'Bottom-safe caption text', component: BigCaption, props: {children: 'Big caption text positioned at safe zone', top: 80}},
    ],
  },
  {
    id: 'cards',
    name: 'Cards & Windows',
    accent: C.green,
    entries: [
      {name: 'PanelCard', source: 'D3', desc: 'Rounded card with accent bar', component: PanelCard, props: {left: 20, top: 20, width: 280, eyebrow: 'INFO', title: 'Card Title', children: <div style={{fontFamily: FONTS.body, fontSize: 24, color: COLORS.mutedText}}>Card content area</div>}},
      {name: 'StickyNote', source: 'D3', desc: 'Colored note with rotation', component: StickyNote, props: {label: 'Sticky Note', color: '#DCFCE7', left: 20, top: 20, rotation: -3, textColor: COLORS.primaryText}},
      {name: 'SystemWindow', source: 'P1', desc: 'macOS-window container', component: SystemWindow, props: {title: 'Window Title', accent: 'blue' as any, left: 20, top: 20, width: 280, height: 200, children: <div style={{fontFamily: FONTS.body, fontSize: 22, color: COLORS.primaryText}}>Content area</div>}},
      {name: 'FileEditorWindow', source: 'P1', desc: 'VS Code-style editor', component: FileEditorWindow, props: {filename: 'index.ts', left: 20, top: 20, width: 280, height: 200, lines: [{number: 1, text: 'const msg = "hello"', accent: 'blue' as any}, {number: 2, text: 'export default msg'}], delay: 0}},
      {name: 'AgentWindow', source: 'P1', desc: 'Agent plan panel window', component: AgentWindow, props: {left: 20, top: 20, width: 280, height: 240}},
      {name: 'PipelineNode', source: 'P1', desc: 'Step card with accent color', component: PipelineNode, props: {label: 'Step 1', sublabel: 'processing', accent: 'cyan' as any, left: 20, top: 20}},
    ],
  },
  {
    id: 'data',
    name: 'Data & Composites',
    accent: C.orange,
    entries: [
      {name: 'MemoryRecord', source: 'P1', desc: 'Sticky-note record card', component: MemoryRecord, props: {title: 'Preference', detail: 'Use minimal diffs', left: 20, top: 20}},
      {name: 'MetricRow', source: 'D3', desc: 'Label + value row with dot', component: MetricRow, props: {label: 'Requests', value: '1,234', color: C.green}},
      {name: 'SystemList', source: 'D3', desc: 'PanelCard + MetricRows', component: SystemList, props: {left: 20, top: 20, width: 280, delay: 0, items: [{label: 'Memory', detail: '64 GB', color: C.cyan}, {label: 'Storage', detail: '512 GB', color: C.green}, {label: 'Network', detail: '1 Gbps', color: C.blue}]}},
      {name: 'CodeDiffCard', source: 'P1', desc: 'Code diff insert/delete', component: CodeDiffCard, props: {left: 20, top: 20, width: 280}},
      {name: 'StorageModuleCard', source: 'P1', desc: '3-col storage categories', component: StorageModuleCard, props: {left: 20, top: 20, width: 280}},
      {name: 'RequirementDocument', source: 'P1', desc: 'Requirement bullets', component: RequirementDocument, props: {left: 20, top: 20, width: 280, height: 200}},
    ],
  },
  {
    id: 'svg',
    name: 'SVG & Terminal',
    accent: C.pink,
    entries: [
      {name: 'FlowCable', source: 'P1', desc: 'Animated SVG connector line', component: FlowCable, props: {points: [[20, 60], [140, 120], [260, 60]] as Array<[number, number]>, accent: 'cyan' as any}},
      {name: 'FlowWire', source: 'D3', desc: '3-layer glow SVG wire', component: FlowWire, props: {d: DEMO_WIRE_D, color: C.cyan}},
      {name: 'DoodleArrow', source: 'D3', desc: 'Hand-drawn SVG arrow', component: DoodleArrow, props: {d: DEMO_ARROW_D, color: C.orange}},
      {name: 'CursorActor', source: 'P1', desc: 'Animated cursor SVG', component: CursorActor, props: {from: [20, 20] as [number, number], to: [180, 80] as [number, number], startFrame: 0, endFrame: 30, dragging: true}},
      {name: 'NotebookTape', source: 'P1', desc: 'Decorative tape strip', component: NotebookTape, props: {left: 80, top: 80, rotate: -8}},
      {name: 'TerminalCard', source: 'D3', desc: 'Terminal with typewriter lines', component: TerminalCard, props: {code: ['memory.query({', '  task: "demo"', '})'], left: 20, top: 20, width: 280}},
    ],
  },
];

// ─── Caption per page ──────────────────────────────────────────────
const CAPTION_FRAMES_PER_ENTRY = 36;

const PageCaption: React.FC<{
  entries: ComponentEntry[];
  accent: string;
  pageFrame: number;
}> = ({entries, accent, pageFrame}) => {
  const activeIndex = Math.min(
    Math.floor(pageFrame / CAPTION_FRAMES_PER_ENTRY),
    entries.length - 1,
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 280,
        textAlign: 'center',
      }}
    >
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 18px'}}>
        {entries.map((entry, i) => {
          const entryStart = i * CAPTION_FRAMES_PER_ENTRY;
          const relFrame = pageFrame - entryStart;
          const isActive = i === activeIndex;
          const opacity = isActive
            ? 1
            : Math.min(1, interpolate(relFrame, [-6, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
          const y = isActive ? 0 : interpolate(relFrame, [-6, 0], [3, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const scale = isActive ? 1 : 0.98;

          return (
            <span
              key={entry.name}
              style={{
                display: 'inline-block',
                fontFamily: FONTS.body,
                fontSize: 46,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                transform: `translateY(${y}px) scale(${scale})`,
                opacity,
                textShadow: isActive
                  ? `0 1px 4px rgba(0,0,0,0.3), 0 0 20px ${accent}55, 0 3px 12px rgba(0,0,0,0.25)`
                  : '0 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              {entry.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ─── Component Browser ─────────────────────────────────────────────
const FRAMES_PER_PAGE = 240;

export const ComponentBrowser: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.canvas}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'linear-gradient(rgba(148, 163, 184, 0.10) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(148, 163, 184, 0.10) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '44px 44px, 44px 44px',
        }}
      />

      {CATEGORIES.map((category, pageIndex) => {
        const pageFrame = frame - pageIndex * FRAMES_PER_PAGE;
        const isActive = pageFrame >= 0 && pageFrame < FRAMES_PER_PAGE;

        return (
          <div
            key={category.id}
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
          <Sequence
            from={pageIndex * FRAMES_PER_PAGE}
            durationInFrames={FRAMES_PER_PAGE}
          >
            {/* Header */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 36,
                width: 1080,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 44,
                  fontWeight: 800,
                  color: COLORS.primaryText,
                  letterSpacing: '-0.04em',
                }}
              >
                Component Library
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: category.accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {category.name}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.mutedText,
                }}
              >
                {pageIndex + 1} / {CATEGORIES.length}
              </div>
            </div>

            {/* Grid of cards */}
            {category.entries.map((entry, index) => {
              const col = index % COLS;
              const row = Math.floor(index / COLS);
              const x = PAGE_X + col * (CARD_W + GAP);
              const y = PAGE_Y + row * (CARD_PREVIEW_H + 64 + GAP);

              return (
                <div
                  key={entry.name}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                  }}
                >
                  <Card name={entry.name} source={entry.source}>
                    <entry.component {...entry.props} />
                  </Card>
                </div>
              );
            })}

            {/* Caption strip */}
            <PageCaption entries={category.entries} accent={category.accent} pageFrame={pageFrame} />
          </Sequence>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
