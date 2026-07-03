"use client";

import * as React from "react";
import {
  Shuffle,
  Moon,
  Sun,
  ChevronDown,
  Copy,
  Check,
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  AlertCircle,
} from "lucide-react";

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

interface ThemeState {
  kit: string;
  primary: string;
  radius: RadiusOption;
  density: DensityOption;
  darkPreview: boolean;
}

const RADIUS_OPTIONS: { label: string; value: RadiusOption }[] = [
  { label: "None", value: "0" },
  { label: "SM", value: "0.25rem" },
  { label: "MD", value: "0.5rem" },
  { label: "LG", value: "0.625rem" },
  { label: "XL", value: "1rem" },
];

// ---------------------------------------------------------------------------
// Colour utilities
// ---------------------------------------------------------------------------

/** Hex → oklch lightness estimate (rough, for contrast decisions only) */
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

function fgForPrimary(primaryHex: string): string {
  return hexToLightness(primaryHex) > 0.55 ? "#111111" : "#ffffff";
}

function isValidHex(v: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(v);
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
// Control panel (sidebar)
// ---------------------------------------------------------------------------

interface ControlPanelProps {
  state: ThemeState;
  onUpdate: (patch: Partial<ThemeState>) => void;
  onShuffle: () => void;
}

function ControlPanel({ state, onUpdate, onShuffle }: ControlPanelProps) {
  return (
    <aside className="flex flex-col gap-6 w-72 shrink-0 border-r border-border bg-card p-6 overflow-y-auto">
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
          onClick={() =>
            onUpdate({
              kit: "default",
              primary: "#000000",
              radius: "0.625rem",
              density: "comfortable",
              darkPreview: false,
            })
          }
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
}

function PreviewCanvas({ state, primaryFg }: PreviewCanvasProps) {
  const inlineTokens: React.CSSProperties = {
    ...(isValidHex(state.primary) && {
      ["--layout-primary" as string]: state.primary,
      ["--layout-primary-fg" as string]: primaryFg,
    }),
    ["--layout-radius" as string]: state.radius,
    ["--layout-space-unit" as string]:
      state.density === "compact" ? "0.215rem" : "0.25rem",
  };

  return (
    <div
      data-brand={state.kit !== "default" ? state.kit : undefined}
      data-theme={state.darkPreview ? "dark" : undefined}
      data-density={state.density === "compact" ? "compact" : undefined}
      style={inlineTokens}
      className="flex-1 overflow-y-auto p-6 bg-background text-foreground min-h-0"
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
                    {/* Native select so preview works without portal issues */}
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
// Output panel
// ---------------------------------------------------------------------------

interface InlineCopyButtonProps {
  text: string;
}

function InlineCopyButton({ text }: InlineCopyButtonProps) {
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
      aria-label={copied ? "Copied" : "Copy"}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground",
        "hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
      )}
    >
      {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface OutputPanelProps {
  state: ThemeState;
  primaryFg: string;
}

function buildCssOverrides(state: ThemeState, primaryFg: string): string {
  const lines: string[] = [];

  if (isValidHex(state.primary)) {
    lines.push(`  --layout-primary: ${state.primary};`);
    lines.push(`  --layout-primary-fg: ${primaryFg};`);
  }

  const defaultRadius = "0.625rem";
  if (state.radius !== defaultRadius) {
    lines.push(`  --layout-radius: ${state.radius};`);
  }

  const defaultSpaceUnit = "0.25rem";
  const spaceUnit = state.density === "compact" ? "0.215rem" : defaultSpaceUnit;
  if (state.density === "compact") {
    lines.push(`  --layout-space-unit: ${spaceUnit};`);
  }

  if (lines.length === 0) return "";
  return `:root {\n${lines.join("\n")}\n}`;
}

function OutputPanel({ state, primaryFg }: OutputPanelProps) {
  const cssOverrides = buildCssOverrides(state, primaryFg);
  const hasKit = state.kit !== "default";
  const kitEntry = BRANDS.find((b) => b.slug === state.kit);

  const installCommand = `npx shadcn add https://ui.staging.layout.design/r/theme-layout.json`;
  const componentsCommand = `npx shadcn add https://ui.staging.layout.design/r/button.json`;

  const kitUsageCode = hasKit
    ? `<!-- Apply the ${kitEntry?.name} kit theme to any wrapper -->\n<div data-brand="${state.kit}">\n  <!-- your components here -->\n</div>`
    : "";

  return (
    <aside className="w-96 shrink-0 border-l border-border bg-card overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-foreground">Get this theme</h2>
        {hasKit && (
          <Badge variant="secondary" className="text-xs">
            {kitEntry?.name}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Step 1: Install */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">1. Install the theme</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Add the Layout UI base theme to your project.
              </p>
            </div>
          </div>
          <CodeBlock code={installCommand} language="bash" />
        </div>

        {/* Step 2: Add components */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">2. Add components</p>
          <p className="text-xs text-muted-foreground">
            Install individual components from the registry.
          </p>
          <CodeBlock code={componentsCommand} language="bash" />
        </div>

        {/* Step 3: CSS overrides */}
        {cssOverrides ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">3. Apply your overrides</p>
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

        {/* Step 4: Kit data-brand */}
        {hasKit && kitUsageCode && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              {cssOverrides ? "4." : "3."} Apply the kit
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

export function ThemeBuilder() {
  const [state, setState] = React.useState<ThemeState>({
    kit: "default",
    primary: "#000000",
    radius: "0.625rem",
    density: "comfortable",
    darkPreview: false,
  });

  function handleUpdate(patch: Partial<ThemeState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function handleShuffle() {
    const randomKit = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    setState((prev) => ({ ...prev, kit: randomKit.slug }));
  }

  const primaryFg = React.useMemo(
    () => (isValidHex(state.primary) ? fgForPrimary(state.primary) : "#ffffff"),
    [state.primary]
  );

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <ControlPanel state={state} onUpdate={handleUpdate} onShuffle={handleShuffle} />
      <PreviewCanvas state={state} primaryFg={primaryFg} />
      <OutputPanel state={state} primaryFg={primaryFg} />
    </div>
  );
}
