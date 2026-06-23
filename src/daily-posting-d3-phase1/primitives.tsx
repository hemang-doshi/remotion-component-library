import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, D3P1_HEIGHT, D3P1_SAFE, D3P1_WIDTH, fonts, radii, shadows, spacing} from './tokens';
import {enterProgress, motionSprings} from '../motion';

type Accent = keyof Pick<typeof colors, 'blue' | 'cyan' | 'green' | 'yellow' | 'pink' | 'purple' | 'orange' | 'red'>;

const accentShadowMap: Record<Accent, string> = {
  blue: shadows.accentBlue,
  cyan: shadows.accentBlue,
  green: shadows.accentGreen,
  yellow: shadows.panel,
  pink: shadows.panel,
  purple: shadows.accentPurple,
  orange: shadows.panel,
  red: shadows.panel,
};

const getAccent = (accent: Accent | string) => (accent in colors ? colors[accent as keyof typeof colors] : accent);

const cardBase: React.CSSProperties = {
  background: colors.panel,
  border: `2px solid ${colors.border}`,
  boxShadow: shadows.panel,
};

const BoardCanvasImpl: React.FC<{accent?: string}> = ({accent = colors.blue}) => {
  const frame = useCurrentFrame();
  const glowX = Math.sin(frame / 90) * 70;
  const glowY = Math.cos(frame / 110) * 90;

  return (
    <AbsoluteFill style={{background: colors.canvas, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            `radial-gradient(circle at ${180 + glowX}px ${220 + glowY}px, ${accent}14 0, transparent 24%)`,
            `radial-gradient(circle at ${840 - glowX}px ${1510 - glowY}px, ${colors.cyan}10 0, transparent 20%)`,
            'linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: 'auto, auto, 44px 44px, 44px 44px',
        }}
      />
      <svg style={{position: 'absolute', inset: 0, width: D3P1_WIDTH, height: D3P1_HEIGHT}} viewBox="0 0 1080 1920">
        <path d="M68 320 C122 280, 172 282, 220 336" fill="none" stroke="rgba(100, 116, 139, 0.2)" strokeWidth={4} strokeLinecap="round" />
        <path d="M878 310 C920 270, 980 270, 1012 330" fill="none" stroke="rgba(100, 116, 139, 0.18)" strokeWidth={4} strokeLinecap="round" />
        <path d="M912 1498 C946 1448, 1006 1440, 1024 1494" fill="none" stroke="rgba(100, 116, 139, 0.18)" strokeWidth={4} strokeLinecap="round" />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 94,
          width: 96,
          height: 18,
          borderRadius: radii.pill,
          background: 'rgba(255,255,255,0.72)',
          boxShadow: shadows.sticker,
          transform: 'rotate(-10deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 136,
          width: 84,
          height: 16,
          borderRadius: radii.pill,
          background: 'rgba(255,255,255,0.66)',
          boxShadow: shadows.sticker,
          transform: 'rotate(12deg)',
        }}
      />
    </AbsoluteFill>
  );
};
export const BoardCanvas = React.memo(BoardCanvasImpl);

const SceneTitleImpl: React.FC<{
  label: string;
  title: string;
  subtitle: string;
  accent?: Accent;
  left?: number;
  top?: number;
  delay?: number;
}> = ({label, title, subtitle, accent = 'blue', left = 98, top = 122, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.standard);
  const color = getAccent(accent);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 620,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [26, 0])}px) scale(${interpolate(progress, [0, 1], [0.98, 1])})`,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '12px 18px',
          borderRadius: radii.pill,
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color,
          border: `2px solid ${color}44`,
          background: `${color}12`,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: fonts.sans,
          fontSize: 80,
          lineHeight: 0.96,
          letterSpacing: '-0.05em',
          fontWeight: 850,
          color: colors.primaryText,
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 20,
          maxWidth: 590,
          fontFamily: fonts.sans,
          fontSize: 30,
          lineHeight: 1.24,
          fontWeight: 650,
          color: colors.mutedText,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
export const SceneTitle = React.memo(SceneTitleImpl);

const StatusPillImpl: React.FC<{label: string; accent?: Accent; delay?: number}> = ({label, accent = 'green', delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.controlled, 18);
  const color = getAccent(accent);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: radii.pill,
        border: `1px solid ${color}44`,
        background: `${color}12`,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [10, 0])}px)`,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: radii.pill,
          background: color,
          boxShadow: `0 0 0 6px ${color}18`,
        }}
      />
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          fontWeight: 700,
          color,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};
