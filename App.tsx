import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Generate from "./pages/Generate";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BrandNameGeneration from "./pages/features/BrandNameGeneration";
import LogoConcepts from "./pages/features/LogoConcepts";
import ContentAutomation from "./pages/features/ContentAutomation";
import SentimentAnalysis from "./pages/features/SentimentAnalysis";
import BrandingAssistant from "./pages/features/BrandingAssistant";
import InstantWorkflow from "./pages/features/InstantWorkflow";
import VisualAssetLibrary from "./pages/features/VisualAssetLibrary";
import Feedback from "./pages/Feedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/features/brand-names" element={<BrandNameGeneration />} />
          <Route path="/features/logo-concepts" element={<LogoConcepts />} />
          <Route path="/features/content-automation" element={<ContentAutomation />} />
          <Route path="/features/sentiment-analysis" element={<SentimentAnalysis />} />
          <Route path="/features/branding-assistant" element={<BrandingAssistant />} />
          <Route path="/features/visual-assets" element={<VisualAssetLibrary />} />
          <Route path="/features/instant-workflow" element={<InstantWorkflow />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
