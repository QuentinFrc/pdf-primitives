import { describe, it, expect } from "vitest";
import { tw, createTw } from "../tw";

describe("tw() — fractional widths/heights", () => {
  it("w-1/2 → 50%", () => {
    expect(tw("w-1/2")).toEqual({ width: "50%" });
  });
  it("w-2/3 → 66.666667%", () => {
    expect(tw("w-2/3")).toEqual({ width: "66.666667%" });
  });
  it("w-1/4 → 25%", () => {
    expect(tw("w-1/4")).toEqual({ width: "25%" });
  });
  it("w-3/12 → 25%", () => {
    expect(tw("w-3/12")).toEqual({ width: "25%" });
  });
  it("h-1/2 → 50%", () => {
    expect(tw("h-1/2")).toEqual({ height: "50%" });
  });
  it("h-2/3 → 66.666667%", () => {
    expect(tw("h-2/3")).toEqual({ height: "66.666667%" });
  });
  it("min-w-1/2 → 50%", () => {
    expect(tw("min-w-1/2")).toEqual({ minWidth: "50%" });
  });
  it("max-w-3/4 → 75%", () => {
    expect(tw("max-w-3/4")).toEqual({ maxWidth: "75%" });
  });
  it("min-h-1/3 → 33.333333%", () => {
    expect(tw("min-h-1/3")).toEqual({ minHeight: "33.333333%" });
  });
  it("max-h-2/3 → 66.666667%", () => {
    expect(tw("max-h-2/3")).toEqual({ maxHeight: "66.666667%" });
  });
});

describe("tw() — flex-basis", () => {
  it("basis-auto", () => {
    expect(tw("basis-auto")).toEqual({ flexBasis: "auto" });
  });
  it("basis-full → 100%", () => {
    expect(tw("basis-full")).toEqual({ flexBasis: "100%" });
  });
  it("basis-1/2 → 50%", () => {
    expect(tw("basis-1/2")).toEqual({ flexBasis: "50%" });
  });
  it("basis-4 → 12pt", () => {
    expect(tw("basis-4")).toEqual({ flexBasis: 12 });
  });
  it("basis-0 → 0", () => {
    expect(tw("basis-0")).toEqual({ flexBasis: 0 });
  });
});

describe("tw() — order", () => {
  it("order-1", () => {
    expect(tw("order-1")).toEqual({ order: 1 });
  });
  it("order-12", () => {
    expect(tw("order-12")).toEqual({ order: 12 });
  });
  it("order-first → -9999", () => {
    expect(tw("order-first")).toEqual({ order: -9999 });
  });
  it("order-last → 9999", () => {
    expect(tw("order-last")).toEqual({ order: 9999 });
  });
  it("order-none → 0", () => {
    expect(tw("order-none")).toEqual({ order: 0 });
  });
});

describe("tw() — aspect ratio", () => {
  it("aspect-square → 1", () => {
    expect(tw("aspect-square")).toEqual({ aspectRatio: 1 });
  });
  it("aspect-video → 16/9", () => {
    expect(tw("aspect-video")).toEqual({ aspectRatio: 16 / 9 });
  });
  it("aspect-auto", () => {
    expect(tw("aspect-auto")).toEqual({ aspectRatio: "auto" });
  });
  it("aspect-[4/3]", () => {
    expect(tw("aspect-[4/3]")).toEqual({ aspectRatio: 4 / 3 });
  });
});

describe("tw() — negative prefix", () => {
  it("-mt-2 → marginTop: -6", () => {
    expect(tw("-mt-2")).toEqual({ marginTop: -6 });
  });
  it("-ml-4 → marginLeft: -12", () => {
    expect(tw("-ml-4")).toEqual({ marginLeft: -12 });
  });
  it("-top-2 → top: -6", () => {
    expect(tw("-top-2")).toEqual({ top: -6 });
  });
  it("-mb-0 → marginBottom: 0", () => {
    expect(tw("-mb-0")).toEqual({ marginBottom: -0 });
  });
});

describe("tw() — text decoration extras", () => {
  it("decoration-red-500 → textDecorationColor", () => {
    expect(tw("decoration-red-500")).toEqual({ textDecorationColor: "#ef4444" });
  });
  it("decoration-dashed → textDecorationStyle", () => {
    expect(tw("decoration-dashed")).toEqual({ textDecorationStyle: "dashed" });
  });
  it("decoration-dotted → textDecorationStyle", () => {
    expect(tw("decoration-dotted")).toEqual({ textDecorationStyle: "dotted" });
  });
  it("indent-4 → textIndent: 12", () => {
    expect(tw("indent-4")).toEqual({ textIndent: 12 });
  });
  it("indent-0 → textIndent: 0", () => {
    expect(tw("indent-0")).toEqual({ textIndent: 0 });
  });
});

describe("tw() — transforms", () => {
  it("rotate-45", () => {
    expect(tw("rotate-45")).toEqual({ transform: "rotate(45deg)" });
  });
  it("rotate-[30]", () => {
    expect(tw("rotate-[30]")).toEqual({ transform: "rotate(30deg)" });
  });
  it("scale-50", () => {
    expect(tw("scale-50")).toEqual({ transform: "scale(0.5)" });
  });
  it("scale-x-75", () => {
    expect(tw("scale-x-75")).toEqual({ transform: "scaleX(0.75)" });
  });
  it("scale-y-150", () => {
    expect(tw("scale-y-150")).toEqual({ transform: "scaleY(1.5)" });
  });
  it("translate-x-4 → translateX(12pt)", () => {
    expect(tw("translate-x-4")).toEqual({ transform: "translateX(12pt)" });
  });
  it("translate-y-2 → translateY(6pt)", () => {
    expect(tw("translate-y-2")).toEqual({ transform: "translateY(6pt)" });
  });
});

