import { describe, it, expect } from "vitest";
import * as api from "../index";

describe("public API exports", () => {
  it("exports all primitive components", () => {
    expect(api.Block).toBeDefined();
    expect(api.View).toBeDefined();
    expect(api.Text).toBeDefined();
    expect(api.Page).toBeDefined();
    expect(api.Image).toBeDefined();
    expect(api.Link).toBeDefined();
    expect(api.Document).toBeDefined();
  });

  it("exports Tailwind provider and useTw hook", () => {
    expect(api.Tailwind).toBeDefined();
    expect(api.useTw).toBeDefined();
  });

  it("exports tw engine", () => {
    expect(api.createTw).toBeDefined();
    expect(api.tw).toBeDefined();
    expect(typeof api.tw).toBe("function");
    expect(typeof api.createTw).toBe("function");
  });

  it("View is the same as Block (alias)", () => {
    expect(api.View).toBe(api.Block);
  });

  it("exports Canvas, Note, and PageNumber", () => {
    expect(api.Canvas).toBeDefined();
    expect(api.Note).toBeDefined();
    expect(api.PageNumber).toBeDefined();
  });

  it("exports cn helper", () => {
    expect(api.cn).toBeDefined();
    expect(typeof api.cn).toBe("function");
  });

  it("exports react-pdf re-exports", () => {
    expect(api.Font).toBeDefined();
    expect(api.StyleSheet).toBeDefined();
    expect(api.PDFViewer).toBeDefined();
    expect(api.PDFDownloadLink).toBeDefined();
    expect(api.BlobProvider).toBeDefined();
    expect(api.usePDF).toBeDefined();
    expect(api.pdf).toBeDefined();
  });

  it("exports SVG elements", () => {
    expect(api.Svg).toBeDefined();
    expect(api.G).toBeDefined();
    expect(api.Path).toBeDefined();
    expect(api.Rect).toBeDefined();
    expect(api.Circle).toBeDefined();
    expect(api.Ellipse).toBeDefined();
    expect(api.Line).toBeDefined();
    expect(api.Polyline).toBeDefined();
    expect(api.Polygon).toBeDefined();
    expect(api.SvgText).toBeDefined();
    expect(api.Tspan).toBeDefined();
    expect(api.Defs).toBeDefined();
    expect(api.ClipPath).toBeDefined();
    expect(api.Stop).toBeDefined();
    expect(api.LinearGradient).toBeDefined();
    expect(api.RadialGradient).toBeDefined();
  });

  it("does not export unexpected items", () => {
    const expected = [
      "Block", "View", "Text", "Page", "Image", "Link", "Document",
      "Canvas", "Note", "PageNumber",
      "Tailwind", "useTw",
      "createTw", "tw", "resolveTheme",
      "cn",
      "Font", "StyleSheet", "PDFViewer", "PDFDownloadLink", "BlobProvider", "usePDF", "pdf",
      "Svg", "G", "Path", "Rect", "Circle", "Ellipse", "Line", "Polyline", "Polygon",
      "SvgText", "Tspan", "Defs", "ClipPath", "Stop", "LinearGradient", "RadialGradient",
    ];
    const exported = Object.keys(api);
    for (const key of exported) {
      expect(expected).toContain(key);
    }
  });
});
