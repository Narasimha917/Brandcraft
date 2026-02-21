import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!message || typeof message !== "string" || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Invalid feedback message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    // default to the address provided (per user request) but allow overriding via TO_EMAIL env
    const TO_EMAIL = Deno.env.get("TO_EMAIL") || "narasimhanaidu2728@gmail.com";
    if (!SENDGRID_API_KEY) {
      console.warn("send-feedback: SENDGRID_API_KEY not configured — feedback will be logged but not emailed");
      console.log(`Feedback received:\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nMessage:\n${message}`);
      return new Response(JSON.stringify({ success: true, delivered: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fromEmail = email && typeof email === "string" ? email : `no-reply@brandcraft.local`;

    // Build SendGrid email payload
    const payload = {
      personalizations: [
        {
          to: [{ email: TO_EMAIL }],
          subject: `New feedback from ${name || 'Customer'}`,
        },
      ],
      from: { email: fromEmail, name: name || "BrandCraft Feedback" },
      content: [
        { type: "text/plain", value: `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\n\nMessage:\n${message}` },
      ],
    };

    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("send-feedback error sending email:", res.status, t);
      throw new Error("Failed to send feedback email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-feedback error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