describe("tw() — arbitrary units", () => {
  it("w-[210mm]", () => {
    expect(tw("w-[210mm]")).toEqual({ width: "210mm" });
  });
  it("h-[297mm]", () => {
    expect(tw("h-[297mm]")).toEqual({ height: "297mm" });
  });
  it("p-[1in]", () => {
    expect(tw("p-[1in]")).toEqual({
      paddingTop: "1in",
      paddingRight: "1in",
      paddingBottom: "1in",
      paddingLeft: "1in",
    });
  });
  it("w-[50vw]", () => {
    expect(tw("w-[50vw]")).toEqual({ width: "50vw" });
  });
  it("w-[50%]", () => {
    expect(tw("w-[50%]")).toEqual({ width: "50%" });
  });
  it("m-[10pt]", () => {
    expect(tw("m-[10pt]")).toEqual({
      marginTop: "10pt",
      marginRight: "10pt",
      marginBottom: "10pt",
      marginLeft: "10pt",
    });
  });
});

describe("tw() — fontFamily", () => {
  it("font-sans → Helvetica", () => {
    expect(tw("font-sans")).toEqual({ fontFamily: "Helvetica" });
  });
  it("font-serif → Times-Roman", () => {
    expect(tw("font-serif")).toEqual({ fontFamily: "Times-Roman" });
  });
  it("font-mono → Courier", () => {
    expect(tw("font-mono")).toEqual({ fontFamily: "Courier" });
  });
  it("font-[Inter] → Inter", () => {
    expect(tw("font-[Inter]")).toEqual({ fontFamily: "Inter" });
  });
  it("font-bold still returns fontWeight", () => {
    expect(tw("font-bold")).toEqual({ fontWeight: 700 });
  });
  it("custom fontFamily via theme", () => {
    const custom = createTw({ "--font-display": "Playfair Display" });
    expect(custom("font-display")).toEqual({ fontFamily: "Playfair Display" });
  });
});

describe("tw() — position fixed", () => {
  it("fixed → position: fixed", () => {
    expect(tw("fixed")).toEqual({ position: "fixed" });
  });
});

describe("tw() — inset shorthands", () => {
  it("inset-0", () => {
    expect(tw("inset-0")).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
  });
  it("inset-4", () => {
    expect(tw("inset-4")).toEqual({ top: 12, right: 12, bottom: 12, left: 12 });
  });
  it("inset-x-4", () => {
    expect(tw("inset-x-4")).toEqual({ left: 12, right: 12 });
  });
  it("inset-y-2", () => {
    expect(tw("inset-y-2")).toEqual({ top: 6, bottom: 6 });
  });
  it("-inset-x-4", () => {
    expect(tw("-inset-x-4")).toEqual({ left: -12, right: -12 });
  });
});

describe("tw() — textOverflow", () => {
  it("text-ellipsis", () => {
    expect(tw("text-ellipsis")).toEqual({ textOverflow: "ellipsis" });
  });
  it("text-clip", () => {
    expect(tw("text-clip")).toEqual({ textOverflow: "clip" });
  });
  it("text-sm still returns fontSize", () => {
    expect(tw("text-sm")).toEqual({ fontSize: 10.5 });
  });
});

describe("tw() — border per-side color & style", () => {
  it("border-t-red-500", () => {
    expect(tw("border-t-red-500")).toEqual({ borderTopColor: "#ef4444" });
  });
  it("border-r-dashed", () => {
    expect(tw("border-r-dashed")).toEqual({ borderRightStyle: "dashed" });
  });
  it("border-l-[#ff0000]", () => {
    expect(tw("border-l-[#ff0000]")).toEqual({ borderLeftColor: "#ff0000" });
  });
  it("border-b-2 still returns borderBottomWidth", () => {
    expect(tw("border-b-2")).toEqual({ borderBottomWidth: 2 });
  });
});

describe("tw() — skew", () => {
  it("skew-x-6", () => {
    expect(tw("skew-x-6")).toEqual({ transform: "skewX(6deg)" });
  });
  it("skew-y-12", () => {
    expect(tw("skew-y-12")).toEqual({ transform: "skewY(12deg)" });
  });
  it("skew-x-[15]", () => {
    expect(tw("skew-x-[15]")).toEqual({ transform: "skewX(15deg)" });
  });
});

describe("tw() — transformOrigin", () => {
  it("origin-center", () => {
    expect(tw("origin-center")).toEqual({ transformOrigin: "center center" });
  });
  it("origin-top-left", () => {
    expect(tw("origin-top-left")).toEqual({ transformOrigin: "left top" });
  });
  it("origin-bottom-right", () => {
    expect(tw("origin-bottom-right")).toEqual({ transformOrigin: "right bottom" });
  });
});

describe("tw() — transform composition", () => {
  it("rotate-45 scale-50 → combined transform", () => {
    expect(tw("rotate-45 scale-50")).toEqual({ transform: "rotate(45deg) scale(0.5)" });
  });
  it("three transforms", () => {
    expect(tw("rotate-45 scale-50 translate-x-4")).toEqual({
      transform: "rotate(45deg) scale(0.5) translateX(12pt)",
    });
  });
  it("single transform still works", () => {
    expect(tw("rotate-90")).toEqual({ transform: "rotate(90deg)" });
  });
});
