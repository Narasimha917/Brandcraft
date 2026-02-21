import Navbar from "@/components/Navbar";
import { Palette, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";

const LogoConcepts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    setLoading(true);
    try {
      const data = await generateBrand({ brandIdea: brandName, industry: "visual identity" });
      setColors(data.colorSuggestions || []);
      setDescription(data.brandVoice || "");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center glow-effect">
            <Palette className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Logo Concepts</h1>
            <p className="text-muted-foreground mt-1">Get AI-generated logo ideas and visual identity direction instantly.</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="glass-card rounded-xl p-6 space-y-4 mb-8">
          <input
            type="text"
            placeholder="Enter your brand name..."
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button type="submit" disabled={loading} className="gradient-bg text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all glow-effect disabled:opacity-50 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Palette className="w-5 h-5" />}
            Generate Visual Identity
          </button>
        </form>

        {colors.length > 0 && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Brand Color Palette</h3>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-xl border border-border" style={{ backgroundColor: color }} />
                    <span className="text-xs text-muted-foreground font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            {description && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">Visual Direction</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoConcepts;
