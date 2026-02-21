import Navbar from "@/components/Navbar";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";

const BrandNameGeneration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brandIdea, setBrandIdea] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<string[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandIdea.trim()) return;
    setLoading(true);
    try {
      const data = await generateBrand({ brandIdea, industry });
      setNames(data.brandNames || []);
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
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Brand Name Generation</h1>
            <p className="text-muted-foreground mt-1">AI crafts unique, memorable brand names tailored to your industry and vision.</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="glass-card rounded-xl p-6 space-y-4 mb-8">
          <input
            type="text"
            placeholder="Describe your brand idea..."
            value={brandIdea}
            onChange={(e) => setBrandIdea(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <input
            type="text"
            placeholder="Industry (optional)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button type="submit" disabled={loading} className="gradient-bg text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all glow-effect disabled:opacity-50 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Names
          </button>
        </form>

        {names.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {names.map((name, i) => (
              <div key={i} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all">
                <span className="text-xs text-muted-foreground">Option {i + 1}</span>
                <h3 className="text-xl font-display font-bold gradient-text mt-1">{name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandNameGeneration;
