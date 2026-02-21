import { supabase } from "@/integrations/supabase/client";

type Body = Record<string, any>;

function hashStringToInt(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i) | 0;
  return Math.abs(h);
}

function pickColors(seed: string, count = 5) {
  const base = ["#1F7A8C", "#FF6B6B", "#FFD166", "#06D6A0", "#4CC9F0", "#7209B7", "#F72585", "#3A86FF"];
  const start = hashStringToInt(seed) % base.length;
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(base[(start + i) % base.length]);
  return out;
}

function makeMockSVG(name: string, color: string, variant = 0) {
  const safe = (name || "Brand").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const bg = color || "#1F7A8C";
  const fg = "#ffffff";
  if (variant === 0) {
    const initials = safe.split(/\s+/).map(s => s[0] || '').slice(0,2).join('').toUpperCase() || 'B';
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'>\n  <rect width='100%' height='100%' fill='#ffffff'/>\n  <circle cx='100' cy='100' r='64' fill='${bg}'/>\n  <text x='100' y='110' font-family='Inter, Arial' font-weight='700' font-size='48' fill='${fg}' text-anchor='middle'>${initials}</text>\n  <text x='220' y='110' font-family='Inter, Arial' font-weight='600' font-size='28' fill='#111827'>${safe}</text>\n</svg>`;
  }
  if (variant === 1) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'>\n  <rect width='100%' height='100%' rx='20' fill='${bg}'/>\n  <rect x='0' y='140' width='400' height='60' fill='rgba(0,0,0,0.08)'/>\n  <text x='50%' y='60' font-family='Inter, Arial' font-weight='700' font-size='34' fill='${fg}' text-anchor='middle'>${safe}</text>\n  <text x='50%' y='120' font-family='Inter, Arial' font-weight='500' font-size='16' fill='${fg}' text-anchor='middle'>${safe} · AI Concept</text>\n</svg>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120' viewBox='0 0 400 120'>\n  <rect width='100%' height='100%' fill='#ffffff'/>\n  <text x='50%' y='60%' font-family='Inter, Arial' font-weight='700' font-size='36' fill='${bg}' text-anchor='middle' dominant-baseline='middle'>${safe}</text>\n</svg>`;
}

async function callSupabaseGenerate(body: Body) {
  // Use Supabase Functions if configured
  try {
    const { data, error } = await (supabase as any).functions.invoke("generate-brand", { body });
    if (error) throw error;
    return data;
  } catch (e) {
    throw e;
  }
}

export async function generateBrand(body: Body) {
  const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  if (hasSupabase) {
    return await callSupabaseGenerate(body);
  }

  // Mock fallback when Supabase / AI key aren't configured — keeps UI functional in local dev
  const idea = (body.brandIdea || body.brandName || body.brand || "Brand").toString();
  const industry = (body.industry || "general").toString();
  const seed = idea + "::" + industry;
  const brandNames = Array.from({ length: 5 }).map((_, i) => `${idea.split(" ")[0] || "Brand"}${['','ify','ly','Co','Labs'][i]}`);
  const colors = pickColors(seed, 5);
  const tagline = `${idea} for modern ${industry}`;
  const missionStatement = `We create memorable ${industry} experiences that put users first.`;
  const brandVoice = `Friendly, professional, and clear.`;
  const elevatorPitch = `A modern ${industry} solution that helps customers achieve their goals with ${idea}.`;
  const logoConcepts = brandNames.slice(0,3).map((n, i) => ({ name: n, description: `AI mock concept for ${n}`, svg: makeMockSVG(n, colors[i % colors.length], i % 3) }));

  return {
    brandNames,
    tagline,
    missionStatement,
    brandVoice,
    colorSuggestions: colors,
    elevatorPitch,
    logoConcepts,
  };
}

export default generateBrand;
