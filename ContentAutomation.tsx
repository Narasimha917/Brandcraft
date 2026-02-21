import Navbar from "@/components/Navbar";
import { PenTool, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";

const ContentAutomation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brandIdea, setBrandIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ tagline: string; missionStatement: string; elevatorPitch: string } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandIdea.trim()) return;
    setLoading(true);
    try {
      const data = await generateBrand({ brandIdea, industry: "content marketing" });
      setResult({ tagline: data.tagline, missionStatement: data.missionStatement, elevatorPitch: data.elevatorPitch });
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
            <PenTool className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Content Automation</h1>
            <p className="text-muted-foreground mt-1">Generate taglines, bios, mission statements, and marketing copy effortlessly.</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="glass-card rounded-xl p-6 space-y-4 mb-8">
          <input
            type="text"
            placeholder="Describe your brand or product..."
            value={brandIdea}
            onChange={(e) => setBrandIdea(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button type="submit" disabled={loading} className="gradient-bg text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all glow-effect disabled:opacity-50 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <PenTool className="w-5 h-5" />}
            Generate Content
          </button>
        </form>

        {result && (
          <div className="space-y-4">
            {[
              { label: "Tagline", value: result.tagline },
              { label: "Mission Statement", value: result.missionStatement },
              { label: "Elevator Pitch", value: result.elevatorPitch },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-6">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{item.label}</span>
                <p className="text-foreground mt-2 leading-relaxed text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentAutomation;