export const StatusPill = React.memo(StatusPillImpl);

const StateChangeBadgeImpl: React.FC<{from: string; to: string; accent?: Accent; delay?: number}> = ({
  from,
  to,
  accent = 'yellow',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.punchy, 20);
  const color = getAccent(accent);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 18px',
        borderRadius: 18,
        border: `2px solid ${color}3a`,
        background: colors.panel,
        boxShadow: accentShadowMap[accent],
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.88, 1])}) rotate(${interpolate(progress, [0, 1], [-6, 0])}deg)`,
      }}
    >
      <span style={{fontFamily: fonts.mono, fontWeight: 700, fontSize: 20, color: colors.mutedText}}>{from}</span>
      <span style={{fontFamily: fonts.mono, fontWeight: 800, fontSize: 24, color}}>→</span>
      <span style={{fontFamily: fonts.mono, fontWeight: 700, fontSize: 20, color: colors.primaryText}}>{to}</span>
    </div>
  );
};
export const StateChangeBadge = React.memo(StateChangeBadgeImpl);

const SystemWindowImpl: React.FC<{
  title: string;
  accent?: Accent;
  left: number;
  top: number;
  width: number;
  height: number;
  delay?: number;
  children?: React.ReactNode;
}> = ({title, accent = 'blue', left, top, width, height, delay = 0, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.standard, 24);
  const color = getAccent(accent);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        borderRadius: radii.xxl,
        overflow: 'hidden',
        ...cardBase,
        boxShadow: accentShadowMap[accent],
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [46, 0], {easing: Easing.out(Easing.cubic)})}px) scale(${interpolate(progress, [0, 1], [0.96, 1])})`,
      }}
    >
      <div
        style={{
          height: 66,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 22px',
          background: colors.secondaryPanel,
          borderBottom: `1px solid ${colors.softBorder}`,
        }}
      >
        <div style={{display: 'flex', gap: 10}}>
          {['#FB7185', '#F59E0B', '#22C55E'].map((dot) => (
            <span key={dot} style={{width: 12, height: 12, borderRadius: radii.pill, background: dot}} />
          ))}
        </div>
        <div style={{fontFamily: fonts.mono, fontWeight: 700, fontSize: 18, color: colors.mutedText}}>{title}</div>
        <StatusPill label="synced" accent={accent} delay={delay + 8} />
      </div>
      <div style={{position: 'absolute', inset: '66px 0 0 0', padding: 22}}>{children}</div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 10,
          height: '100%',
          background: `linear-gradient(180deg, ${color}, ${color}55)`,
        }}
      />
    </div>
  );
};
export const SystemWindow = React.memo(SystemWindowImpl);

const FileEditorWindowImpl: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  filename: string;
  lines: Array<{number: number; text: string; accent?: Accent}>;
  delay?: number;
}> = ({left, top, width, height, filename, lines, delay = 0}) => {
  return (
    <SystemWindow title={filename} accent="blue" left={left} top={top} width={width} height={height} delay={delay}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '62px 1fr',
          gap: 12,
          fontFamily: fonts.mono,
          fontSize: 22,
          lineHeight: 1.55,
        }}
      >
        {lines.map((line, index) => (
          <React.Fragment key={`${filename}-${line.number}`}>
            <div style={{color: colors.mutedText, textAlign: 'right', opacity: 0.9}}>{line.number}</div>
            <div style={{color: line.accent ? getAccent(line.accent) : colors.primaryText}}>
              {line.text}
              {index === lines.length - 1 ? (
                <span
                  style={{
                    display: 'inline-block',
                    width: 12,
                    height: 24,
                    background: colors.primaryText,
                    marginLeft: 8,
                    verticalAlign: 'middle',
                    opacity: 0.8,
                  }}
                />
              ) : null}
            </div>
          </React.Fragment>
        ))}
      </div>
    </SystemWindow>
  );
};
export const FileEditorWindow = React.memo(FileEditorWindowImpl);

