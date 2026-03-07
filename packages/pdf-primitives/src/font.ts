// ─── defineFont ──────────────────────────────────────────────────────────────
// next/font-inspired API for registering fonts with @react-pdf/renderer.

import { Font } from "@react-pdf/renderer";

type FontStyle = "normal" | "italic" | "oblique";
type FontWeight = number | "thin" | "ultralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "ultrabold" | "heavy";

export interface FontVariant {
  src: string;
  weight?: FontWeight;
  style?: FontStyle;
  /** PostScript name override */
  postscriptName?: string;
  /** HTTP method for remote fonts */
  method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "PATCH";
  /** HTTP headers for remote fonts */
  headers?: Record<string, string>;
  /** HTTP body for remote fonts */
  body?: unknown;
}

export interface DefineFontOptions {
  /** Font family name */
  family: string;
  /** Single source path/URL, or array of variants */
  src: string | FontVariant[];
}

export interface FontResult {
  /** The registered family name */
  family: string;
  /** Ready-to-use className: `font-[FamilyName]` */
  className: string;
  /** Inline style object: `{ fontFamily: "FamilyName" }` */
  style: { fontFamily: string };
}

export function defineFont(options: DefineFontOptions): FontResult {
  const { family, src } = options;

  if (typeof src === "string") {
    Font.register({ family, src });
  } else {
    Font.register({
      family,
      fonts: src.map(({ src: fontSrc, weight, style, ...rest }) => ({
        src: fontSrc,
        fontWeight: weight,
        fontStyle: style,
        ...rest,
      })),
    });
  }

  return {
    family,
    className: `font-[${family}]`,
    style: { fontFamily: family },
  };
}
