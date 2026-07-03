"use client";

import * as React from "react";
import {
  Shuffle,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  AlertCircle,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import JSZip from "jszip";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/layout/button/button";
import { Badge } from "@/registry/layout/badge/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/layout/card/card";
import { Input } from "@/registry/layout/input/input";
import { Label } from "@/registry/layout/label/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/layout/tabs/tabs";
import { CodeBlock } from "@/components/docs/CodeBlock";
import brandsManifest from "@/lib/docs/brands.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BrandEntry {
  slug: string;
  name: string;
  mode: string;
}

const BRANDS = brandsManifest as BrandEntry[];

type RadiusOption = "0" | "0.25rem" | "0.5rem" | "0.625rem" | "1rem";
type DensityOption = "comfortable" | "compact";
type ShadowOption = "none" | "subtle" | "normal" | "dramatic";

interface FontOption {
  label: string;
  /** CSS font-family stack value */
  stack: string;
  /** Google Fonts family name (null = system font, no loading needed) */
  googleFamily: string | null;
}

const FONT_OPTIONS: FontOption[] = [
  { label: "Geist (default)", stack: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif", googleFamily: null },
  { label: "System UI", stack: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", googleFamily: null },
  { label: "Georgia", stack: "Georgia, 'Times New Roman', serif", googleFamily: null },
  { label: "Monospace", stack: "var(--font-geist-mono), ui-monospace, 'SF Mono', monospace", googleFamily: null },
  { label: "Inter", stack: "'Inter', ui-sans-serif, system-ui, sans-serif", googleFamily: "Inter" },
  { label: "Manrope", stack: "'Manrope', ui-sans-serif, system-ui, sans-serif", googleFamily: "Manrope" },
  { label: "Space Grotesk", stack: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif", googleFamily: "Space+Grotesk" },
  { label: "Playfair Display", stack: "'Playfair Display', Georgia, serif", googleFamily: "Playfair+Display" },
  { label: "IBM Plex Sans", stack: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif", googleFamily: "IBM+Plex+Sans" },
  { label: "Lora", stack: "'Lora', Georgia, serif", googleFamily: "Lora" },
  { label: "DM Sans", stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif", googleFamily: "DM+Sans" },
  { label: "Fraunces", stack: "'Fraunces', Georgia, serif", googleFamily: "Fraunces" },
];

/** CSS values for each shadow preset (xs, sm, md, lg, xl) */
const SHADOW_SETS: Record<ShadowOption, string[]> = {
  none: ["none", "none", "none", "none", "none"],
  subtle: [
    "0 1px 2px oklch(0.2 0.01 95 / 0.06)",
    "0 1px 2px oklch(0.2 0.01 95 / 0.08), 0 1px 3px oklch(0.2 0.01 95 / 0.06)",
    "0 2px 4px oklch(0.2 0.01 95 / 0.06), 0 4px 8px oklch(0.2 0.01 95 / 0.06)",
    "0 4px 8px oklch(0.2 0.01 95 / 0.06), 0 12px 24px oklch(0.2 0.01 95 / 0.08)",
    "0 8px 16px oklch(0.2 0.01 95 / 0.08), 0 24px 48px oklch(0.2 0.01 95 / 0.1)",
  ],
  normal: [
    "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.08)",
    "0 2px 4px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
    "0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08)",
    "0 8px 16px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.08)",
    "0 16px 32px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
  ],
  dramatic: [
    "0 2px 8px rgba(0,0,0,0.14)",
    "0 4px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.1)",
    "0 8px 24px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.1)",
    "0 16px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)",
    "0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.12)",
  ],
};

// Default status colour hex values (from globals.css)
const DEFAULT_SUCCESS = "#22c55e"; // approximate oklch(0.55 0.13 155)
const DEFAULT_WARNING = "#eab308"; // approximate oklch(0.6 0.13 75)
const DEFAULT_DANGER  = "#ef4444"; // approximate oklch(0.55 0.2 27)

interface ThemeState {
  kit: string;
  primary: string;
  radius: RadiusOption;
  density: DensityOption;
  darkPreview: boolean;
  headingFont: string;
  bodyFont: string;
  shadows: ShadowOption;
  success: string;
  warning: string;
  danger: string;
}

const DEFAULT_STATE: ThemeState = {
  kit: "default",
  primary: "#000000",
  radius: "0.625rem",
  density: "comfortable",
  darkPreview: false,
  headingFont: FONT_OPTIONS[0].stack,
  bodyFont: FONT_OPTIONS[0].stack,
  shadows: "subtle",
  success: DEFAULT_SUCCESS,
  warning: DEFAULT_WARNING,
  danger: DEFAULT_DANGER,
};

const RADIUS_OPTIONS: { label: string; value: RadiusOption }[] = [
  { label: "None", value: "0" },
  { label: "SM", value: "0.25rem" },
  { label: "MD", value: "0.5rem" },
  { label: "LG", value: "0.625rem" },
  { label: "XL", value: "1rem" },
];

const SHADOW_OPTIONS: { label: string; value: ShadowOption }[] = [
  { label: "None", value: "none" },
  { label: "Subtle", value: "subtle" },
  { label: "Normal", value: "normal" },
  { label: "Dramatic", value: "dramatic" },
];

// All --layout-* token names we collect via getComputedStyle for the download bundle
const LAYOUT_TOKEN_NAMES = [
  "--layout-bg",
  "--layout-fg",
  "--layout-surface",
  "--layout-surface-fg",
  "--layout-overlay",
  "--layout-overlay-fg",
  "--layout-primary",
  "--layout-primary-fg",
  "--layout-secondary",
  "--layout-secondary-fg",
  "--layout-muted",
  "--layout-muted-fg",
  "--layout-accent",
  "--layout-accent-fg",
  "--layout-danger",
  "--layout-danger-fg",
  "--layout-success",
  "--layout-success-fg",
  "--layout-warning",
  "--layout-warning-fg",
  "--layout-border",
  "--layout-input",
  "--layout-ring",
  "--layout-radius",
  "--layout-font-sans",
  "--layout-font-display",
  "--layout-font-mono",
  "--layout-shadow-xs",
  "--layout-shadow-sm",
  "--layout-shadow-md",
  "--layout-shadow-lg",
  "--layout-shadow-xl",
  "--layout-duration-fast",
  "--layout-duration-base",
  "--layout-duration-slow",
  "--layout-space-unit",
] as const;

// Fallback values when getComputedStyle returns empty (should be rare)
const TOKEN_FALLBACKS: Record<string, string> = {
  "--layout-bg": "oklch(0.99 0.002 95)",
  "--layout-fg": "oklch(0.21 0.006 95)",
  "--layout-surface": "oklch(1 0 0)",
  "--layout-surface-fg": "oklch(0.21 0.006 95)",
  "--layout-overlay": "oklch(1 0 0)",
  "--layout-overlay-fg": "oklch(0.21 0.006 95)",
  "--layout-primary": "oklch(0.24 0.006 95)",
  "--layout-primary-fg": "oklch(0.99 0.002 95)",
  "--layout-secondary": "oklch(0.955 0.004 95)",
  "--layout-secondary-fg": "oklch(0.24 0.006 95)",
  "--layout-muted": "oklch(0.965 0.004 95)",
  "--layout-muted-fg": "oklch(0.52 0.008 95)",
  "--layout-accent": "oklch(0.945 0.005 95)",
  "--layout-accent-fg": "oklch(0.24 0.006 95)",
  "--layout-danger": "oklch(0.55 0.2 27)",
  "--layout-danger-fg": "oklch(0.99 0.002 95)",
  "--layout-success": "oklch(0.55 0.13 155)",
  "--layout-success-fg": "oklch(0.99 0.002 95)",
  "--layout-warning": "oklch(0.6 0.13 75)",
  "--layout-warning-fg": "oklch(0.99 0.002 95)",
  "--layout-border": "oklch(0.91 0.004 95)",
  "--layout-input": "oklch(0.89 0.004 95)",
  "--layout-ring": "oklch(0.55 0.008 95)",
  "--layout-radius": "0.625rem",
  "--layout-font-sans": "ui-sans-serif, system-ui, sans-serif",
  "--layout-font-display": "ui-sans-serif, system-ui, sans-serif",
  "--layout-font-mono": "ui-monospace, monospace",
  "--layout-shadow-xs": "0 1px 2px oklch(0.2 0.01 95 / 0.06)",
  "--layout-shadow-sm": "0 1px 2px oklch(0.2 0.01 95 / 0.08), 0 1px 3px oklch(0.2 0.01 95 / 0.06)",
  "--layout-shadow-md": "0 2px 4px oklch(0.2 0.01 95 / 0.06), 0 4px 8px oklch(0.2 0.01 95 / 0.06)",
  "--layout-shadow-lg": "0 4px 8px oklch(0.2 0.01 95 / 0.06), 0 12px 24px oklch(0.2 0.01 95 / 0.08)",
  "--layout-shadow-xl": "0 8px 16px oklch(0.2 0.01 95 / 0.08), 0 24px 48px oklch(0.2 0.01 95 / 0.1)",
  "--layout-duration-fast": "100ms",
  "--layout-duration-base": "150ms",
  "--layout-duration-slow": "250ms",
  "--layout-space-unit": "0.25rem",
};

// ---------------------------------------------------------------------------
// URL serialisation helpers
// ---------------------------------------------------------------------------

const PARAM_KEYS: Array<keyof ThemeState> = [
  "kit",
  "primary",
  "radius",
  "density",
  "darkPreview",
  "headingFont",
  "bodyFont",
  "shadows",
  "success",
  "warning",
  "danger",
];

function stateToParams(state: ThemeState): URLSearchParams {
  const p = new URLSearchParams();
  for (const key of PARAM_KEYS) {
    const val = state[key];
    const defVal = DEFAULT_STATE[key];
    const serialised = String(val);
    const serialisedDefault = String(defVal);
    if (serialised !== serialisedDefault) {
      p.set(key, serialised);
    }
  }
  return p;
}

function paramsToState(params: URLSearchParams): Partial<ThemeState> {
  const patch: Partial<ThemeState> = {};
  const raw = {
    kit: params.get("kit"),
    primary: params.get("primary"),
    radius: params.get("radius") as RadiusOption | null,
    density: params.get("density") as DensityOption | null,
    darkPreview: params.get("darkPreview"),
    headingFont: params.get("headingFont"),
    bodyFont: params.get("bodyFont"),
    shadows: params.get("shadows") as ShadowOption | null,
    success: params.get("success"),
    warning: params.get("warning"),
    danger: params.get("danger"),
  };

  const validKits = new Set(["default", ...BRANDS.map((b) => b.slug)]);
  if (raw.kit && validKits.has(raw.kit)) patch.kit = raw.kit;

  if (raw.primary && isValidHex(raw.primary)) patch.primary = raw.primary;

  const validRadius = new Set<string>(["0", "0.25rem", "0.5rem", "0.625rem", "1rem"]);
  if (raw.radius && validRadius.has(raw.radius)) patch.radius = raw.radius as RadiusOption;

  const validDensity = new Set<string>(["comfortable", "compact"]);
  if (raw.density && validDensity.has(raw.density)) patch.density = raw.density as DensityOption;

  if (raw.darkPreview !== null) patch.darkPreview = raw.darkPreview === "true";

  const validFontStacks = new Set(FONT_OPTIONS.map((f) => f.stack));
  if (raw.headingFont && validFontStacks.has(raw.headingFont)) patch.headingFont = raw.headingFont;
  if (raw.bodyFont && validFontStacks.has(raw.bodyFont)) patch.bodyFont = raw.bodyFont;

  const validShadows = new Set<string>(["none", "subtle", "normal", "dramatic"]);
  if (raw.shadows && validShadows.has(raw.shadows)) patch.shadows = raw.shadows as ShadowOption;

  if (raw.success && isValidHex(raw.success)) patch.success = raw.success;
  if (raw.warning && isValidHex(raw.warning)) patch.warning = raw.warning;
  if (raw.danger && isValidHex(raw.danger)) patch.danger = raw.danger;

  return patch;
}

// ---------------------------------------------------------------------------
// Colour utilities
// ---------------------------------------------------------------------------

/** Hex → relative luminance (for contrast decisions only) */
function hexToLightness(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length !== 6) return 0.5;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return (max + min) / 2;
}

function fgForHex(hex: string): string {
  return hexToLightness(hex) > 0.55 ? "#111111" : "#ffffff";
}

function isValidHex(v: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(v);
}

// ---------------------------------------------------------------------------
// Google Fonts loader
// ---------------------------------------------------------------------------

/** Injects a Google Fonts <link> once per family; tracks injected families in a ref. */
function useGoogleFontsLoader() {
  const injected = React.useRef<Set<string>>(new Set());

  return React.useCallback((googleFamily: string | null) => {
    if (!googleFamily) return;
    if (injected.current.has(googleFamily)) return;
    injected.current.add(googleFamily);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFamily}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }, []);
}

// ---------------------------------------------------------------------------
// Control: Kit selector
// ---------------------------------------------------------------------------

interface KitSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

function KitSelector({ value, onChange }: KitSelectorProps) {
  const activeName =
    value === "default"
      ? "Layout default"
      : BRANDS.find((b) => b.slug === value)?.name ?? value;

  return (
    <div className="relative">
      <label
        className={cn(
          "relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card",
          "pl-3 pr-2 text-sm font-medium text-foreground",
          "transition-colors duration-[var(--layout-duration-base)] ease-out hover:bg-accent/50"
        )}
        aria-label="Select starting kit"
      >
        <span className="flex-1 truncate">{activeName}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Starting point kit"
        >
          <option value="default">Layout default</option>
          {BRANDS.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
              {b.mode === "dark" ? " (dark)" : ""}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Radius segmented picker
// ---------------------------------------------------------------------------

interface RadiusPickerProps {
  value: RadiusOption;
  onChange: (v: RadiusOption) => void;
}

function RadiusPicker({ value, onChange }: RadiusPickerProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Border radius">
      {RADIUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            "flex-1 h-8 text-xs font-medium rounded-md border transition-colors duration-[var(--layout-duration-base)] ease-out",
            value === opt.value
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Density toggle
// ---------------------------------------------------------------------------

interface DensityToggleProps {
  value: DensityOption;
  onChange: (v: DensityOption) => void;
}

function DensityToggle({ value, onChange }: DensityToggleProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Density">
      {(["comfortable", "compact"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            "flex-1 h-8 text-xs font-medium rounded-md border capitalize transition-colors duration-[var(--layout-duration-base)] ease-out",
            value === opt
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Primary colour
// ---------------------------------------------------------------------------

interface ColourPickerProps {
  value: string;
  onChange: (v: string) => void;
}

function ColourPicker({ value, onChange }: ColourPickerProps) {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setText(v);
    if (isValidHex(v)) onChange(v);
  }

  return (
    <div className="flex gap-2 items-center">
      <label
        className={cn(
          "relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border overflow-hidden",
          "transition-shadow duration-[var(--layout-duration-base)] hover:shadow-sm"
        )}
        aria-label="Pick primary colour"
      >
        <span
          className="absolute inset-0 rounded-[inherit]"
          style={{ background: isValidHex(value) ? value : "var(--layout-primary)" }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => {
            setText(e.target.value);
            onChange(e.target.value);
          }}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="#000000"
        spellCheck={false}
        maxLength={7}
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 font-mono text-sm text-foreground shadow-xs",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none",
          "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out"
        )}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Font picker (heading or body)
// ---------------------------------------------------------------------------

interface FontPickerProps {
  label: string;
  value: string;
  onChange: (stack: string, googleFamily: string | null) => void;
}

function FontPicker({ label, value, onChange }: FontPickerProps) {
  const selected = FONT_OPTIONS.find((f) => f.stack === value) ?? FONT_OPTIONS[0];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="relative">
        <label
          className={cn(
            "relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card",
            "pl-3 pr-2 text-sm font-medium text-foreground",
            "transition-colors duration-[var(--layout-duration-base)] ease-out hover:bg-accent/50"
          )}
          aria-label={`Select ${label} font`}
        >
          <span className="flex-1 truncate">{selected.label}</span>
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <select
            value={value}
            onChange={(e) => {
              const opt = FONT_OPTIONS.find((f) => f.stack === e.target.value);
              if (opt) onChange(opt.stack, opt.googleFamily);
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={`${label} font`}
          >
            <optgroup label="System fonts">
              {FONT_OPTIONS.filter((f) => f.googleFamily === null).map((f) => (
                <option key={f.stack} value={f.stack}>
                  {f.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Google Fonts">
              {FONT_OPTIONS.filter((f) => f.googleFamily !== null).map((f) => (
                <option key={f.stack} value={f.stack}>
                  {f.label}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Shadow segmented picker
// ---------------------------------------------------------------------------

interface ShadowPickerProps {
  value: ShadowOption;
  onChange: (v: ShadowOption) => void;
}

function ShadowPicker({ value, onChange }: ShadowPickerProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Shadow intensity">
      {SHADOW_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            "flex-1 h-8 text-xs font-medium rounded-md border transition-colors duration-[var(--layout-duration-base)] ease-out",
            value === opt.value
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control: Status colour swatch + hex input
// ---------------------------------------------------------------------------

interface StatusColourPickerProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function StatusColourPicker({ label, value, onChange }: StatusColourPickerProps) {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setText(v);
    if (isValidHex(v)) onChange(v);
  }

  return (
    <div className="flex items-center gap-2">
      <label
        className={cn(
          "relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded border border-border overflow-hidden"
        )}
        aria-label={`Pick ${label} colour`}
      >
        <span
          className="absolute inset-0 rounded-[inherit]"
          style={{ background: isValidHex(value) ? value : "#22c55e" }}
        />
        <input
          type="color"
          value={isValidHex(value) ? value : "#22c55e"}
          onChange={(e) => {
            setText(e.target.value);
            onChange(e.target.value);
          }}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      <span className="w-16 text-xs text-muted-foreground shrink-0">{label}</span>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="#000000"
        spellCheck={false}
        maxLength={7}
        className={cn(
          "flex h-7 w-full min-w-0 rounded border border-input bg-transparent px-2 font-mono text-xs text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none",
          "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out"
        )}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control panel (sidebar)
// ---------------------------------------------------------------------------

interface ControlPanelProps {
  state: ThemeState;
  onUpdate: (patch: Partial<ThemeState>) => void;
  onShuffle: () => void;
  loadGoogleFont: (family: string | null) => void;
}

function ControlPanel({ state, onUpdate, onShuffle, loadGoogleFont }: ControlPanelProps) {
  const [advancedOpen, setAdvancedOpen] = React.useState(false);

  function handleHeadingFont(stack: string, googleFamily: string | null) {
    loadGoogleFont(googleFamily);
    onUpdate({ headingFont: stack });
  }

  function handleBodyFont(stack: string, googleFamily: string | null) {
    loadGoogleFont(googleFamily);
    onUpdate({ bodyFont: stack });
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-b border-border bg-card p-6 lg:w-72 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold text-foreground">Theme settings</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Overrides apply on top of the selected kit.
        </p>
      </div>

      {/* Starting point */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Starting point
        </span>
        <KitSelector
          value={state.kit}
          onChange={(v) => onUpdate({ kit: v })}
        />
        <button
          type="button"
          onClick={onShuffle}
          className={cn(
            "flex h-8 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-xs font-medium text-muted-foreground",
            "transition-colors duration-[var(--layout-duration-base)] ease-out hover:bg-accent/50 hover:text-foreground"
          )}
        >
          <Shuffle className="size-3.5" aria-hidden="true" />
          Shuffle kit
        </button>
      </div>

      {/* Primary colour */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Primary colour
        </span>
        <ColourPicker
          value={state.primary}
          onChange={(v) => onUpdate({ primary: v })}
        />
        <p className="text-xs text-muted-foreground">
          Overrides the kit's primary. Leave blank to use the kit default.
        </p>
      </div>

      {/* Radius */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Radius
        </span>
        <RadiusPicker
          value={state.radius}
          onChange={(v) => onUpdate({ radius: v })}
        />
      </div>

      {/* Density */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Density
        </span>
        <DensityToggle
          value={state.density}
          onChange={(v) => onUpdate({ density: v })}
        />
      </div>

      {/* Fonts */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Fonts
        </span>
        <FontPicker
          label="Heading"
          value={state.headingFont}
          onChange={handleHeadingFont}
        />
        <FontPicker
          label="Body"
          value={state.bodyFont}
          onChange={handleBodyFont}
        />
      </div>

      {/* Shadows */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Shadows
        </span>
        <ShadowPicker
          value={state.shadows}
          onChange={(v) => onUpdate({ shadows: v })}
        />
      </div>

      {/* Advanced colours (collapsible) */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setAdvancedOpen((o) => !o)}
          aria-expanded={advancedOpen}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide",
            "transition-colors duration-[var(--layout-duration-base)] hover:text-foreground"
          )}
        >
          <ChevronRight
            className={cn(
              "size-3 transition-transform duration-[var(--layout-duration-base)]",
              advancedOpen && "rotate-90"
            )}
            aria-hidden="true"
          />
          Advanced colours
        </button>

        {advancedOpen && (
          <div className="flex flex-col gap-2 pl-1">
            <p className="text-xs text-muted-foreground">
              Status colours. Foreground pairs are derived automatically by luminance.
            </p>
            <StatusColourPicker
              label="Success"
              value={state.success}
              onChange={(v) => onUpdate({ success: v })}
            />
            <StatusColourPicker
              label="Warning"
              value={state.warning}
              onChange={(v) => onUpdate({ warning: v })}
            />
            <StatusColourPicker
              label="Danger"
              value={state.danger}
              onChange={(v) => onUpdate({ danger: v })}
            />
          </div>
        )}
      </div>

      {/* Preview mode */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Preview mode
        </span>
        <div className="flex gap-1" role="group" aria-label="Preview colour scheme">
          <button
            type="button"
            onClick={() => onUpdate({ darkPreview: false })}
            aria-pressed={!state.darkPreview}
            className={cn(
              "flex flex-1 h-8 items-center justify-center gap-1.5 text-xs font-medium rounded-md border transition-colors duration-[var(--layout-duration-base)] ease-out",
              !state.darkPreview
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <Sun className="size-3" aria-hidden="true" />
            Light
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ darkPreview: true })}
            aria-pressed={state.darkPreview}
            className={cn(
              "flex flex-1 h-8 items-center justify-center gap-1.5 text-xs font-medium rounded-md border transition-colors duration-[var(--layout-duration-base)] ease-out",
              state.darkPreview
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <Moon className="size-3" aria-hidden="true" />
            Dark
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-auto pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => onUpdate({ ...DEFAULT_STATE })}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors duration-[var(--layout-duration-base)]"
        >
          Reset to defaults
        </button>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Preview: stat card
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ReactNode;
}

function StatCard({ label, value, delta, positive, icon }: StatCardProps) {
  return (
    <Card className="py-4 gap-3">
      <CardHeader className="px-4 py-0">
        <div className="flex items-center justify-between">
          <CardDescription>{label}</CardDescription>
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-0">
        <span
          className={cn(
            "text-xs font-medium",
            positive ? "text-success" : "text-destructive"
          )}
        >
          {positive ? "+" : ""}{delta} this month
        </span>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Preview canvas
// ---------------------------------------------------------------------------

interface PreviewCanvasProps {
  state: ThemeState;
  primaryFg: string;
  successFg: string;
  warningFg: string;
  dangerFg: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

function PreviewCanvas({
  state,
  primaryFg,
  successFg,
  warningFg,
  dangerFg,
  previewRef,
}: PreviewCanvasProps) {
  const shadows = SHADOW_SETS[state.shadows];

  const inlineTokens: React.CSSProperties = {
    ...(isValidHex(state.primary) && {
      ["--layout-primary" as string]: state.primary,
      ["--layout-primary-fg" as string]: primaryFg,
    }),
    ["--layout-radius" as string]: state.radius,
    ["--layout-space-unit" as string]:
      state.density === "compact" ? "0.215rem" : "0.25rem",
    ["--layout-font-display" as string]: state.headingFont,
    ["--layout-font-sans" as string]: state.bodyFont,
    ...(isValidHex(state.success) && {
      ["--layout-success" as string]: state.success,
      ["--layout-success-fg" as string]: successFg,
    }),
    ...(isValidHex(state.warning) && {
      ["--layout-warning" as string]: state.warning,
      ["--layout-warning-fg" as string]: warningFg,
    }),
    ...(isValidHex(state.danger) && {
      ["--layout-danger" as string]: state.danger,
      ["--layout-danger-fg" as string]: dangerFg,
    }),
    ...(state.shadows !== "subtle" && {
      ["--layout-shadow-xs" as string]: shadows[0],
      ["--layout-shadow-sm" as string]: shadows[1],
      ["--layout-shadow-md" as string]: shadows[2],
      ["--layout-shadow-lg" as string]: shadows[3],
      ["--layout-shadow-xl" as string]: shadows[4],
    }),
  };

  return (
    <div
      ref={previewRef}
      data-brand={state.kit !== "default" ? state.kit : undefined}
      data-theme={state.darkPreview ? "dark" : undefined}
      data-density={state.density === "compact" ? "compact" : undefined}
      style={inlineTokens}
      className="min-h-0 flex-1 bg-background p-6 text-foreground lg:overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Total revenue"
            value="$48,920"
            delta="12.5%"
            positive={true}
            icon={<TrendingUp className="size-4" />}
          />
          <StatCard
            label="Active users"
            value="2,847"
            delta="8.2%"
            positive={true}
            icon={<Users className="size-4" />}
          />
          <StatCard
            label="Transactions"
            value="1,204"
            delta="3.1%"
            positive={false}
            icon={<CreditCard className="size-4" />}
          />
          <StatCard
            label="Uptime"
            value="99.9%"
            delta="0.1%"
            positive={true}
            icon={<Activity className="size-4" />}
          />
        </div>

        {/* Tabs + form card */}
        <Card>
          <CardHeader>
            <CardTitle>Account settings</CardTitle>
            <CardDescription>
              Update your profile and notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="preview-name">Full name</Label>
                      <Input id="preview-name" placeholder="Alex Johnson" defaultValue="Alex Johnson" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="preview-email">Email address</Label>
                      <Input id="preview-email" type="email" placeholder="alex@example.com" defaultValue="alex@example.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="preview-role">Role</Label>
                    <div className="relative">
                      <select
                        id="preview-role"
                        defaultValue="designer"
                        className={cn(
                          "flex h-9 w-full appearance-none items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs",
                          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none",
                          "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out"
                        )}
                      >
                        <option value="designer">Product designer</option>
                        <option value="engineer">Engineer</option>
                        <option value="manager">Product manager</option>
                        <option value="founder">Founder</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm">Save changes</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-4">
                <p className="text-sm text-muted-foreground">Notification preferences shown here.</p>
              </TabsContent>
              <TabsContent value="billing" className="mt-4">
                <p className="text-sm text-muted-foreground">Billing details shown here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Alert */}
        <div className="flex gap-3 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-foreground">Trial ending soon</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your free trial expires in 3 days. Upgrade to keep access.
            </p>
          </div>
        </div>

        {/* Badge strip */}
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>

        {/* Mini table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Description</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { desc: "Pro plan · monthly", date: "1 Jul 2026", amount: "$49.00", status: "paid" as const },
                  { desc: "Design token export", date: "28 Jun 2026", amount: "$9.00", status: "paid" as const },
                  { desc: "Seat upgrade", date: "22 Jun 2026", amount: "$29.00", status: "pending" as const },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-[var(--layout-duration-fast)]">
                    <td className="px-6 py-3 text-foreground">{row.desc}</td>
                    <td className="px-6 py-3 text-muted-foreground">{row.date}</td>
                    <td className="px-6 py-3 text-right text-foreground">{row.amount}</td>
                    <td className="px-6 py-3 text-right">
                      <Badge variant={row.status === "paid" ? "success" : "warning"}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Output panel helpers
// ---------------------------------------------------------------------------

interface InlineCopyButtonProps {
  text: string;
  label?: string;
}

function InlineCopyButton({ text, label = "Copy" }: InlineCopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2000); }
      finally { document.body.removeChild(ta); }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground",
        "hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
      )}
    >
      {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function buildCssOverrides(
  state: ThemeState,
  primaryFg: string,
  successFg: string,
  warningFg: string,
  dangerFg: string
): string {
  const lines: string[] = [];

  if (isValidHex(state.primary)) {
    lines.push(`  --layout-primary: ${state.primary};`);
    lines.push(`  --layout-primary-fg: ${primaryFg};`);
  }

  const defaultRadius = "0.625rem";
  if (state.radius !== defaultRadius) {
    lines.push(`  --layout-radius: ${state.radius};`);
  }

  if (state.density === "compact") {
    lines.push(`  --layout-space-unit: 0.215rem;`);
  }

  // Heading font: only emit when it differs from the Geist default
  if (state.headingFont !== FONT_OPTIONS[0].stack) {
    lines.push(`  --layout-font-display: ${state.headingFont};`);
  }

  // Body font: only emit when it differs from the Geist default
  if (state.bodyFont !== FONT_OPTIONS[0].stack) {
    lines.push(`  --layout-font-sans: ${state.bodyFont};`);
  }

  // Shadows: only emit when not the subtle default
  if (state.shadows !== "subtle") {
    const shadows = SHADOW_SETS[state.shadows];
    lines.push(`  --layout-shadow-xs: ${shadows[0]};`);
    lines.push(`  --layout-shadow-sm: ${shadows[1]};`);
    lines.push(`  --layout-shadow-md: ${shadows[2]};`);
    lines.push(`  --layout-shadow-lg: ${shadows[3]};`);
    lines.push(`  --layout-shadow-xl: ${shadows[4]};`);
  }

  // Status colours: only emit when changed from defaults
  if (isValidHex(state.success) && state.success !== DEFAULT_SUCCESS) {
    lines.push(`  --layout-success: ${state.success};`);
    lines.push(`  --layout-success-fg: ${successFg};`);
  }
  if (isValidHex(state.warning) && state.warning !== DEFAULT_WARNING) {
    lines.push(`  --layout-warning: ${state.warning};`);
    lines.push(`  --layout-warning-fg: ${warningFg};`);
  }
  if (isValidHex(state.danger) && state.danger !== DEFAULT_DANGER) {
    lines.push(`  --layout-danger: ${state.danger};`);
    lines.push(`  --layout-danger-fg: ${dangerFg};`);
  }

  if (lines.length === 0) return "";
  return `:root {\n${lines.join("\n")}\n}`;
}

// ---------------------------------------------------------------------------
// Kit download builder
// ---------------------------------------------------------------------------

/** Read effective computed token values off the live preview element. */
function collectTokenValues(el: HTMLElement): Record<string, string> {
  const computed = getComputedStyle(el);
  const result: Record<string, string> = {};
  for (const name of LAYOUT_TOKEN_NAMES) {
    const raw = computed.getPropertyValue(name).trim();
    result[name] = raw || TOKEN_FALLBACKS[name] || "";
  }
  return result;
}

function buildKitJson(kitSlug: string, kitName: string): string {
  const slug = kitSlug === "default" ? "custom-theme" : `${kitSlug}-custom`;
  const displayName = kitSlug === "default" ? "Custom Theme" : `${kitName} (custom)`;
  return JSON.stringify(
    {
      name: slug,
      version: "1.0.0",
      displayName,
      description: `Custom theme${kitSlug !== "default" ? ` based on ${kitName}` : ""}, built with Layout UI theme builder`,
      source: "layout-ui-create",
      tier: "minimal",
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

function buildTokensCss(tokens: Record<string, string>): string {
  const lines: string[] = [
    "/* Custom Theme — Design Tokens */",
    "/* Generated by Layout UI — ui.staging.layout.design/create */",
    "",
    ":root {",
  ];

  const sections: Array<{ comment: string; keys: string[] }> = [
    {
      comment: "Colour — surfaces",
      keys: ["--layout-bg", "--layout-fg", "--layout-surface", "--layout-surface-fg", "--layout-overlay", "--layout-overlay-fg"],
    },
    {
      comment: "Colour — intent",
      keys: [
        "--layout-primary", "--layout-primary-fg",
        "--layout-secondary", "--layout-secondary-fg",
        "--layout-muted", "--layout-muted-fg",
        "--layout-accent", "--layout-accent-fg",
      ],
    },
    {
      comment: "Colour — status",
      keys: [
        "--layout-danger", "--layout-danger-fg",
        "--layout-success", "--layout-success-fg",
        "--layout-warning", "--layout-warning-fg",
      ],
    },
    {
      comment: "Chrome",
      keys: ["--layout-border", "--layout-input", "--layout-ring"],
    },
    {
      comment: "Shape",
      keys: ["--layout-radius"],
    },
    {
      comment: "Typography",
      keys: ["--layout-font-sans", "--layout-font-display", "--layout-font-mono"],
    },
    {
      comment: "Elevation",
      keys: ["--layout-shadow-xs", "--layout-shadow-sm", "--layout-shadow-md", "--layout-shadow-lg", "--layout-shadow-xl"],
    },
    {
      comment: "Motion",
      keys: ["--layout-duration-fast", "--layout-duration-base", "--layout-duration-slow"],
    },
    {
      comment: "Density",
      keys: ["--layout-space-unit"],
    },
  ];

  for (const section of sections) {
    lines.push(`  /* ${section.comment} */`);
    for (const key of section.keys) {
      if (tokens[key]) {
        lines.push(`  ${key}: ${tokens[key]};`);
      }
    }
    lines.push("");
  }

  // Remove trailing blank line before closing brace
  while (lines[lines.length - 1] === "") lines.pop();
  lines.push("}");

  return lines.join("\n");
}

function buildTokensJson(tokens: Record<string, string>): string {
  const colorKeys = [
    "--layout-bg", "--layout-fg",
    "--layout-surface", "--layout-surface-fg",
    "--layout-overlay", "--layout-overlay-fg",
    "--layout-primary", "--layout-primary-fg",
    "--layout-secondary", "--layout-secondary-fg",
    "--layout-muted", "--layout-muted-fg",
    "--layout-accent", "--layout-accent-fg",
    "--layout-danger", "--layout-danger-fg",
    "--layout-success", "--layout-success-fg",
    "--layout-warning", "--layout-warning-fg",
    "--layout-border", "--layout-input", "--layout-ring",
  ];

  // Convert token name to nested path like { color: { bg: ... } }
  function tokenNameToPath(name: string): string[] {
    return name.replace("--layout-", "").split("-");
  }

  // Build colour group
  const colorGroup: Record<string, unknown> = {};
  for (const key of colorKeys) {
    if (!tokens[key]) continue;
    const parts = tokenNameToPath(key);
    // e.g. ["primary", "fg"] or ["bg"]
    if (parts.length === 1) {
      colorGroup[parts[0]] = { $type: "color", $value: tokens[key] };
    } else {
      const group = parts[0];
      const sub = parts.slice(1).join("-");
      if (typeof colorGroup[group] !== "object" || colorGroup[group] === null) {
        colorGroup[group] = {};
      }
      (colorGroup[group] as Record<string, unknown>)[sub] = { $type: "color", $value: tokens[key] };
    }
  }

  const radiusVal = tokens["--layout-radius"] || "0.625rem";
  const fontSans = tokens["--layout-font-sans"] || "ui-sans-serif, system-ui, sans-serif";
  const fontDisplay = tokens["--layout-font-display"] || fontSans;
  const fontMono = tokens["--layout-font-mono"] || "ui-monospace, monospace";

  const shadowGroup: Record<string, unknown> = {};
  for (const size of ["xs", "sm", "md", "lg", "xl"]) {
    const val = tokens[`--layout-shadow-${size}`];
    if (val) shadowGroup[size] = { $type: "shadow", $value: val };
  }

  const out = {
    $schema: "https://tr.designtokens.org/format/",
    color: colorGroup,
    borderRadius: {
      base: { $type: "dimension", $value: radiusVal },
    },
    font: {
      sans: { $type: "fontFamily", $value: fontSans },
      display: { $type: "fontFamily", $value: fontDisplay },
      mono: { $type: "fontFamily", $value: fontMono },
    },
    shadow: shadowGroup,
    spacing: {
      unit: { $type: "dimension", $value: tokens["--layout-space-unit"] || "0.25rem" },
    },
  };

  return JSON.stringify(out, null, 2);
}

function buildLayoutMd(state: ThemeState, tokens: Record<string, string>): string {
  const kitEntry = BRANDS.find((b) => b.slug === state.kit);
  const title = kitEntry ? `${kitEntry.name} (custom)` : "Custom Theme";
  const sourceNote = kitEntry
    ? `Based on the ${kitEntry.name} kit from layout.design, with custom overrides applied via the Layout UI theme builder.`
    : "Generated with the Layout UI theme builder at ui.staging.layout.design/create.";

  const primary = tokens["--layout-primary"] || "#000000";
  const primaryFg = tokens["--layout-primary-fg"] || "#ffffff";
  const bg = tokens["--layout-bg"] || "oklch(0.99 0.002 95)";
  const fg = tokens["--layout-fg"] || "oklch(0.21 0.006 95)";
  const border = tokens["--layout-border"] || "oklch(0.91 0.004 95)";
  const radius = tokens["--layout-radius"] || "0.625rem";
  const fontSans = tokens["--layout-font-sans"] || "ui-sans-serif, system-ui, sans-serif";
  const fontDisplay = tokens["--layout-font-display"] || fontSans;
  const shadowSm = tokens["--layout-shadow-sm"] || "0 1px 2px rgba(0,0,0,0.08)";

  // Build the :root block for Quick Reference
  const rootLines: string[] = [":root {"];
  for (const name of LAYOUT_TOKEN_NAMES) {
    if (tokens[name]) rootLines.push(`  ${name}: ${tokens[name]};`);
  }
  rootLines.push("}");
  const rootBlock = rootLines.join("\n");

  return `# ${title}

> ${sourceNote}

---

## Quick Reference

| Token | Value |
|---|---|
| Primary | \`--layout-primary\` = \`${primary}\` |
| Primary fg | \`--layout-primary-fg\` = \`${primaryFg}\` |
| Background | \`--layout-bg\` = \`${bg}\` |
| Foreground | \`--layout-fg\` = \`${fg}\` |
| Border | \`--layout-border\` = \`${border}\` |
| Radius | \`--layout-radius\` = \`${radius}\` |
| Font sans | \`--layout-font-sans\` = \`${fontSans}\` |
| Font display | \`--layout-font-display\` = \`${fontDisplay}\` |
| Shadow sm | \`--layout-shadow-sm\` = \`${shadowSm}\` |

### Full token set

\`\`\`css
${rootBlock}
\`\`\`

---

## NEVER rules

- **Never hardcode colour values.** Always consume \`--layout-*\` semantic tokens.
- **Never set radius directly.** Derive from \`--layout-radius\`; use calc() for offsets.
- **Never use arbitrary spacing.** All spacing utilities derive from \`--layout-space-unit\`.
- **Never bypass semantic tokens** to reach primitive values (oklch / hex / rgba literals) in component code.
- **Never use \`filter: drop-shadow\`.** Use \`box-shadow\` with \`--layout-shadow-*\` tokens only.
- **Never mix font stacks.** Use \`--layout-font-display\` for headings and \`--layout-font-sans\` for body copy.

---

## Components

This theme is designed for use with Layout UI components. Browse and install at:

**https://ui.staging.layout.design**

Components consume the \`--layout-*\` token namespace, so applying this theme via \`tokens.css\` styles them automatically.

---

<!-- Generated by Layout UI — ui.staging.layout.design/create -->
`;
}

async function downloadKit(
  state: ThemeState,
  previewEl: HTMLElement | null
): Promise<void> {
  const tokens = previewEl ? collectTokenValues(previewEl) : { ...TOKEN_FALLBACKS };
  const kitEntry = BRANDS.find((b) => b.slug === state.kit);
  const kitName = kitEntry?.name ?? "default";

  const kitJson = buildKitJson(state.kit, kitName);
  const tokensCss = buildTokensCss(tokens);
  const tokensJson = buildTokensJson(tokens);
  const layoutMd = buildLayoutMd(state, tokens);

  const zip = new JSZip();
  const folder = zip.folder(".layout");
  if (!folder) throw new Error("Failed to create .layout folder in zip");
  folder.file("kit.json", kitJson);
  folder.file("tokens.css", tokensCss);
  folder.file("tokens.json", tokensJson);
  folder.file("layout.md", layoutMd);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-theme.zip";
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Output panel
// ---------------------------------------------------------------------------

interface OutputPanelProps {
  state: ThemeState;
  primaryFg: string;
  successFg: string;
  warningFg: string;
  dangerFg: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

function OutputPanel({
  state,
  primaryFg,
  successFg,
  warningFg,
  dangerFg,
  previewRef,
}: OutputPanelProps) {
  const cssOverrides = buildCssOverrides(state, primaryFg, successFg, warningFg, dangerFg);
  const hasKit = state.kit !== "default";
  const kitEntry = BRANDS.find((b) => b.slug === state.kit);

  const installCommand = `npx shadcn add https://ui.staging.layout.design/r/theme-layout.json`;
  const componentsCommand = `npx shadcn add https://ui.staging.layout.design/r/button.json`;

  const kitUsageCode = hasKit
    ? `<!-- Apply the ${kitEntry?.name} kit theme to any wrapper -->\n<div data-brand="${state.kit}">\n  <!-- your components here -->\n</div>`
    : "";

  const [downloading, setDownloading] = React.useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadKit(state, previewRef.current);
    } finally {
      setDownloading(false);
    }
  }

  // "Copy link" uses current URL (already kept in sync by parent)
  const [linkCopied, setLinkCopied] = React.useState(false);
  function handleCopyLink() {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }
      finally { document.body.removeChild(ta); }
    }
  }

  let stepIdx = 1;

  return (
    <aside className="flex w-full shrink-0 flex-col border-t border-border bg-card lg:w-96 lg:overflow-y-auto lg:border-t-0 lg:border-l">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-foreground">Get this theme</h2>
        <div className="flex items-center gap-2">
          {hasKit && (
            <Badge variant="secondary" className="text-xs">
              {kitEntry?.name}
            </Badge>
          )}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={linkCopied ? "Link copied" : "Copy shareable link"}
            title="Copy shareable link"
            className={cn(
              "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground",
              "hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
            )}
          >
            {linkCopied ? <Check className="size-3 text-success" /> : <LinkIcon className="size-3" />}
            {linkCopied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Step 1: Install */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">{stepIdx++}. Install the theme</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Add the Layout UI base theme to your project.
              </p>
            </div>
          </div>
          <CodeBlock code={installCommand} language="bash" />
        </div>

        {/* Step 2: Add components */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">{stepIdx++}. Add components</p>
          <p className="text-xs text-muted-foreground">
            Install individual components from the registry.
          </p>
          <CodeBlock code={componentsCommand} language="bash" />
        </div>

        {/* Step 3: CSS overrides */}
        {cssOverrides ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">{stepIdx++}. Apply your overrides</p>
            <p className="text-xs text-muted-foreground">
              Add these token overrides to your global CSS, after the theme import.
            </p>
            <CodeBlock code={cssOverrides} language="css" />
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              No overrides. The selected kit tokens apply as-is.
            </p>
          </div>
        )}

        {/* Step N: Kit data-brand */}
        {hasKit && kitUsageCode && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              {stepIdx++}. Apply the kit
            </p>
            <p className="text-xs text-muted-foreground">
              Use{" "}
              <code className="font-mono text-xs text-foreground bg-muted px-1 py-0.5 rounded">
                data-brand="{state.kit}"
              </code>{" "}
              on any wrapper to scope the {kitEntry?.name} theme.
            </p>
            <CodeBlock code={kitUsageCode} language="html" />
          </div>
        )}

        {/* Download as kit */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <p className="text-sm font-medium text-foreground">Download as kit</p>
          <p className="text-xs text-muted-foreground">
            Export a complete <code className="font-mono text-xs">.layout/</code> bundle you can drop into any project.
          </p>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className={cn(
              "flex items-center justify-center gap-2 h-9 w-full rounded-md border border-border bg-primary text-primary-foreground text-sm font-medium",
              "transition-colors duration-[var(--layout-duration-base)] ease-out",
              downloading
                ? "opacity-60 cursor-not-allowed"
                : "hover:opacity-90"
            )}
          >
            <Download className="size-3.5" aria-hidden="true" />
            {downloading ? "Building…" : "Download kit (.zip)"}
          </button>
          <p className="text-xs text-muted-foreground">
            Drop the <code className="font-mono text-xs">.layout</code> folder into your repo, or import it as a kit in Layout Studio.
          </p>
        </div>

        {/* Docs link */}
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            See the full{" "}
            <a
              href="/docs/theming"
              className="underline underline-offset-4 hover:text-foreground transition-colors duration-[var(--layout-duration-base)]"
            >
              theming guide
            </a>{" "}
            for dark mode, density, and multi-brand usage.
          </p>
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Root ThemeBuilder
// ---------------------------------------------------------------------------

interface ThemeBuilderInnerProps {
  initialParams: URLSearchParams;
}

function ThemeBuilderInner({ initialParams }: ThemeBuilderInnerProps) {
  const [state, setState] = React.useState<ThemeState>(() => ({
    ...DEFAULT_STATE,
    ...paramsToState(initialParams),
  }));

  // Ref to the preview wrapper div for getComputedStyle in download
  const previewRef = React.useRef<HTMLDivElement | null>(null);

  // Load Google Fonts for fonts selected on mount (e.g. from URL params)
  const loadGoogleFont = useGoogleFontsLoader();
  const hasInitialised = React.useRef(false);
  React.useEffect(() => {
    if (hasInitialised.current) return;
    hasInitialised.current = true;
    const headingOpt = FONT_OPTIONS.find((f) => f.stack === state.headingFont);
    const bodyOpt = FONT_OPTIONS.find((f) => f.stack === state.bodyFont);
    if (headingOpt?.googleFamily) loadGoogleFont(headingOpt.googleFamily);
    if (bodyOpt?.googleFamily && bodyOpt.googleFamily !== headingOpt?.googleFamily) {
      loadGoogleFont(bodyOpt.googleFamily);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleUpdate(patch: Partial<ThemeState>) {
    setState((prev) => {
      const next = { ...prev, ...patch };
      // Update URL without navigation
      const params = stateToParams(next);
      const qs = params.toString();
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
      return next;
    });
  }

  function handleShuffle() {
    const randomKit = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    handleUpdate({ kit: randomKit.slug });
  }

  const primaryFg = React.useMemo(
    () => (isValidHex(state.primary) ? fgForHex(state.primary) : "#ffffff"),
    [state.primary]
  );

  const successFg = React.useMemo(
    () => (isValidHex(state.success) ? fgForHex(state.success) : "#ffffff"),
    [state.success]
  );

  const warningFg = React.useMemo(
    () => (isValidHex(state.warning) ? fgForHex(state.warning) : "#ffffff"),
    [state.warning]
  );

  const dangerFg = React.useMemo(
    () => (isValidHex(state.danger) ? fgForHex(state.danger) : "#ffffff"),
    [state.danger]
  );

  return (
    <div className="flex min-h-0 flex-col overflow-y-auto lg:h-full lg:flex-row lg:overflow-hidden">
      <ControlPanel
        state={state}
        onUpdate={handleUpdate}
        onShuffle={handleShuffle}
        loadGoogleFont={loadGoogleFont}
      />
      <PreviewCanvas
        state={state}
        primaryFg={primaryFg}
        successFg={successFg}
        warningFg={warningFg}
        dangerFg={dangerFg}
        previewRef={previewRef}
      />
      <OutputPanel
        state={state}
        primaryFg={primaryFg}
        successFg={successFg}
        warningFg={warningFg}
        dangerFg={dangerFg}
        previewRef={previewRef}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public export: reads search params via useSearchParams, wrapped in Suspense
// by the page. We accept pre-parsed params as a prop so the Suspense boundary
// lives in page.tsx, keeping ThemeBuilder itself testable without a router.
// ---------------------------------------------------------------------------

export function ThemeBuilder({ searchParams }: { searchParams?: URLSearchParams }) {
  return <ThemeBuilderInner initialParams={searchParams ?? new URLSearchParams()} />;
}
