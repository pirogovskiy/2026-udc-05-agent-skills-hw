import { describe, expect, it } from "vitest";
import { listWidgets, create } from "../../index.js";

describe("alert widget", () => {
  it("is discoverable via listWidgets", () => {
    expect(listWidgets()).toContain("alert");
  });

  it("renders with default info tone", () => {
    const result = create("alert", { message: "Hello" });
    expect(result).toBe('<div class="alert alert--info">Hello</div>');
  });

  it("renders with explicit tone", () => {
    const result = create("alert", { message: "Danger", tone: "error" });
    expect(result).toBe('<div class="alert alert--error">Danger</div>');
  });

  it("escapes HTML in message", () => {
    const result = create("alert", { message: "<script>alert('xss')</script>" });
    expect(result).toContain("&lt;script&gt;");
    expect(result).not.toContain("<script>");
  });

  it("rejects invalid tone and defaults to info", () => {
    const result = create("alert", { message: "Test", tone: "invalid" as any });
    expect(result).toContain("alert--info");
  });
});
