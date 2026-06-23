import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS, fullFrame, safeFrame, SHADOWS} from '../style';
import {SAFE_ZONES} from '../timeline';
import {enterProgress as progressSpring, motionSprings} from '../../motion';

const BoardCanvasImpl: React.FC<{accent?: string; subtle?: boolean}> = ({
  accent = COLORS.blue,
  subtle = false,
}) => {
  const frame = useCurrentFrame();
  const glowX = Math.sin(frame / 90) * 60;
  const glowY = Math.cos(frame / 110) * 90;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.canvas,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            `radial-gradient(circle at ${180 + glowX}px ${210 + glowY}px, ${accent}16 0, transparent 24%)`,
            `radial-gradient(circle at ${860 - glowX}px ${1460 - glowY}px, ${COLORS.cyan}12 0, transparent 20%)`,
            'linear-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(148, 163, 184, 0.18) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: 'auto, auto, 44px 44px, 44px 44px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 96,
          width: 92,
          height: 18,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.72)',
          boxShadow: SHADOWS.sticker,
          transform: 'rotate(-10deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 42,
          top: 132,
          width: 84,
          height: 16,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.66)',
          boxShadow: SHADOWS.sticker,
          transform: 'rotate(12deg)',
        }}
      />
      {!subtle ? (
        <>
          <svg style={fullFrame} viewBox="0 0 1080 1920">
            <path
              d="M64 320 C118 286, 170 284, 218 334"
              fill="none"
              stroke="rgba(100, 116, 139, 0.22)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d="M878 310 C920 268, 980 266, 1016 324"
              fill="none"
              stroke="rgba(100, 116, 139, 0.18)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d="M914 1488 C944 1440, 1008 1432, 1024 1492"
              fill="none"
              stroke="rgba(100, 116, 139, 0.18)"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.3))',
            }}
          />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
export const BoardCanvas = React.memo(BoardCanvasImpl);

const FaceBubbleSafeAreaImpl: React.FC<{showGuide?: boolean}> = ({showGuide = false}) => {
  if (!showGuide) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: SAFE_ZONES.facePip.x,
          top: SAFE_ZONES.facePip.y,
          width: SAFE_ZONES.facePip.width,
          height: SAFE_ZONES.facePip.height,
          borderRadius: SAFE_ZONES.facePip.borderRadius,
          border: `3px dashed ${COLORS.red}`,
          background: 'rgba(255,255,255,0.25)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: SAFE_ZONES.pipAvoid.x,
          top: SAFE_ZONES.pipAvoid.y,
          width: SAFE_ZONES.pipAvoid.width,
          height: SAFE_ZONES.pipAvoid.height,
          border: `2px dashed rgba(220, 38, 38, 0.22)`,
          borderRadius: 36,
        }}
      />
    </>
  );
};
export const FaceBubbleSafeArea = React.memo(FaceBubbleSafeAreaImpl);

