import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

// Mock @react-pdf/renderer — its components don't render in jsdom
vi.mock("@react-pdf/renderer", () => {
  const make = (name: string) =>
    React.forwardRef(({ style, wrap, render, ...rest }: any, ref: any) => {
      return React.createElement("div", {
        ref,
        "data-testid": name,
        "data-style": style ? JSON.stringify(style) : undefined,
        "data-wrap": wrap !== undefined ? String(wrap) : undefined,
        "data-render": render ? JSON.stringify(render({ pageNumber: 3, totalPages: 10, subPageNumber: 1, subPageTotalPages: 1 })) : undefined,
        ...rest,
      });
    });

  return {
    View: make("rp-view"),
    Text: make("rp-text"),
    Page: make("rp-page"),
    Image: make("rp-image"),
    Link: make("rp-link"),
    Document: make("rp-document"),
    Canvas: make("rp-canvas"),
    Note: make("rp-note"),
    Svg: make("rp-svg"),
    G: make("rp-g"),
    Path: make("rp-path"),
    Rect: make("rp-rect"),
    Circle: make("rp-circle"),
    Ellipse: make("rp-ellipse"),
    Line: make("rp-line"),
    Polyline: make("rp-polyline"),
    Polygon: make("rp-polygon"),
    Tspan: make("rp-tspan"),
    Defs: make("rp-defs"),
    ClipPath: make("rp-clippath"),
    Stop: make("rp-stop"),
    LinearGradient: make("rp-lineargradient"),
    RadialGradient: make("rp-radialgradient"),
  };
});

import { Block, View, Text, Page, Link, Document, Canvas, Note, PageNumber, Svg, G, SvgText, Tailwind } from "../index";

function getStyle(el: HTMLElement): any {
  const raw = el.getAttribute("data-style");
  return raw ? JSON.parse(raw) : undefined;
}

describe("Block", () => {
  it("renders with className converted to style", () => {
    const { getByTestId } = render(<Block className="p-4 bg-white" />);
    const el = getByTestId("rp-view");
    const style = getStyle(el);
    expect(style).toEqual([
      {
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        backgroundColor: "#ffffff",
      },
    ]);
  });

  it("renders with inline style only", () => {
    const { getByTestId } = render(<Block style={{ width: 100 }} />);
    const style = getStyle(getByTestId("rp-view"));
    expect(style).toEqual([{ width: 100 }]);
  });

  it("merges className and inline style (tw first, then inline)", () => {
    const { getByTestId } = render(
      <Block className="p-2" style={{ color: "red" }} />
    );
    const style = getStyle(getByTestId("rp-view"));
    expect(style).toEqual([
      { paddingTop: 6, paddingRight: 6, paddingBottom: 6, paddingLeft: 6 },
      { color: "red" },
    ]);
  });

  it("inline style overrides className when merged (array order)", () => {
    const { getByTestId } = render(
      <Block className="bg-white" style={{ backgroundColor: "red" }} />
    );
    const style = getStyle(getByTestId("rp-view"));
    // tw styles come first, inline second — react-pdf uses last-wins
    expect(style[0]).toEqual({ backgroundColor: "#ffffff" });
    expect(style[1]).toEqual({ backgroundColor: "red" });
  });

  it("supports style as array", () => {
    const { getByTestId } = render(
      <Block style={[{ width: 10 }, { height: 20 }]} />
    );
    const style = getStyle(getByTestId("rp-view"));
    expect(style).toEqual([{ width: 10 }, { height: 20 }]);
  });

  it("passes no style when neither className nor style provided", () => {
    const { getByTestId } = render(<Block />);
    expect(getByTestId("rp-view").getAttribute("data-style")).toBeNull();
  });

  it("breakable={false} maps to wrap=false", () => {
    const { getByTestId } = render(<Block breakable={false} />);
    expect(getByTestId("rp-view").getAttribute("data-wrap")).toBe("false");
  });

  it("breakable={true} maps to wrap=true", () => {
    const { getByTestId } = render(<Block breakable={true} />);
    expect(getByTestId("rp-view").getAttribute("data-wrap")).toBe("true");
  });

  it("wrap is undefined when breakable is not set", () => {
    const { getByTestId } = render(<Block />);
    expect(getByTestId("rp-view").getAttribute("data-wrap")).toBeNull();
  });

  it("renders children", () => {
    const { getByTestId } = render(
      <Block>
        <Text>hello</Text>
      </Block>
    );
    expect(getByTestId("rp-view").querySelector("[data-testid='rp-text']")).toBeTruthy();
  });
});

describe("View (deprecated alias)", () => {
  it("is the same component as Block", () => {
    expect(View).toBe(Block);
  });
});

