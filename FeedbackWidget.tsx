import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const FeedbackWidget = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!message.trim()) return toast.error("Please enter a message");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-feedback", {
        body: { name: name.trim(), email: email.trim(), message: message.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success("Feedback sent — thank you!");
      setName("");
      setEmail("");
      setMessage("");
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Have feedback?</div>
            <div className="text-xs text-muted-foreground">We read every message and respect your privacy.</div>
          </div>
          <div>
            <button onClick={() => setOpen(!open)} className="text-sm font-semibold text-primary">
              {open ? "Close" : "Send Feedback"}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 space-y-3">
            <input placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-muted border border-border" />
            <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-muted border border-border" />
            <textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-xl bg-muted border border-border" />
            <div className="flex justify-end">
              <button disabled={loading} onClick={submit} className="gradient-bg text-primary-foreground px-4 py-2 rounded-xl font-semibold">
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackWidget;