const PipFrameImpl: React.FC<{showGuide?: boolean}> = ({showGuide = false}) => {
  if (!showGuide) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE_ZONES.facePip.x,
        top: SAFE_ZONES.facePip.y,
        width: SAFE_ZONES.facePip.width,
        height: SAFE_ZONES.facePip.height,
        borderRadius: SAFE_ZONES.facePip.borderRadius,
        border: `3px solid ${COLORS.white}`,
        boxShadow: SHADOWS.panel,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${COLORS.border}`,
          borderRadius: SAFE_ZONES.facePip.borderRadius,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 20,
          top: -10,
          width: 58,
          height: 14,
          borderRadius: 999,
          background: 'rgba(241, 245, 249, 0.92)',
          transform: 'rotate(14deg)',
        }}
      />
    </div>
  );
};
export const PipFrame = React.memo(PipFrameImpl);

const EyebrowChipImpl: React.FC<{
  label: string;
  color?: string;
  left: number;
  top: number;
  delay?: number;
}> = ({label, color = COLORS.blue, left, top, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = progressSpring(frame, fps, delay, motionSprings.controlled);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        padding: '12px 18px',
        borderRadius: 999,
        background: `${color}12`,
        border: `2px solid ${color}44`,
        color,
        fontFamily: FONTS.mono,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transform: `translateY(${interpolate(enter, [0, 1], [18, 0])}px)`,
        opacity: enter,
      }}
    >
      {label}
    </div>
  );
};
export const EyebrowChip = React.memo(EyebrowChipImpl);

const EditorialHeadlineImpl: React.FC<{
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  left?: number;
  top?: number;
  maxWidth?: number;
  align?: React.CSSProperties['textAlign'];
  color?: string;
}> = ({title, subtitle, left = 120, top = 250, maxWidth = 840, align = 'left', color = COLORS.primaryText}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = progressSpring(frame, fps, 0, motionSprings.standard);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        maxWidth,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px) scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
        opacity: enter,
        textAlign: align,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 104,
          lineHeight: 0.94,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          color,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 24,
            maxWidth,
            fontFamily: FONTS.body,
            fontSize: 34,
            lineHeight: 1.22,
            fontWeight: 650,
            color: COLORS.mutedText,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
export const EditorialHeadline = React.memo(EditorialHeadlineImpl);

const PanelCardImpl: React.FC<{
  title?: React.ReactNode;
  eyebrow?: string;
  left: number;
  top: number;
  width: number;
  height?: number;
  delay?: number;
  accent?: string;
  children?: React.ReactNode;
}> = ({title, eyebrow, left, top, width, height, delay = 0, accent = COLORS.blue, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = progressSpring(frame, fps, delay, motionSprings.standard);
  const y = interpolate(enter, [0, 1], [42, 0], {easing: Easing.out(Easing.cubic)});

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        minHeight: height,
        padding: '28px 28px 30px',
        borderRadius: 30,
        background: COLORS.panel,
        border: `2px solid ${COLORS.border}`,
        boxShadow: SHADOWS.panel,
        transform: `translateY(${y}px)`,
        opacity: enter,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 10,
          height: '100%',
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          background: `linear-gradient(180deg, ${accent}, ${accent}66)`,
        }}
      />
      {eyebrow ? (
        <div
          style={{
            marginLeft: 14,
            marginBottom: 14,
            fontFamily: FONTS.mono,
            fontSize: 18,
            fontWeight: 700,
            color: accent,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <div
          style={{
            marginLeft: 14,
            marginBottom: children ? 18 : 0,
            fontFamily: FONTS.display,
            fontSize: 52,
            lineHeight: 0.98,
            fontWeight: 800,
            color: COLORS.primaryText,
          }}
        >
          {title}
        </div>
      ) : null}
      {children ? <div style={{marginLeft: 14}}>{children}</div> : null}
    </div>
  );
};
export const PanelCard = React.memo(PanelCardImpl);

const StickyNoteImpl: React.FC<{
  label: string;
  color: string;
  left: number;
  top: number;
  width?: number;
  delay?: number;
  rotation?: number;
  textColor?: string;
}> = ({label, color, left, top, width = 220, delay = 0, rotation = 0, textColor = COLORS.primaryText}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = progressSpring(frame, fps, delay, motionSprings.punchy);
  const scale = interpolate(enter, [0, 1], [0.82, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        padding: '18px 20px',
        borderRadius: 24,
        background: color,
        color: textColor,
        fontFamily: FONTS.body,
        fontSize: 30,
        fontWeight: 800,
        lineHeight: 1.08,
        border: `2px solid ${COLORS.primaryText}`,
        boxShadow: SHADOWS.sticker,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity: enter,
      }}
    >
      {label}
    </div>
  );
};
export const StickyNote = React.memo(StickyNoteImpl);

const MetricRowImpl: React.FC<{
  label: string;
  value: string;
  color?: string;
  delay?: number;
}> = ({label, value, color = COLORS.blue, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = progressSpring(frame, fps, delay, motionSprings.controlled);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        padding: '16px 18px',
        borderRadius: 18,
        background: COLORS.secondaryPanel,
        border: `1px solid ${COLORS.border}`,
        marginBottom: 14,
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [18, 0])}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 0 6px ${color}18`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.primaryText,
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.mutedText,
        }}
      >
        {value}
      </span>
    </div>
  );
};
export const MetricRow = React.memo(MetricRowImpl);

