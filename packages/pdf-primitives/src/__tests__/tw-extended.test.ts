import { tw, createTw } from "../tw";

describe("tw() — fractional widths/heights", () => {
  it("w-1/2 → 50%", () => {
    expect(tw("w-1/2")).toStrictEqual({ width: "50%" });
  });

  it("w-2/3 → 66.666667%", () => {
    expect(tw("w-2/3")).toStrictEqual({ width: "66.666667%" });
  });

  it("w-1/4 → 25%", () => {
    expect(tw("w-1/4")).toStrictEqual({ width: "25%" });
  });

  it("w-3/12 → 25%", () => {
    expect(tw("w-3/12")).toStrictEqual({ width: "25%" });
  });

  it("h-1/2 → 50%", () => {
    expect(tw("h-1/2")).toStrictEqual({ height: "50%" });
  });

  it("h-2/3 → 66.666667%", () => {
    expect(tw("h-2/3")).toStrictEqual({ height: "66.666667%" });
  });

  it("min-w-1/2 → 50%", () => {
    expect(tw("min-w-1/2")).toStrictEqual({ minWidth: "50%" });
  });

  it("max-w-3/4 → 75%", () => {
    expect(tw("max-w-3/4")).toStrictEqual({ maxWidth: "75%" });
  });

  it("min-h-1/3 → 33.333333%", () => {
    expect(tw("min-h-1/3")).toStrictEqual({ minHeight: "33.333333%" });
  });

  it("max-h-2/3 → 66.666667%", () => {
    expect(tw("max-h-2/3")).toStrictEqual({ maxHeight: "66.666667%" });
  });
});

describe("tw() — flex-basis", () => {
  it("basis-auto", () => {
    expect(tw("basis-auto")).toStrictEqual({ flexBasis: "auto" });
  });

  it("basis-full → 100%", () => {
    expect(tw("basis-full")).toStrictEqual({ flexBasis: "100%" });
  });

  it("basis-1/2 → 50%", () => {
    expect(tw("basis-1/2")).toStrictEqual({ flexBasis: "50%" });
  });

  it("basis-4 → 12pt", () => {
    expect(tw("basis-4")).toStrictEqual({ flexBasis: 12 });
  });

  it("basis-0 → 0", () => {
    expect(tw("basis-0")).toStrictEqual({ flexBasis: 0 });
  });
});

describe("tw() — order", () => {
  it("order-1", () => {
    expect(tw("order-1")).toStrictEqual({ order: 1 });
  });

  it("order-12", () => {
    expect(tw("order-12")).toStrictEqual({ order: 12 });
  });

  it("order-first → -9999", () => {
    expect(tw("order-first")).toStrictEqual({ order: -9999 });
  });

  it("order-last → 9999", () => {
    expect(tw("order-last")).toStrictEqual({ order: 9999 });
  });

  it("order-none → 0", () => {
    expect(tw("order-none")).toStrictEqual({ order: 0 });
  });
});

describe("tw() — aspect ratio", () => {
  it("aspect-square → 1", () => {
    expect(tw("aspect-square")).toStrictEqual({ aspectRatio: 1 });
  });

  it("aspect-video → 16/9", () => {
    expect(tw("aspect-video")).toStrictEqual({ aspectRatio: 16 / 9 });
  });

  it("aspect-auto", () => {
    expect(tw("aspect-auto")).toStrictEqual({ aspectRatio: "auto" });
  });

  it("aspect-[4/3]", () => {
    expect(tw("aspect-[4/3]")).toStrictEqual({ aspectRatio: 4 / 3 });
  });
});

describe("tw() — negative prefix", () => {
  it("-mt-2 → marginTop: -6", () => {
    expect(tw("-mt-2")).toStrictEqual({ marginTop: -6 });
  });

  it("-ml-4 → marginLeft: -12", () => {
    expect(tw("-ml-4")).toStrictEqual({ marginLeft: -12 });
  });

  it("-top-2 → top: -6", () => {
    expect(tw("-top-2")).toStrictEqual({ top: -6 });
  });

  it("-mb-0 → marginBottom: 0", () => {
    expect(tw("-mb-0")).toStrictEqual({ marginBottom: -0 });
  });
});

