import Navbar from "@/components/Navbar";
import { MessageSquare, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateBrand } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BrandingAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI branding assistant. Ask me anything about brand strategy, naming, positioning, or visual identity." },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const data = await generateBrand({ brandIdea: userMsg, industry: "branding advice" });
      const reply = `Here are my suggestions:\n\n**Tagline:** ${data.tagline}\n\n**Brand Voice:** ${data.brandVoice}\n\n**Elevator Pitch:** ${data.elevatorPitch}`;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="pt-28 pb-4 px-6 max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center glow-effect">
            <MessageSquare className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Branding Assistant</h1>
            <p className="text-muted-foreground mt-1">Chat with an AI branding expert for personalized strategy.</p>
          </div>
        </div>

        <div className="glass-card rounded-xl flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-5 py-3 ${msg.role === "user" ? "gradient-bg text-primary-foreground" : "bg-muted text-foreground"}`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl px-5 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-3">
            <input
              type="text"
              placeholder="Ask about branding..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button type="submit" disabled={loading} className="gradient-bg text-primary-foreground p-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandingAssistant;