const FlowWireImpl: React.FC<{
  d: string;
  color?: string;
  delay?: number;
  width?: number;
}> = ({d, color = COLORS.cyan, delay = 0, width = 6}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [delay, delay + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dashOffset = interpolate(frame, [delay, delay + 45], [0, -54], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg style={fullFrame} viewBox="0 0 1080 1920">
      <path
        d={d}
        fill="none"
        stroke={`${color}25`}
        strokeWidth={width + 6}
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - draw}
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="12 14"
        strokeDashoffset={dashOffset}
        opacity={draw}
      />
    </svg>
  );
};
export const FlowWire = React.memo(FlowWireImpl);

const DoodleArrowImpl: React.FC<{
  d: string;
  color?: string;
  delay?: number;
}> = ({d, color = COLORS.orange, delay = 0}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg style={fullFrame} viewBox="0 0 1080 1920">
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
};
export const DoodleArrow = React.memo(DoodleArrowImpl);

const TerminalCardImpl: React.FC<{
  title?: string;
  code: string[];
  left: number;
  top: number;
  width?: number;
  height?: number;
  delay?: number;
}> = ({title = 'memory.query()', code, left, top, width = 540, height, delay = 0}) => {
  const frame = useCurrentFrame();
  const visibleCount = Math.max(1, Math.floor((frame - delay) / 5));
  const visibleLines = code.slice(0, Math.min(code.length, visibleCount));
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        minHeight: height,
        borderRadius: 28,
        overflow: 'hidden',
        background: '#0F172A',
        boxShadow: SHADOWS.floating,
        border: '1px solid rgba(148, 163, 184, 0.32)',
        opacity,
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(148, 163, 184, 0.14)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: FONTS.mono,
          fontSize: 18,
          color: '#CBD5E1',
        }}
      >
        <span style={{width: 10, height: 10, borderRadius: 999, background: '#F87171'}} />
        <span style={{width: 10, height: 10, borderRadius: 999, background: '#FBBF24'}} />
        <span style={{width: 10, height: 10, borderRadius: 999, background: '#34D399'}} />
        <span style={{marginLeft: 4}}>{title}</span>
      </div>
      <div
        style={{
          padding: '20px 24px 26px',
          fontFamily: FONTS.mono,
          fontSize: 24,
          lineHeight: 1.5,
          color: '#E2E8F0',
          whiteSpace: 'pre-wrap',
        }}
      >
        {visibleLines.join('\n')}
        <span style={{opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0}}>|</span>
      </div>
    </div>
  );
};
export const TerminalCard = React.memo(TerminalCardImpl);

const BigCaptionImpl: React.FC<{
  children: React.ReactNode;
  top?: number;
  maxWidth?: number;
}> = ({children, top = 1460, maxWidth = 820}) => {
  const {bottom: _unused, ...safeLayout} = safeFrame;
  return (
    <div
      style={{
        ...safeLayout,
        top,
        bottom: 'auto',
        maxWidth,
        fontFamily: FONTS.body,
        fontSize: 48,
        fontWeight: 800,
        lineHeight: 1.08,
        color: COLORS.primaryText,
      }}
    >
      {children}
    </div>
  );
};
export const BigCaption = React.memo(BigCaptionImpl);

const SystemListImpl: React.FC<{
  items: Array<{label: string; detail: string; color: string}>;
  left: number;
  top: number;
  width: number;
  delay?: number;
}> = ({items, left, top, width, delay = 0}) => {
  return (
    <PanelCard left={left} top={top} width={width} accent={items[0]?.color ?? COLORS.blue}>
      {items.map((item, index) => (
        <MetricRow
          key={item.label}
          label={item.label}
          value={item.detail}
          color={item.color}
          delay={delay + index * 6}
        />
      ))}
    </PanelCard>
  );
};
export const SystemList = React.memo(SystemListImpl);
