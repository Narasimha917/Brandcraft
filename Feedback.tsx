import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter your feedback message");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-feedback", {
        body: { name: name.trim(), email: email.trim(), message: message.trim() },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success("Thanks — your feedback was sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to send feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold">Send Feedback</h1>
          <p className="text-muted-foreground mt-2">Tell us what you liked or what could be improved — we'll receive it by email.</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Name (optional)</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email (optional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
            </div>

            <div>
              <button onClick={handleSubmit} disabled={loading} className="w-full gradient-bg text-primary-foreground py-3 rounded-xl font-semibold">
                {loading ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
