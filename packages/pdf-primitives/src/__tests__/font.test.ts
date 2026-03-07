import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@react-pdf/renderer", () => ({
  Font: { register: vi.fn() },
}));

import { Font } from "@react-pdf/renderer";
import { defineFont } from "../font";

const mockRegister = Font.register as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockRegister.mockClear();
});

describe("defineFont()", () => {
  it("registers a single-source font", () => {
    const result = defineFont({
      family: "Inter",
      src: "/fonts/Inter-Regular.ttf",
    });

    expect(mockRegister).toHaveBeenCalledOnce();
    expect(mockRegister).toHaveBeenCalledWith({
      family: "Inter",
      src: "/fonts/Inter-Regular.ttf",
    });
    expect(result.family).toBe("Inter");
    expect(result.className).toBe("font-[Inter]");
    expect(result.style).toEqual({ fontFamily: "Inter" });
  });

  it("registers a multi-variant font family", () => {
    const result = defineFont({
      family: "Inter",
      src: [
        { src: "/fonts/Inter-Regular.ttf", weight: 400 },
        { src: "/fonts/Inter-Bold.ttf", weight: 700 },
        { src: "/fonts/Inter-Italic.ttf", weight: 400, style: "italic" },
      ],
    });

    expect(mockRegister).toHaveBeenCalledOnce();
    expect(mockRegister).toHaveBeenCalledWith({
      family: "Inter",
      fonts: [
        { src: "/fonts/Inter-Regular.ttf", fontWeight: 400, fontStyle: undefined },
        { src: "/fonts/Inter-Bold.ttf", fontWeight: 700, fontStyle: undefined },
        { src: "/fonts/Inter-Italic.ttf", fontWeight: 400, fontStyle: "italic" },
      ],
    });
    expect(result.family).toBe("Inter");
    expect(result.className).toBe("font-[Inter]");
    expect(result.style).toEqual({ fontFamily: "Inter" });
  });

  it("passes through remote fetch options", () => {
    defineFont({
      family: "Custom",
      src: [
        {
          src: "https://example.com/font.woff2",
          weight: 400,
          headers: { Authorization: "Bearer token" },
        },
      ],
    });

    expect(mockRegister).toHaveBeenCalledWith({
      family: "Custom",
      fonts: [
        {
          src: "https://example.com/font.woff2",
          fontWeight: 400,
          fontStyle: undefined,
          headers: { Authorization: "Bearer token" },
        },
      ],
    });
  });

  it("className works with tw engine", async () => {
    const { tw } = await import("../tw");
    const font = defineFont({ family: "MyFont", src: "/fonts/MyFont.ttf" });
    const styles = tw(font.className);
    expect(styles).toEqual({ fontFamily: "MyFont" });
  });
});
