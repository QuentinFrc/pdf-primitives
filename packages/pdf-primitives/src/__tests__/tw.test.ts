import { describe, it, expect } from "vitest";
import { tw, createTw } from "../tw";

describe("tw() — default theme", () => {
  // ── Empty / unknown ──
  it("returns {} for empty string", () => {
    expect(tw("")).toEqual({});
  });

  it("returns {} for unknown utility", () => {
    expect(tw("does-not-exist")).toEqual({});
  });

  // ── Display ──
  it("flex", () => {
    expect(tw("flex")).toEqual({ display: "flex" });
  });

  it("hidden", () => {
    expect(tw("hidden")).toEqual({ display: "none" });
  });

  // ── Flex direction / wrap ──
  it("flex-row", () => {
    expect(tw("flex-row")).toEqual({ flexDirection: "row" });
  });

  it("flex-col", () => {
    expect(tw("flex-col")).toEqual({ flexDirection: "column" });
  });

  it("flex-wrap", () => {
    expect(tw("flex-wrap")).toEqual({ flexWrap: "wrap" });
  });

  // ── Flex grow/shrink ──
  it("flex-1", () => {
    expect(tw("flex-1")).toEqual({ flex: 1 });
  });

  it("flex-none", () => {
    expect(tw("flex-none")).toEqual({ flex: 0 });
  });

  it("grow / shrink", () => {
    expect(tw("grow")).toEqual({ flexGrow: 1 });
    expect(tw("shrink-0")).toEqual({ flexShrink: 0 });
  });

  // ── Align / Justify ──
  it("items-center", () => {
    expect(tw("items-center")).toEqual({ alignItems: "center" });
  });

  it("justify-between", () => {
    expect(tw("justify-between")).toEqual({ justifyContent: "space-between" });
  });

  it("self-end", () => {
    expect(tw("self-end")).toEqual({ alignSelf: "flex-end" });
  });

  // ── Gap ──
  it("gap-2 → 6pt", () => {
    expect(tw("gap-2")).toEqual({ gap: 6 });
  });

  it("gap-x-4 → columnGap 12pt", () => {
    expect(tw("gap-x-4")).toEqual({ columnGap: 12 });
  });

  it("gap-y-1 → rowGap 3pt", () => {
    expect(tw("gap-y-1")).toEqual({ rowGap: 3 });
  });

  // ── Position ──
  it("relative / absolute", () => {
    expect(tw("relative")).toEqual({ position: "relative" });
    expect(tw("absolute")).toEqual({ position: "absolute" });
  });

  // ── Inset ──
  it("top-2 → 6pt", () => {
    expect(tw("top-2")).toEqual({ top: 6 });
  });

  it("left-4 → 12pt", () => {
    expect(tw("left-4")).toEqual({ left: 12 });
  });

  // ── Overflow ──
  it("overflow-hidden", () => {
    expect(tw("overflow-hidden")).toEqual({ overflow: "hidden" });
  });

  // ── Z-index ──
  it("z-10", () => {
    expect(tw("z-10")).toEqual({ zIndex: 10 });
  });

  it("z-[99]", () => {
    expect(tw("z-[99]")).toEqual({ zIndex: 99 });
  });

  // ── Width ──
  it("w-full → 100%", () => {
    expect(tw("w-full")).toEqual({ width: "100%" });
  });

  it("w-8 → 24pt", () => {
    expect(tw("w-8")).toEqual({ width: 24 });
  });

  it("min-w-full", () => {
    expect(tw("min-w-full")).toEqual({ minWidth: "100%" });
  });

  it("max-w-none", () => {
    expect(tw("max-w-none")).toEqual({ maxWidth: "none" });
  });

  // ── Height ──
  it("h-full → 100%", () => {
    expect(tw("h-full")).toEqual({ height: "100%" });
  });

  it("h-5 → 15pt", () => {
    expect(tw("h-5")).toEqual({ height: 15 });
  });

  // ── Padding ──
  it("p-4 → 12pt all sides", () => {
    expect(tw("p-4")).toEqual({
      paddingTop: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingLeft: 12,
    });
  });

  it("px-2 → paddingHorizontal 6pt", () => {
    expect(tw("px-2")).toEqual({ paddingHorizontal: 6 });
  });

  it("py-3 → paddingVertical 9pt", () => {
    expect(tw("py-3")).toEqual({ paddingVertical: 9 });
  });

  it("pt-1 → paddingTop 3pt", () => {
    expect(tw("pt-1")).toEqual({ paddingTop: 3 });
  });

  it("p-px → 0.75pt", () => {
    expect(tw("p-px")).toEqual({
      paddingTop: 0.75,
      paddingRight: 0.75,
      paddingBottom: 0.75,
      paddingLeft: 0.75,
    });
  });

  // ── Margin ──
  it("m-2 → 6pt all sides", () => {
    expect(tw("m-2")).toEqual({
      marginTop: 6,
      marginRight: 6,
      marginBottom: 6,
      marginLeft: 6,
    });
  });

  it("mx-4 → marginHorizontal 12pt", () => {
    expect(tw("mx-4")).toEqual({ marginHorizontal: 12 });
  });

  it("mb-1 → marginBottom 3pt", () => {
    expect(tw("mb-1")).toEqual({ marginBottom: 3 });
  });

  it("negative margin: mt--2 doesn't work (needs -mt-2 syntax check)", () => {
    // tw doesn't support -mt-2 style negatives at the class level,
    // but the spacingProp handles raw negative values like m--2
    // Let's test arbitrary value instead
    expect(tw("mt-[10]")).toEqual({ marginTop: 10 });
  });

  // ── Font size ──
  it("text-sm → 10.5pt", () => {
    expect(tw("text-sm")).toEqual({ fontSize: 10.5 });
  });

  it("text-2xl → 18pt", () => {
    expect(tw("text-2xl")).toEqual({ fontSize: 18 });
  });

  it("text-[14] → arbitrary", () => {
    expect(tw("text-[14]")).toEqual({ fontSize: 14 });
  });

  // ── Text color ──
  it("text-red-500 → #ef4444", () => {
    expect(tw("text-red-500")).toEqual({ color: "#ef4444" });
  });

  it("text-white → #ffffff", () => {
    expect(tw("text-white")).toEqual({ color: "#ffffff" });
  });

  it("text-foreground → shadcn default #0a0a0a", () => {
    expect(tw("text-foreground")).toEqual({ color: "#0a0a0a" });
  });

  it("text-muted-foreground → #737373", () => {
    expect(tw("text-muted-foreground")).toEqual({ color: "#737373" });
  });

  // ── Background color ──
  it("bg-blue-500 → #3b82f6", () => {
    expect(tw("bg-blue-500")).toEqual({ backgroundColor: "#3b82f6" });
  });

  it("bg-white → #ffffff", () => {
    expect(tw("bg-white")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("bg-transparent → rgba(0,0,0,0)", () => {
    expect(tw("bg-transparent")).toEqual({ backgroundColor: "rgba(0,0,0,0)" });
  });

  // ── Color with alpha ──
  it("bg-red-500/50 → rgba with 50% alpha", () => {
    const result = tw("bg-red-500/50");
    expect(result.backgroundColor).toMatch(/^rgba\(239, 68, 68, 0\.5\)$/);
  });

  it("text-black/25 → rgba", () => {
    const result = tw("text-black/25");
    expect(result.color).toMatch(/^rgba\(0, 0, 0, 0\.25\)$/);
  });

  // ── Arbitrary color ──
  it("bg-[#ff0000]", () => {
    expect(tw("bg-[#ff0000]")).toEqual({ backgroundColor: "#ff0000" });
  });

  // ── Font weight ──
  it("font-bold → 700", () => {
    expect(tw("font-bold")).toEqual({ fontWeight: 700 });
  });

  it("font-medium → 500", () => {
    expect(tw("font-medium")).toEqual({ fontWeight: 500 });
  });

  // ── Font style ──
  it("italic", () => {
    expect(tw("italic")).toEqual({ fontStyle: "italic" });
  });

  it("not-italic", () => {
    expect(tw("not-italic")).toEqual({ fontStyle: "normal" });
  });

  // ── Text align ──
  it("text-center", () => {
    expect(tw("text-center")).toEqual({ textAlign: "center" });
  });

  it("text-right", () => {
    expect(tw("text-right")).toEqual({ textAlign: "right" });
  });

  // ── Text decoration ──
  it("underline", () => {
    expect(tw("underline")).toEqual({ textDecoration: "underline" });
  });

  it("line-through", () => {
    expect(tw("line-through")).toEqual({ textDecoration: "line-through" });
  });

  // ── Text transform ──
  it("uppercase", () => {
    expect(tw("uppercase")).toEqual({ textTransform: "uppercase" });
  });

  it("capitalize", () => {
    expect(tw("capitalize")).toEqual({ textTransform: "capitalize" });
  });

  // ── Line height ──
  it("leading-tight → 1.25", () => {
    expect(tw("leading-tight")).toEqual({ lineHeight: 1.25 });
  });

  it("leading-relaxed → 1.625", () => {
    expect(tw("leading-relaxed")).toEqual({ lineHeight: 1.625 });
  });

  it("leading-2 → numeric", () => {
    expect(tw("leading-2")).toEqual({ lineHeight: 2 });
  });

  // ── Letter spacing ──
  it("tracking-wide → 0.3", () => {
    expect(tw("tracking-wide")).toEqual({ letterSpacing: 0.3 });
  });

  it("tracking-tighter → -0.6", () => {
    expect(tw("tracking-tighter")).toEqual({ letterSpacing: -0.6 });
  });

  // ── Max lines ──
  it("line-clamp-3", () => {
    expect(tw("line-clamp-3")).toEqual({ maxLines: 3 });
  });

  // ── Border width ──
  it("border → 1", () => {
    expect(tw("border")).toEqual({ borderWidth: 1 });
  });

  it("border-0 → 0", () => {
    expect(tw("border-0")).toEqual({ borderWidth: 0 });
  });

  it("border-2 → 2", () => {
    expect(tw("border-2")).toEqual({ borderWidth: 2 });
  });

  it("border-t → borderTopWidth: 1", () => {
    expect(tw("border-t")).toEqual({ borderTopWidth: 1 });
  });

  // ── Border color ──
  it("border-red-500 → #ef4444", () => {
    expect(tw("border-red-500")).toEqual({ borderColor: "#ef4444" });
  });

  it("border-border → shadcn default #e5e5e5", () => {
    expect(tw("border-border")).toEqual({ borderColor: "#e5e5e5" });
  });

  // ── Border style ──
  it("border-dashed", () => {
    expect(tw("border-dashed")).toEqual({ borderStyle: "dashed" });
  });

  // ── Border radius ──
  it("rounded → DEFAULT 3pt", () => {
    expect(tw("rounded")).toEqual({ borderRadius: 3 });
  });

  it("rounded-lg → 6pt", () => {
    expect(tw("rounded-lg")).toEqual({ borderRadius: 6 });
  });

  it("rounded-full → 999", () => {
    expect(tw("rounded-full")).toEqual({ borderRadius: 999 });
  });

  it("rounded-none → 0", () => {
    expect(tw("rounded-none")).toEqual({ borderRadius: 0 });
  });

  it("rounded-t-lg → top corners", () => {
    expect(tw("rounded-t-lg")).toEqual({
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    });
  });

  it("rounded-tl-md → single corner", () => {
    expect(tw("rounded-tl-md")).toEqual({
      borderTopLeftRadius: 4.5,
    });
  });

  // ── Opacity ──
  it("opacity-50 → 0.5", () => {
    expect(tw("opacity-50")).toEqual({ opacity: 0.5 });
  });

  it("opacity-0 → 0", () => {
    expect(tw("opacity-0")).toEqual({ opacity: 0 });
  });

  // ── Object fit ──
  it("object-cover", () => {
    expect(tw("object-cover")).toEqual({ objectFit: "cover" });
  });

  it("object-center", () => {
    expect(tw("object-center")).toEqual({ objectPosition: "center" });
  });

  // ── Multiple classes ──
  it("combines multiple classes", () => {
    const result = tw("flex flex-row items-center gap-2 p-4");
    expect(result).toEqual({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingTop: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingLeft: 12,
    });
  });

  it("later class overrides earlier", () => {
    const result = tw("p-2 p-4");
    expect(result.paddingTop).toBe(12);
  });

  it("text-sm + text-red-500 → both fontSize and color", () => {
    const result = tw("text-sm text-red-500");
    expect(result.fontSize).toBe(10.5);
    expect(result.color).toBe("#ef4444");
  });

  // ── Caching ──
  it("returns same reference for same input (cached)", () => {
    const a = tw("flex p-4");
    const b = tw("flex p-4");
    expect(a).toBe(b);
  });

  // ── Arbitrary spacing ──
  it("w-[100] → arbitrary width", () => {
    expect(tw("w-[100]")).toEqual({ width: 100 });
  });

  it("h-[50] → arbitrary height", () => {
    expect(tw("h-[50]")).toEqual({ height: 50 });
  });

  it("gap-[8] → arbitrary gap", () => {
    expect(tw("gap-[8]")).toEqual({ gap: 8 });
  });
});

describe("createTw() — custom theme", () => {
  it("custom color via --color-brand", () => {
    const custom = createTw({ "--color-brand": "#ff6600" });
    expect(custom("text-brand")).toEqual({ color: "#ff6600" });
    expect(custom("bg-brand")).toEqual({ backgroundColor: "#ff6600" });
  });

  it("--color-*: initial resets all default colors", () => {
    const custom = createTw({
      "--color-*": "initial",
      "--color-brand": "#ff6600",
    });
    expect(custom("text-brand")).toEqual({ color: "#ff6600" });
    expect(custom("text-red-500")).toEqual({}); // red-500 was reset
  });

  it("custom font size via --text-tiny", () => {
    const custom = createTw({ "--text-tiny": 5 });
    expect(custom("text-tiny")).toEqual({ fontSize: 5 });
  });

  it("custom radius via --radius-pill", () => {
    const custom = createTw({ "--radius-pill": 50 });
    expect(custom("rounded-pill")).toEqual({ borderRadius: 50 });
  });

  it("custom spacing via --spacing-18", () => {
    const custom = createTw({ "--spacing-18": 72 });
    expect(custom("p-18")).toEqual({
      paddingTop: 72,
      paddingRight: 72,
      paddingBottom: 72,
      paddingLeft: 72,
    });
  });

  it("custom font weight via --font-weight-black", () => {
    const custom = createTw({ "--font-weight-black": 950 });
    expect(custom("font-black")).toEqual({ fontWeight: 950 });
  });

  it("custom line height via --leading-extra", () => {
    const custom = createTw({ "--leading-extra": 3 });
    expect(custom("leading-extra")).toEqual({ lineHeight: 3 });
  });

  it("custom letter spacing via --tracking-extra", () => {
    const custom = createTw({ "--tracking-extra": 2 });
    expect(custom("tracking-extra")).toEqual({ letterSpacing: 2 });
  });

  it("oklch color is converted to hex", () => {
    const custom = createTw({ "--color-test": "oklch(0.5 0.2 270)" });
    const result = custom("text-test");
    expect(result.color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("oklch color with alpha is converted to rgba", () => {
    const custom = createTw({ "--color-test": "oklch(0.5 0.2 270 / 0.5)" });
    const result = custom("text-test");
    expect(result.color).toMatch(/^rgba\(/);
  });

  it("preserves defaults when adding custom values", () => {
    const custom = createTw({ "--color-brand": "#ff6600" });
    // Default colors should still work
    expect(custom("text-red-500")).toEqual({ color: "#ef4444" });
    expect(custom("bg-white")).toEqual({ backgroundColor: "#ffffff" });
  });

  it("wildcard --*: initial resets everything", () => {
    const custom = createTw({
      "--*": "initial",
      "--color-only": "#123456",
    });
    expect(custom("text-only")).toEqual({ color: "#123456" });
    expect(custom("text-red-500")).toEqual({});
    expect(custom("font-bold")).toEqual({});
    expect(custom("p-4")).toEqual({});
  });
});
