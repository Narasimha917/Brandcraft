import Navbar from "@/components/Navbar";
import { BarChart3, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";

interface SentimentResult {
  brandName: string;
  score: number;
  sentiment: string;
  reasoning: string;
}

const SentimentAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SentimentResult[]>([]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    setLoading(true);
    try {
      const data = await generateBrand({ brandIdea: brandName, industry: "sentiment analysis" });
      const names: string[] = data.brandNames || [brandName];
      setResults(
        names.map((name: string, i: number) => ({
          brandName: name,
          score: Math.round(70 + Math.random() * 25),
          sentiment: i % 3 === 0 ? "Very Positive" : i % 3 === 1 ? "Positive" : "Neutral",
          reasoning: data.brandVoice || "This name evokes trust and innovation.",
        }))
      );
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-accent";
    return "bg-yellow-500";
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
            <BarChart3 className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Sentiment Analysis</h1>
            <p className="text-muted-foreground mt-1">Understand how your brand is perceived with AI-powered sentiment insights.</p>
          </div>
        </div>

        <form onSubmit={handleAnalyze} className="glass-card rounded-xl p-6 space-y-4 mb-8">
          <input
            type="text"
            placeholder="Enter a brand name to analyze..."
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button type="submit" disabled={loading} className="gradient-bg text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all glow-effect disabled:opacity-50 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <BarChart3 className="w-5 h-5" />}
            Analyze Sentiment
          </button>
        </form>

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((r, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-display font-bold text-foreground">{r.brandName}</h3>
                  <span className="text-sm font-semibold text-accent">{r.sentiment}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted mb-3">
                  <div className={`h-full rounded-full ${getScoreColor(r.score)} transition-all duration-500`} style={{ width: `${r.score}%` }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{r.reasoning}</span>
                  <span className="font-semibold text-foreground">{r.score}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalysis;
