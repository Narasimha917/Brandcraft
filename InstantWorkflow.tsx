import Navbar from "@/components/Navbar";
import { Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { step: "1", title: "Enter Your Brand Idea", desc: "Describe your vision, product, or target audience in a few words." },
  { step: "2", title: "AI Generates Identity", desc: "Our AI creates brand names, taglines, color palettes, and copy instantly." },
  { step: "3", title: "Refine & Customize", desc: "Tweak the results, ask the branding assistant for advice, and iterate." },
  { step: "4", title: "Export Your Brand Kit", desc: "Download your complete brand identity — ready to launch." },
];

const InstantWorkflow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center glow-effect">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Instant Workflow</h1>
            <p className="text-muted-foreground mt-1">From idea to full brand kit in minutes — not weeks.</p>
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="glass-card rounded-xl p-6 flex items-start gap-5 hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 font-display font-bold text-lg text-primary-foreground">
                {s.step}
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/generate")}
            className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-display font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-effect mx-auto"
          >
            Start Building Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstantWorkflow;
