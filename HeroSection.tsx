import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-accent" />
          AI-Powered Brand Building Platform
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
          Build Your
          <br />
          <span className="gradient-text">Dream Brand</span>
          <br />
          with AI
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          From brand names to logos, taglines to full identity — our AI generates
          everything you need to launch your brand in minutes.
        </p>

        <div className="text-sm text-muted-foreground mb-8">
          <span className="font-semibold">10,000+ Happy Users</span>
          <span className="mx-2">·</span>
          <span>4.9/5 rating</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/generate")}
            className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-display font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 glow-effect"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("features");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-xl font-display font-semibold text-lg border border-border text-foreground hover:bg-muted transition-all duration-300"
          >
            See Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
