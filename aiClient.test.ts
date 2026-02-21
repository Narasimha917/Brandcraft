import generateBrand from "./aiClient";
import { hexToName } from "./colorNames";

describe("generateBrand mock behavior", () => {
  it("returns a complete brand identity for given inputs", async () => {
    const body = {
      brandIdea: "Eco Coffee",
      industry: "Food & Beverage",
      preferredColors: ["#FF6B6B", "#06D6A0"]
    };

    const result: any = await generateBrand(body as any);

    expect(result).toBeDefined();
    expect(Array.isArray(result.brandNames)).toBe(true);
    expect(result.brandNames.length).toBeGreaterThan(0);
    expect(typeof result.tagline).toBe("string");
    expect(typeof result.missionStatement).toBe("string");
    expect(Array.isArray(result.colorSuggestions)).toBe(true);
    expect(result.colorSuggestions.length).toBeGreaterThanOrEqual(2);

    // If preferredColors passed, mock uses pickColors but at least returns hex strings
    for (const c of result.colorSuggestions) {
      expect(typeof c).toBe("string");
      expect(c.startsWith("#")).toBe(true);
      // Ensure friendly name mapping works
      const name = hexToName(c);
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
    }

    if (Array.isArray(result.logoConcepts)) {
      expect(result.logoConcepts.length).toBeGreaterThan(0);
      expect(result.logoConcepts[0].svg.includes("<svg")).toBe(true);
    } else {
      // some backends may return a different shape; print it for debugging and ensure at least other fields exist
      // eslint-disable-next-line no-console
      console.warn('logoConcepts missing or not array:', result.logoConcepts);
      expect(result.brandNames).toBeDefined();
      expect(result.colorSuggestions).toBeDefined();
    }
  }, 10000);
});
