// ─── SVG Primitives ──────────────────────────────────────────────────────────
// Svg and G get className support (they accept full Style objects).
// Shape components (Path, Rect, Circle, etc.) and gradient/defs components
// are re-exported as-is — they use SVGPresentationAttributes which are
// set via props (fill, stroke, etc.), not CSS classes.

import React from "react";
import {
  Svg as RPSvg,
  G as RPG,
  Path,
  Rect,
  Circle,
  Ellipse,
  Line,
  Polyline,
  Polygon,
  Text as RPSvgText,
  Tspan,
  Defs,
  ClipPath,
  Stop,
  LinearGradient,
  RadialGradient,
  type SVGProps,
  type GProps,
  type SVGTextProps,
} from "@react-pdf/renderer";
import { useTw } from "./tailwind";

// ─── Helper: merge className (tw) + style ────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useStyles(className?: string, style?: object | object[]): any {
  const tw = useTw();
  const twStyle = className ? tw(className) : undefined;
  const styleArr = Array.isArray(style) ? style : style ? [style] : [];
  return twStyle ? [twStyle, ...styleArr] : styleArr.length ? styleArr : undefined;
}

// ─── Svg ─────────────────────────────────────────────────────────────────────

export interface PDFSvgProps extends Omit<SVGProps, "style"> {
  children?: React.ReactNode;
  className?: string;
  style?: object | object[];
}

export function Svg({ className, style, ...props }: PDFSvgProps) {
  const merged = useStyles(className, style);
  return <RPSvg style={merged} {...props} />;
}

// ─── G (Group) ───────────────────────────────────────────────────────────────

export interface PDFGProps extends Omit<GProps, "style"> {
  children?: React.ReactNode;
  className?: string;
  style?: object | object[];
}

export function G({ className, style, ...props }: PDFGProps) {
  const merged = useStyles(className, style);
  return <RPG style={merged} {...props} />;
}

// ─── SvgText ─────────────────────────────────────────────────────────────────

export interface PDFSvgTextProps extends Omit<SVGTextProps, "style"> {
  children?: React.ReactNode;
  className?: string;
  style?: object | object[];
}

export function SvgText({ className, style, ...props }: PDFSvgTextProps) {
  const merged = useStyles(className, style);
  return <RPSvgText style={merged} {...props} />;
}

// ─── Shape & gradient re-exports (no className — use SVG props directly) ────

export {
  Path, Rect, Circle, Ellipse, Line, Polyline, Polygon,
  Tspan, Defs, ClipPath, Stop, LinearGradient, RadialGradient,
};