describe("tw() — text decoration extras", () => {
  it("decoration-red-500 → textDecorationColor", () => {
    expect(tw("decoration-red-500")).toStrictEqual({
      textDecorationColor: "#ef4444",
    });
  });

  it("decoration-dashed → textDecorationStyle", () => {
    expect(tw("decoration-dashed")).toStrictEqual({
      textDecorationStyle: "dashed",
    });
  });

  it("decoration-dotted → textDecorationStyle", () => {
    expect(tw("decoration-dotted")).toStrictEqual({
      textDecorationStyle: "dotted",
    });
  });

  it("indent-4 → textIndent: 12", () => {
    expect(tw("indent-4")).toStrictEqual({ textIndent: 12 });
  });

  it("indent-0 → textIndent: 0", () => {
    expect(tw("indent-0")).toStrictEqual({ textIndent: 0 });
  });
});

describe("tw() — transforms", () => {
  it("rotate-45", () => {
    expect(tw("rotate-45")).toStrictEqual({ transform: "rotate(45deg)" });
  });

  it("rotate-[30]", () => {
    expect(tw("rotate-[30]")).toStrictEqual({ transform: "rotate(30deg)" });
  });

  it("scale-50", () => {
    expect(tw("scale-50")).toStrictEqual({ transform: "scale(0.5)" });
  });

  it("scale-x-75", () => {
    expect(tw("scale-x-75")).toStrictEqual({ transform: "scaleX(0.75)" });
  });

  it("scale-y-150", () => {
    expect(tw("scale-y-150")).toStrictEqual({ transform: "scaleY(1.5)" });
  });

  it("translate-x-4 → translateX(12pt)", () => {
    expect(tw("translate-x-4")).toStrictEqual({
      transform: "translateX(12pt)",
    });
  });

  it("translate-y-2 → translateY(6pt)", () => {
    expect(tw("translate-y-2")).toStrictEqual({ transform: "translateY(6pt)" });
  });
});

describe("tw() — arbitrary units", () => {
  it("w-[210mm]", () => {
    expect(tw("w-[210mm]")).toStrictEqual({ width: "210mm" });
  });

  it("h-[297mm]", () => {
    expect(tw("h-[297mm]")).toStrictEqual({ height: "297mm" });
  });

  it("p-[1in]", () => {
    expect(tw("p-[1in]")).toStrictEqual({
      paddingBottom: "1in",
      paddingLeft: "1in",
      paddingRight: "1in",
      paddingTop: "1in",
    });
  });

  it("w-[50vw]", () => {
    expect(tw("w-[50vw]")).toStrictEqual({ width: "50vw" });
  });

  it("w-[50%]", () => {
    expect(tw("w-[50%]")).toStrictEqual({ width: "50%" });
  });

  it("m-[10pt]", () => {
    expect(tw("m-[10pt]")).toStrictEqual({
      marginBottom: "10pt",
      marginLeft: "10pt",
      marginRight: "10pt",
      marginTop: "10pt",
    });
  });
});

describe("tw() — fontFamily", () => {
  it("font-sans → Helvetica", () => {
    expect(tw("font-sans")).toStrictEqual({ fontFamily: "Helvetica" });
  });

  it("font-serif → Times-Roman", () => {
    expect(tw("font-serif")).toStrictEqual({ fontFamily: "Times-Roman" });
  });

  it("font-mono → Courier", () => {
    expect(tw("font-mono")).toStrictEqual({ fontFamily: "Courier" });
  });

  it("font-[Inter] → Inter", () => {
    expect(tw("font-[Inter]")).toStrictEqual({ fontFamily: "Inter" });
  });

  it("font-bold still returns fontWeight", () => {
    expect(tw("font-bold")).toStrictEqual({ fontWeight: 700 });
  });

  it("custom fontFamily via theme", () => {
    const custom = createTw({ "--font-display": "Playfair Display" });
    expect(custom("font-display")).toStrictEqual({
      fontFamily: "Playfair Display",
    });
  });
});