const AgentWindowImpl: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  title?: string;
  delay?: number;
}> = ({left, top, width, height, title = 'Agent Plan', delay = 0}) => {
  const items = [
    {label: 'Load repo instructions', accent: 'blue' as const},
    {label: 'Check memory.lookup()', accent: 'purple' as const},
    {label: 'Preserve prior correction', accent: 'green' as const},
  ];

  return (
    <SystemWindow title={title} accent="purple" left={left} top={top} width={width} height={height} delay={delay}>
      <div style={{display: 'grid', gap: 14}}>
        {items.map((item, index) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 18px',
              borderRadius: 18,
              background: colors.secondaryPanel,
              border: `1px solid ${colors.softBorder}`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: radii.pill,
                  background: getAccent(item.accent),
                }}
              />
              <span style={{fontFamily: fonts.sans, fontWeight: 750, fontSize: 23, color: colors.primaryText}}>{item.label}</span>
            </div>
            <StatusPill label={index === 1 ? 'running' : 'ready'} accent={index === 1 ? 'yellow' : item.accent} delay={delay + 6 + index * 4} />
          </div>
        ))}
      </div>
    </SystemWindow>
  );
};
export const AgentWindow = React.memo(AgentWindowImpl);

const PipelineNodeImpl: React.FC<{
  label: string;
  sublabel: string;
  accent?: Accent;
  left: number;
  top: number;
  width?: number;
  delay?: number;
}> = ({label, sublabel, accent = 'cyan', left, top, width = 220, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.controlled, 20);
  const color = getAccent(accent);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        padding: '20px 20px 18px',
        borderRadius: 22,
        background: colors.panel,
        border: `2px solid ${color}38`,
        boxShadow: accentShadowMap[accent],
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
      }}
    >
      <div style={{fontFamily: fonts.sans, fontSize: 28, fontWeight: 800, color: colors.primaryText}}>{label}</div>
      <div style={{marginTop: 8, fontFamily: fonts.mono, fontSize: 18, fontWeight: 700, color}}>{sublabel}</div>
    </div>
  );
};
export const PipelineNode = React.memo(PipelineNodeImpl);

const MemoryRecordImpl: React.FC<{
  title: string;
  detail: string;
  accent?: Accent;
  left: number;
  top: number;
  width?: number;
  delay?: number;
}> = ({title, detail, accent = 'green', left, top, width = 280, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.punchy, 22);
  const color = getAccent(accent);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        padding: '18px 18px 20px',
        borderRadius: 24,
        background: colors.white,
        border: `2px solid ${colors.primaryText}`,
        boxShadow: shadows.sticker,
        transform: `rotate(${interpolate(progress, [0, 1], [-8, -2])}deg) scale(${interpolate(progress, [0, 1], [0.86, 1])})`,
        opacity: progress,
      }}
    >
      <div style={{fontFamily: fonts.mono, fontSize: 18, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em'}}>
        memory record
      </div>
      <div style={{marginTop: 10, fontFamily: fonts.sans, fontSize: 28, lineHeight: 1.04, fontWeight: 800, color: colors.primaryText}}>{title}</div>
      <div style={{marginTop: 10, fontFamily: fonts.sans, fontSize: 20, lineHeight: 1.28, fontWeight: 650, color: colors.mutedText}}>{detail}</div>
    </div>
  );
};
export const MemoryRecord = React.memo(MemoryRecordImpl);

const RequirementDocumentImpl: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  delay?: number;
}> = ({left, top, width, height, delay = 0}) => {
  const bullets = ['Preserve repo rules across sessions', 'Prefer prior correction over repeating drift', 'Keep output readable above caption zone'];

  return (
    <SystemWindow title="Requirement Analysis" accent="orange" left={left} top={top} width={width} height={height} delay={delay}>
      <div style={{display: 'grid', gap: 14}}>
        {bullets.map((bullet, index) => (
          <div
            key={bullet}
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: 14,
              alignItems: 'start',
              padding: '6px 0',
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: radii.pill, background: index === 2 ? colors.yellow : colors.orange, marginTop: 10}} />
            <div style={{fontFamily: fonts.sans, fontSize: 25, lineHeight: 1.28, fontWeight: 700, color: colors.primaryText}}>{bullet}</div>
          </div>
        ))}
      </div>
    </SystemWindow>
  );
};
export const RequirementDocument = React.memo(RequirementDocumentImpl);

