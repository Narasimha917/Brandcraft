// Simple utility to map hex colors to human-friendly names.
// Uses a small palette of common colors and finds the closest match when needed.

function hexToRgb(hex: string) {
  const h = hex.replace('#', '').trim();
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

const PALETTE: Record<string,string> = {
  '#FFFFFF': 'White',
  '#000000': 'Black',
  '#FF0000': 'Red',
  '#00FF00': 'Lime',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FFA500': 'Orange',
  '#800080': 'Purple',
  '#FFC0CB': 'Pink',
  '#808080': 'Gray',
  '#1F7A8C': 'Teal',
  '#FF6B6B': 'Coral',
  '#FFD166': 'Warm Yellow',
  '#06D6A0': 'Mint',
  '#4CC9F0': 'Sky Blue',
  '#7209B7': 'Violet',
  '#F72585': 'Magenta',
  '#3A86FF': 'Royal Blue',
  '#00AEFF': 'Azure'
};

function colorDistance(a: number[], b: number[]) {
  return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

export function hexToName(hex?: string) {
  if (!hex) return 'Unknown';
  const h = hex.toUpperCase();
  if (PALETTE[h]) return PALETTE[h];
  try {
    const rgb = hexToRgb(hex);
    let best = '';
    let bestDist = Infinity;
    for (const k of Object.keys(PALETTE)) {
      const r = hexToRgb(k);
      const d = colorDistance(rgb, r);
      if (d < bestDist) {
        bestDist = d;
        best = PALETTE[k];
      }
    }
    return best || hex;
  } catch (e) {
    return hex;
  }
}

export const INDUSTRY_OPTIONS = [
  'Food & Beverage',
  'Technology',
  'Health & Wellness',
  'Fashion',
  'Finance',
  'Education',
  'Entertainment',
  'Retail',
  'SaaS',
  'Other'
];

export default hexToName;
