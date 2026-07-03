import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GitFork,
  FileText,
  Cpu,
  Layers,
} from "lucide-react";

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data for generative search and AI agents
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: "TypeScript",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  publisher: {
    "@type": "Organization",
    name: "Layout",
    url: "https://layout.design",
  },
};

import { BrandScope } from "@/components/docs/BrandScope";
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

import { BrandSwitcher } from "@/components/docs/BrandSwitcher";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import { DensityToggle } from "@/components/docs/DensityToggle";

// ---------------------------------------------------------------------------
// Top bar
// ---------------------------------------------------------------------------

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 lg:px-6">
        <span className="font-display text-base font-semibold tracking-tight text-foreground mr-auto shrink-0">
          Layout UI
        </span>
        <nav aria-label="Site navigation" className="hidden md:flex items-center gap-1">
          <Link
            href="/docs"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            Components
          </Link>
          <a
            href="https://layout.design"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            layout.design
            <span aria-hidden="true" className="ml-1 opacity-50">↗</span>
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <BrandSwitcher />
          </div>
          <DensityToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-20 sm:py-28 lg:px-6">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          <FileText className="size-3" />
          From layout.design
        </Badge>
      </div>
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          One component system.{" "}
          <span className="text-muted-foreground">Every brand.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Layout UI components consume only semantic tokens. Swap a{" "}
          <code className="font-mono text-sm text-foreground bg-muted px-1.5 py-0.5 rounded">
            data-brand
          </code>{" "}
          attribute, derived from a layout.md kit, and every component re-skins
          instantly, with no markup changes.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="lg" render={<Link href="/docs" />}>
          Read the docs
          <ArrowRight />
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/create" />}>
          Create your theme
        </Button>
        <Button size="lg" variant="ghost" render={<Link href="/docs/components/button" />}>
          Browse components
        </Button>
        <Button size="lg" variant="ghost" render={<a href="https://github.com/uselayout/ui" target="_blank" rel="noopener noreferrer" />}>
          <GitFork />
          GitHub
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Live demo strip: compact preview that responds to brand/theme/density
// ---------------------------------------------------------------------------

function DemoStrip() {
  return (
    <section aria-label="Live component preview" className="mx-auto max-w-screen-xl px-4 lg:px-6">
      <BrandScope className="max-w-lg rounded-2xl bg-transparent">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Start building with Layout UI in under a minute.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-name">Name</Label>
              <Input id="demo-name" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-email">Email</Label>
              <Input id="demo-email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm">Create account</Button>
            <Button size="sm" variant="outline">Sign in instead</Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>
      </BrandScope>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Feature cards
// ---------------------------------------------------------------------------

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

import * as React from "react";

function Features() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 lg:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FeatureCard
          icon={<Layers className="size-5" />}
          title="Token contract"
          description="Every component references --layout-* intent tokens only. Change a token and every surface using it updates. No per-component overrides, no colour leaks."
        />
        <FeatureCard
          icon={<FileText className="size-5" />}
          title="Reskin with layout.md"
          description="Layout kits compile design tokens into a layout.md context file and a CSS brand block. One attribute swap reskins your entire app to match any product."
        />
        <FeatureCard
          icon={<Cpu className="size-5" />}
          title="Rules for AI agents"
          description="Registry items carry meta.usage, meta.never, and meta.tokens rules. The Layout MCP server surfaces these to agents and validates generated code before it lands in your codebase."
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  // jsonLd is a static constant object with no user-supplied data — safe to inline.
  const jsonLdString = JSON.stringify(jsonLd);
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>{jsonLdString}</script>
      <TopBar />
      <main className="flex-1">
        <Hero />
        <DemoStrip />
        <Features />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Layout UI · token-contracted components for the AI agent era.{" "}
        <a
          href="https://layout.design"
          className="underline underline-offset-4 hover:text-foreground transition-colors duration-[var(--layout-duration-base)]"
        >
          layout.design
        </a>
      </footer>
    </>
  );
}