const CodeDiffCardImpl: React.FC<{
  left: number;
  top: number;
  width: number;
  delay?: number;
}> = ({left, top, width, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = enterProgress(frame, fps, delay, motionSprings.controlled, 20);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        padding: 22,
        borderRadius: 24,
        ...cardBase,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [16, 0])}px)`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{fontFamily: fonts.mono, fontSize: 20, fontWeight: 800, color: colors.primaryText}}>CodeDiffCard</div>
        <StatusPill label="+ memory.lookup()" accent="green" delay={delay + 4} />
      </div>
      <div style={{marginTop: 16, display: 'grid', gap: 10, fontFamily: fonts.mono, fontSize: 20}}>
        <div style={{color: colors.red}}>- repeated prompt restatement</div>
        <div style={{color: colors.green}}>+ load prior failed attempt</div>
        <div style={{color: colors.green}}>+ inject repo-specific preference pack</div>
      </div>
    </div>
  );
};
export const CodeDiffCard = React.memo(CodeDiffCardImpl);

const StorageModuleCardImpl: React.FC<{
  left: number;
  top: number;
  width: number;
  delay?: number;
}> = ({left, top, width, delay = 0}) => (
  <SystemWindow title="Memory Layer" accent="green" left={left} top={top} width={width} height={230} delay={delay}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14}}>
      {[
        ['Preferences', colors.green],
        ['Decisions', colors.orange],
        ['Mistakes', colors.pink],
      ].map(([label, color]) => (
        <div
          key={label}
          style={{
            padding: '24px 16px',
            borderRadius: 20,
            border: `1px solid ${color}44`,
            background: `${color}12`,
            textAlign: 'center',
          }}
        >
          <div style={{fontFamily: fonts.sans, fontSize: 24, fontWeight: 800, color: colors.primaryText}}>{label}</div>
        </div>
      ))}
    </div>
  </SystemWindow>
);
export const StorageModuleCard = React.memo(StorageModuleCardImpl);

const FlowCableImpl: React.FC<{
  points?: Array<[number, number]>;
  d?: string;
  accent?: Accent;
  delay?: number;
  progress?: number;
  color?: string;
}> = ({points, d: customD, accent = 'cyan', delay = 0, progress: externalProgress, color: explicitColor}) => {
  const frame = useCurrentFrame();
  const progress = externalProgress ?? interpolate(frame, [delay, delay + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dashMotion = interpolate(frame, [delay, delay + 40], [0, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const color = explicitColor ?? getAccent(accent);
  const d =
    customD ??
    (points?.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`).join(' ') ?? '');

  return (
    <svg style={{position: 'absolute', inset: 0, width: D3P1_WIDTH, height: D3P1_HEIGHT, pointerEvents: 'none'}} viewBox="0 0 1080 1920">
      <path d={d} fill="none" stroke={`${color}24`} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} />
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 16" strokeDashoffset={dashMotion} opacity={progress} />
    </svg>
  );
};
export const FlowCable = React.memo(FlowCableImpl);

const CursorActorImpl: React.FC<{
  from: [number, number];
  to: [number, number];
  startFrame: number;
  endFrame: number;
  dragging?: boolean;
}> = ({from, to, startFrame, endFrame, dragging = false}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const x = interpolate(progress, [0, 1], [from[0], to[0]]);
  const y = interpolate(progress, [0, 1], [from[1], to[1]]);
  const press = dragging ? interpolate(progress, [0, 0.08, 1], [1, 0.92, 1]) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${press})`,
      }}
    >
      <svg width="46" height="58" viewBox="0 0 46 58">
        <path
          d="M6 4 L36 29 L23 31 L30 52 L22 55 L15 34 L6 43 Z"
          fill={colors.primaryText}
          stroke={colors.white}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export const CursorActor = React.memo(CursorActorImpl);

const CaptionSafeGuideImpl: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: D3P1_SAFE.edge,
      right: D3P1_SAFE.edge,
      top: D3P1_SAFE.captionSafeTop,
      bottom: D3P1_SAFE.bottom,
      border: `2px dashed rgba(220, 38, 38, 0.18)`,
      borderRadius: 28,
      pointerEvents: 'none',
    }}
  />
);
export const CaptionSafeGuide = React.memo(CaptionSafeGuideImpl);

const NotebookTapeImpl: React.FC<{left: number; top: number; rotate?: number}> = ({left, top, rotate = 0}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 94,
      height: 18,
      borderRadius: radii.pill,
      background: 'rgba(255,255,255,0.74)',
      boxShadow: shadows.sticker,
      transform: `rotate(${rotate}deg)`,
    }}
  />
);
export const NotebookTape = React.memo(NotebookTapeImpl);

const LayoutFrameImpl: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill>
    <BoardCanvas />
    <CaptionSafeGuide />
    <NotebookTape left={176} top={676} rotate={-8} />
    <NotebookTape left={858} top={720} rotate={12} />
    {children}
  </AbsoluteFill>
);
export const LayoutFrame = React.memo(LayoutFrameImpl);
