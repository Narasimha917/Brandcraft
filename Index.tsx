import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import FeedbackWidget from "@/components/FeedbackWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="features">
        <FeaturesGrid />
      </div>
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          © 2026 BrandCraft. AI-powered brand building platform.
          <div className="mt-6">
            <FeedbackWidget />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
