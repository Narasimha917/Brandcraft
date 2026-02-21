import { Sparkles, Zap, PenTool, BarChart3, MessageSquare, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Sparkles,
    title: "Brand Identity Generator",
    description: "Create cohesive brand identities with AI-powered color palettes, typography, and guidelines.",
    path: "/features/branding-assistant",
  },
  {
    icon: PenTool,
    title: "AI Content Writer",
    description: "Generate compelling brand copy, taglines, and marketing content tailored to your voice.",
    path: "/features/content-automation",
  },
  {
    icon: Palette,
    title: "Logo Creator",
    description: "Design professional logos with intelligent templates and customization options.",
    path: "/features/logo-concepts",
  },
  {
    icon: Zap,
    title: "Visual Asset Library",
    description: "Access thousands of AI-generated images, icons, and graphics for your brand.",
    path: "/features/visual-assets",
  },
  {
    icon: BarChart3,
    title: "Sentiment Analyzer",
    description: "Analyze brand messaging sentiment to ensure positive audience reception.",
    path: "/features/sentiment-analysis",
  },
  {
    icon: MessageSquare,
    title: "Branding Assistant",
    description: "Your 24/7 AI companion for branding decisions and creative guidance.",
    path: "/features/branding-assistant",
  },
];

const FeaturesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="gradient-text">Build a Brand</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by cutting-edge generative AI to automate every step of your branding journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <button
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group text-left cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-effect transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