describe("Text", () => {
  it("renders with className", () => {
    const { getByTestId } = render(<Text className="text-sm font-bold" />);
    const style = getStyle(getByTestId("rp-text"));
    expect(style).toEqual([{ fontSize: 10.5, fontWeight: 700 }]);
  });

  it("renders children", () => {
    const { getByTestId } = render(<Text>Hello world</Text>);
    expect(getByTestId("rp-text").textContent).toBe("Hello world");
  });
});

describe("Page", () => {
  it("renders with className", () => {
    const { getByTestId } = render(<Page className="p-8 bg-white" />);
    const style = getStyle(getByTestId("rp-page"));
    expect(style).toEqual([
      {
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        backgroundColor: "#ffffff",
      },
    ]);
  });
});

describe("Link", () => {
  it("renders with className", () => {
    const { getByTestId } = render(<Link className="text-blue-500 underline" />);
    const style = getStyle(getByTestId("rp-link"));
    expect(style).toEqual([
      { color: "#3b82f6", textDecoration: "underline" },
    ]);
  });
});

describe("Document", () => {
  it("renders children", () => {
    const { getByTestId } = render(
      <Document>
        <Page />
      </Document>
    );
    expect(getByTestId("rp-document").querySelector("[data-testid='rp-page']")).toBeTruthy();
  });
});

describe("Canvas", () => {
  it("renders with className", () => {
    const { getByTestId } = render(<Canvas className="w-full h-full" />);
    const style = getStyle(getByTestId("rp-canvas"));
    expect(style).toEqual([{ width: "100%", height: "100%" }]);
  });
});

describe("Note", () => {
  it("renders with className", () => {
    const { getByTestId } = render(<Note className="p-2 bg-yellow-100">A note</Note>);
    const style = getStyle(getByTestId("rp-note"));
    expect(style).toEqual([
      {
        paddingTop: 6,
        paddingRight: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        backgroundColor: "#fef9c3",
      },
    ]);
  });
});

describe("Tailwind provider", () => {
  it("provides custom theme to children", () => {
    const { getByTestId } = render(
      <Tailwind theme={{ "--color-brand": "#ff6600" }}>
        <Text className="text-brand" />
      </Tailwind>
    );
    const style = getStyle(getByTestId("rp-text"));
    expect(style).toEqual([{ color: "#ff6600" }]);
  });

  it("uses default theme when no theme prop", () => {
    const { getByTestId } = render(
      <Tailwind>
        <Text className="text-red-500" />
      </Tailwind>
    );
    const style = getStyle(getByTestId("rp-text"));
    expect(style).toEqual([{ color: "#ef4444" }]);
  });

  it("custom theme colors override defaults", () => {
    const { getByTestId } = render(
      <Tailwind theme={{ "--color-red-500": "#ff0000" }}>
        <Text className="text-red-500" />
      </Tailwind>
    );
    const style = getStyle(getByTestId("rp-text"));
    expect(style).toEqual([{ color: "#ff0000" }]);
  });
});

describe("PageNumber", () => {
  it("renders with default render prop", () => {
    const { getByTestId } = render(<PageNumber className="text-sm" />);
    const el = getByTestId("rp-text");
    expect(getStyle(el)).toEqual([{ fontSize: 10.5 }]);
    expect(el.getAttribute("data-render")).toBe('"3 / 10"');
  });

  it("renders with custom render prop", () => {
    const { getByTestId } = render(
      <PageNumber render={({ pageNumber }) => `Page ${pageNumber}`} />
    );
    expect(getByTestId("rp-text").getAttribute("data-render")).toBe('"Page 3"');
  });
});

describe("Svg", () => {
  it("renders with className converted to style", () => {
    const { getByTestId } = render(<Svg className="w-full h-24" />);
    const style = getStyle(getByTestId("rp-svg"));
    expect(style).toEqual([{ width: "100%", height: 72 }]);
  });

  it("passes no style when neither className nor style provided", () => {
    const { getByTestId } = render(<Svg />);
    expect(getByTestId("rp-svg").getAttribute("data-style")).toBeNull();
  });

  it("merges className and inline style", () => {
    const { getByTestId } = render(
      <Svg className="w-24" style={{ height: 100 }} />
    );
    const style = getStyle(getByTestId("rp-svg"));
    expect(style).toEqual([{ width: 72 }, { height: 100 }]);
  });
});

describe("G", () => {
  it("renders with className converted to style", () => {
    const { getByTestId } = render(<G className="opacity-50" />);
    const style = getStyle(getByTestId("rp-g"));
    expect(style).toEqual([{ opacity: 0.5 }]);
  });
});

describe("SvgText", () => {
  it("renders with className converted to style", () => {
    const { getByTestId } = render(<SvgText className="text-sm font-bold" x={0} y={0} />);
    const style = getStyle(getByTestId("rp-text"));
    expect(style).toEqual([{ fontSize: 10.5, fontWeight: 700 }]);
  });
});
