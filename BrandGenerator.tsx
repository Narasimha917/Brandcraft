import { useState } from "react";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { toast } from "sonner";
import { hexToName, INDUSTRY_OPTIONS } from "@/lib/colorNames";

interface BrandResult {
  brandNames: string[];
  tagline: string;
  missionStatement: string;
  brandVoice: string;
  colorSuggestions: string[];
  elevatorPitch: string;
  logoConcepts?: { name?: string; description?: string; svg?: string }[];
}

const BrandGenerator = () => {
  const [input, setInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [preferredColors, setPreferredColors] = useState<string[]>(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrandResult | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter a brand idea or keyword");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const body: any = { brandIdea: input.trim(), industry: industry.trim() };
      const colors = preferredColors.map((c) => c.trim()).filter(Boolean);
      if (colors.length) body.preferredColors = colors;

      const data = await generateBrand(body);
      setResult(data as BrandResult);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate brand. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <span className="gradient-text">AI Brand Generator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter your idea and let AI create a complete brand identity for you.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Your Brand Idea / Keywords
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. eco-friendly coffee, tech startup, fitness app..."
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                maxLength={200}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Industry (optional)
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select industry (optional)</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Preferred colors (optional)</label>
              <p className="text-xs text-muted-foreground mb-2">Pick up to 5 colors the AI should prioritize for the palette / logo concepts.</p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                {preferredColors.map((c, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={c || '#ffffff'}
                        onChange={(e) => {
                          const copy = [...preferredColors];
                          copy[i] = e.target.value;
                          setPreferredColors(copy);
                        }}
                        className="w-10 h-10 p-0 border rounded"
                      />
                      <input
                        type="text"
                        value={c}
                        onChange={(e) => {
                          const copy = [...preferredColors];
                          let v = e.target.value.trim();
                          if (v && v[0] !== '#') v = '#' + v;
                          copy[i] = v.toUpperCase();
                          setPreferredColors(copy);
                        }}
                        placeholder={i === 0 ? "#FF6B6B" : "#00AEFF"}
                        className="flex-1 px-3 py-2 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground"
                        maxLength={7}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground pl-12">
                      {c ? hexToName(c) : "No color selected"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full gradient-bg text-primary-foreground py-4 rounded-xl font-display font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating your brand...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Brand Identity
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Brand Names */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Brand Name Suggestions
              </h2>
              <div className="flex flex-wrap gap-3">
                {result.brandNames.map((name, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-foreground font-display font-semibold text-lg"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold mb-3">Tagline</h2>
              <p className="text-2xl font-display gradient-accent-text font-semibold italic">
                "{result.tagline}"
              </p>
            </div>

            {/* Mission & Voice */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold mb-3">Mission Statement</h2>
                <p className="text-muted-foreground leading-relaxed">{result.missionStatement}</p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold mb-3">Brand Voice</h2>
                <p className="text-muted-foreground leading-relaxed">{result.brandVoice}</p>
              </div>
            </div>

            {/* Color Suggestions */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold mb-4">Color Palette</h2>
              <div className="flex flex-wrap gap-4">
                {result.colorSuggestions.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 rounded-xl border border-border shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-foreground font-semibold">{hexToName(color)}</span>
                    <span className="text-xs text-muted-foreground font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Concepts (if any) */}
            {result.logoConcepts && result.logoConcepts.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold mb-4">Logo Concepts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {result.logoConcepts.map((logo, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border bg-muted">
                      <div className="mb-3">
                        <div className="text-sm font-semibold">{logo.name || `Concept ${idx + 1}`}</div>
                        <div className="text-xs text-muted-foreground">{logo.description}</div>
                      </div>
                      <div className="mb-3">
                        {logo.svg ? (
                          <div className="border bg-white p-3 rounded" dangerouslySetInnerHTML={{ __html: logo.svg }} />
                        ) : (
                          <div className="text-muted-foreground">No SVG provided</div>
                        )}
                      </div>
                      {logo.svg && (
                        <a
                          className="text-primary font-semibold text-sm"
                          href={`data:image/svg+xml;utf8,${encodeURIComponent(logo.svg)}`}
                          download={`${(logo.name || `logo-${idx + 1}`).replace(/\s+/g, "-")}.svg`}
                        >
                          Download SVG
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Elevator Pitch */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold mb-3">Elevator Pitch</h2>
              <p className="text-foreground leading-relaxed text-lg">{result.elevatorPitch}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandGenerator;
