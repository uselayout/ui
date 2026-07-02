// Compiles every layout.design gallery kit into a [data-brand="<slug>"] theme
// block and regenerates the brand manifest for the docs BrandSwitcher.
//
//   node scripts/sync-kit-themes.mjs                       # production gallery
//   LAYOUT_API=https://staging.layout.design node scripts/sync-kit-themes.mjs
//
// Kits with a v2 style profile compile deterministically. Kits without one
// are skipped (listed at the end); hand-authored fallbacks live in
// app/themes.css and are kept for those slugs only.
//
// Outputs:
//   app/kit-themes.css      (generated, imported by globals.css)
//   lib/docs/brands.json    (BrandSwitcher manifest)

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.LAYOUT_API ?? "https://layout.design";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Slugs that have hand-authored blocks in app/themes.css. Generated blocks
// win when both exist (kit-themes.css is imported after themes.css), so we
// only keep hand-authored ones when the kit has no style profile.
const HAND_AUTHORED = ["stripe", "linear", "notion"];

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------

function parseColour(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  let m = v.match(/^#([0-9a-f]{3})$/i);
  if (m) {
    const [r, g, b] = m[1].split("").map((c) => parseInt(c + c, 16));
    return { r, g, b, a: 1 };
  }
  m = v.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return {
      r: (n >> 16) & 255,
      g: (n >> 8) & 255,
      b: n & 255,
      a: m[2] ? parseInt(m[2], 16) / 255 : 1,
    };
  }
  m = v.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  }
  return null;
}

function luminance(colour) {
  const chan = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(colour.r) + 0.7152 * chan(colour.g) + 0.0722 * chan(colour.b);
}

/** White or near-black, whichever contrasts better on the given colour. */
function contrastFg(value) {
  const c = parseColour(value);
  if (!c) return "#ffffff";
  return luminance(c) > 0.45 ? "#111111" : "#ffffff";
}

/** WCAG contrast ratio between two colour strings (1 when unparseable). */
function contrastRatio(a, b) {
  const ca = parseColour(a);
  const cb = parseColour(b);
  if (!ca || !cb) return 1;
  const la = luminance(ca);
  const lb = luminance(cb);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Some kit profiles carry text colours that do not read against their own
 * background (bad extractions). Guard: if the text token is close to
 * invisible on bg, replace it with a translucent version of the main fg.
 */
function legibleOn(bg, text, fallbackFg, alpha) {
  if (text && contrastRatio(bg, text) >= 1.9) return text;
  const fg = parseColour(fallbackFg);
  if (!fg) return text ?? null;
  return `rgba(${fg.r}, ${fg.g}, ${fg.b}, ${alpha})`;
}

// ---------------------------------------------------------------------------
// Style profile → --layout-* block
// ---------------------------------------------------------------------------

function normaliseRadius(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const v = value.trim();
  // Reject var() and other non-literal values; the compiler needs a literal.
  if (!/^[\d.]+(px|rem|em)$/.test(v)) return null;
  return v;
}

const DENSITY_UNIT = { compact: "0.215rem", comfortable: "0.25rem", airy: "0.27rem" };

function compileTheme(slug, profile) {
  const c = profile.colours ?? {};
  const lines = [];
  const push = (token, value) => {
    if (value) lines.push(`  ${token}: ${value};`);
  };

  push("--layout-bg", c.bg);
  push("--layout-fg", c.headingText ?? c.text);
  push("--layout-surface", c.surface);
  push("--layout-surface-fg", c.headingText ?? c.text);
  push("--layout-overlay", c.surfaceElevated ?? c.surface);
  push("--layout-overlay-fg", c.headingText ?? c.text);

  push("--layout-primary", c.accent);
  push("--layout-primary-fg", c.onAccent ?? contrastFg(c.accent));
  push("--layout-secondary", c.accentSubtle ?? c.surfaceElevated);
  push("--layout-secondary-fg", c.accentSubtle ? c.accent : c.headingText);
  const fg = c.headingText ?? c.text;
  push("--layout-muted", c.surfaceElevated ?? c.surface);
  push("--layout-muted-fg", legibleOn(c.bg, c.textMuted ?? c.text, fg, 0.65));
  push("--layout-accent", c.accentSubtle ?? c.surfaceElevated);
  push("--layout-accent-fg", c.headingText ?? c.text);

  push("--layout-danger", c.error);
  push("--layout-danger-fg", c.error ? contrastFg(c.error) : null);
  push("--layout-success", c.success);
  push("--layout-success-fg", c.success ? contrastFg(c.success) : null);
  push("--layout-warning", c.warning);
  push("--layout-warning-fg", c.warning ? contrastFg(c.warning) : null);

  push("--layout-border", c.border);
  push("--layout-input", c.border);
  push("--layout-ring", c.borderStrong ?? c.accent);

  const radius = normaliseRadius(profile.card?.radius) ?? normaliseRadius(profile.button?.radius);
  push("--layout-radius", radius);

  if (profile.button?.primaryShadow) {
    push("--layout-shadow-xs", profile.button.primaryShadow);
  }

  const unit = DENSITY_UNIT[profile.density];
  if (unit && unit !== DENSITY_UNIT.comfortable) {
    push("--layout-space-unit", unit);
  }

  if (!lines.length) return null;
  return `[data-brand="${slug}"] {\n${lines.join("\n")}\n}`;
}

// ---------------------------------------------------------------------------
// Fetch + emit
// ---------------------------------------------------------------------------

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

const { kits } = await getJson(`${API}/api/public/kits?limit=120`);
console.log(`Gallery kits: ${kits.length} (from ${API})`);

const blocks = [];
const brands = [];
const skipped = [];

// Fetch details with limited concurrency.
const queue = [...kits];
async function worker() {
  while (queue.length) {
    const summary = queue.shift();
    try {
      const { kit } = await getJson(`${API}/api/public/kits/${summary.slug}`);
      const profile = kit.styleProfile;
      if (!profile?.colours) {
        skipped.push(summary.slug);
        continue;
      }
      const block = compileTheme(kit.slug, profile);
      if (!block) {
        skipped.push(summary.slug);
        continue;
      }
      blocks.push({ slug: kit.slug, block });
      brands.push({ slug: kit.slug, name: kit.name, mode: profile.mode ?? "light" });
    } catch (err) {
      skipped.push(`${summary.slug} (${err.message})`);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

blocks.sort((a, b) => a.slug.localeCompare(b.slug));
brands.sort((a, b) => a.name.localeCompare(b.name));

// Keep hand-authored fallbacks for kits that did not compile.
for (const slug of HAND_AUTHORED) {
  if (!brands.some((b) => b.slug === slug)) {
    brands.push({ slug, name: slug[0].toUpperCase() + slug.slice(1), mode: slug === "linear" ? "dark" : "light" });
  }
}
brands.sort((a, b) => a.name.localeCompare(b.name));

const css = [
  "/* GENERATED FILE. Do not edit.",
  " * Compiled from layout.design gallery kit style profiles.",
  " * Regenerate with: npm run sync:kits",
  " */",
  "",
  blocks.map((b) => b.block).join("\n\n"),
  "",
].join("\n");

writeFileSync(join(root, "app/kit-themes.css"), css);
writeFileSync(join(root, "lib/docs/brands.json"), JSON.stringify(brands, null, 2) + "\n");

console.log(`Compiled ${blocks.length} themes → app/kit-themes.css`);
console.log(`Brand manifest: ${brands.length} entries → lib/docs/brands.json`);
if (skipped.length) console.log(`Skipped (no style profile): ${skipped.join(", ")}`);