describe("tw() — position fixed", () => {
  it("fixed → position: fixed", () => {
    expect(tw("fixed")).toStrictEqual({ position: "fixed" });
  });
});

describe("tw() — inset shorthands", () => {
  it("inset-0", () => {
    expect(tw("inset-0")).toStrictEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });
  });

  it("inset-4", () => {
    expect(tw("inset-4")).toStrictEqual({
      bottom: 12,
      left: 12,
      right: 12,
      top: 12,
    });
  });

  it("inset-x-4", () => {
    expect(tw("inset-x-4")).toStrictEqual({ left: 12, right: 12 });
  });

  it("inset-y-2", () => {
    expect(tw("inset-y-2")).toStrictEqual({ bottom: 6, top: 6 });
  });

  it("-inset-x-4", () => {
    expect(tw("-inset-x-4")).toStrictEqual({ left: -12, right: -12 });
  });
});

describe("tw() — textOverflow", () => {
  it("text-ellipsis", () => {
    expect(tw("text-ellipsis")).toStrictEqual({ textOverflow: "ellipsis" });
  });

  it("text-clip", () => {
    expect(tw("text-clip")).toStrictEqual({ textOverflow: "clip" });
  });

  it("text-sm still returns fontSize", () => {
    expect(tw("text-sm")).toStrictEqual({ fontSize: 10.5 });
  });
});

describe("tw() — border per-side color & style", () => {
  it("border-t-red-500", () => {
    expect(tw("border-t-red-500")).toStrictEqual({ borderTopColor: "#ef4444" });
  });

  it("border-r-dashed", () => {
    expect(tw("border-r-dashed")).toStrictEqual({ borderRightStyle: "dashed" });
  });

  it("border-l-[#ff0000]", () => {
    expect(tw("border-l-[#ff0000]")).toStrictEqual({
      borderLeftColor: "#ff0000",
    });
  });

  it("border-b-2 still returns borderBottomWidth", () => {
    expect(tw("border-b-2")).toStrictEqual({ borderBottomWidth: 2 });
  });
});

describe("tw() — skew", () => {
  it("skew-x-6", () => {
    expect(tw("skew-x-6")).toStrictEqual({ transform: "skewX(6deg)" });
  });

  it("skew-y-12", () => {
    expect(tw("skew-y-12")).toStrictEqual({ transform: "skewY(12deg)" });
  });

  it("skew-x-[15]", () => {
    expect(tw("skew-x-[15]")).toStrictEqual({ transform: "skewX(15deg)" });
  });
});

describe("tw() — transformOrigin", () => {
  it("origin-center", () => {
    expect(tw("origin-center")).toStrictEqual({
      transformOrigin: "center center",
    });
  });

  it("origin-top-left", () => {
    expect(tw("origin-top-left")).toStrictEqual({
      transformOrigin: "left top",
    });
  });

  it("origin-bottom-right", () => {
    expect(tw("origin-bottom-right")).toStrictEqual({
      transformOrigin: "right bottom",
    });
  });
});

describe("tw() — transform composition", () => {
  it("rotate-45 scale-50 → combined transform", () => {
    expect(tw("rotate-45 scale-50")).toStrictEqual({
      transform: "rotate(45deg) scale(0.5)",
    });
  });

  it("three transforms", () => {
    expect(tw("rotate-45 scale-50 translate-x-4")).toStrictEqual({
      transform: "rotate(45deg) scale(0.5) translateX(12pt)",
    });
  });

  it("single transform still works", () => {
    expect(tw("rotate-90")).toStrictEqual({ transform: "rotate(90deg)" });
  });
});
