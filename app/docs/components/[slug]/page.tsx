import * as React from "react";
import { notFound } from "next/navigation";

import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InstallBlock } from "@/components/docs/InstallBlock";
import { Kbd, KbdGroup } from "@/registry/layout/kbd/kbd";
import {
  getAllComponentSlugs,
  getComponentDoc,
} from "@/lib/docs/components-meta";

import {
  demoRegistry,
  importLines as generatedImportLines,
} from "@/lib/docs/demos";

// ---------------------------------------------------------------------------
// Per-component import strings (usage section)
// Newer demo modules export their own `importLine`; this record covers the
// original set and acts as a fallback.
// ---------------------------------------------------------------------------

const baseImportLines: Record<string, string> = {
  button: `import { Button } from "@/components/ui/button"`,
  badge: `import { Badge } from "@/components/ui/badge"`,
  card: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"`,
  input: `import { Input } from "@/components/ui/input"`,
  textarea: `import { Textarea } from "@/components/ui/textarea"`,
  label: `import { Label } from "@/components/ui/label"`,
  separator: `import { Separator } from "@/components/ui/separator"`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton"`,
  alert: `import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"`,
  table: `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"`,
  spinner: `import { Spinner } from "@/components/ui/spinner"`,
  kbd: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
};

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllComponentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} · Layout UI`,
    description: doc.description,
  };
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  const module = demoRegistry[slug];
  if (!module) notFound();

  const { demos } = module;
  const [hero, ...rest] = demos;
  const importLine =
    generatedImportLines[slug] ??
    baseImportLines[slug] ??
    `import { ${doc.title} } from "@/components/ui/${slug}"`;

  return (
    <DocsPage title={doc.title} description={doc.description}>
      {/* Hero preview */}
      <DocsSection title="Preview">
        <ComponentPreview code={hero.code}>
          {hero.component}
        </ComponentPreview>
      </DocsSection>

      {/* Installation */}
      <DocsSection title="Installation">
        <InstallBlock name={slug} />
      </DocsSection>

      {/* Usage */}
      <DocsSection title="Usage">
        <CodeBlock code={importLine} language="tsx" />
      </DocsSection>

      {/* Examples */}
      {rest.length > 0 && (
        <DocsSection title="Examples">
          <div className="flex flex-col gap-8">
            {rest.map((demo) => (
              <div key={demo.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-foreground">
                  {demo.title}
                </h3>
                <ComponentPreview code={demo.code}>
                  {demo.component}
                </ComponentPreview>
              </div>
            ))}
          </div>
        </DocsSection>
      )}

      {/* Guidelines for AI agents */}
      <DocsSection title="Guidelines for AI agents">
        {/* Usage guidance */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {doc.meta.usage}
        </p>

        {/* Never list */}
        {doc.meta.never.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Never
            </h3>
            <ul className="flex flex-col gap-1.5">
              {doc.meta.never.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 inline-flex rounded-sm bg-destructive/10 px-1.5 py-0.5 text-[0.6875rem] font-medium text-destructive shrink-0">
                    Never
                  </span>
                  <span className="text-muted-foreground">{rule.replace(/^Never\s+/i, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Token chips */}
        {doc.meta.tokens.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Tokens consumed
            </h3>
            <div className="flex flex-wrap gap-2">
              {doc.meta.tokens.map((token) => (
                <KbdGroup key={token}>
                  <Kbd>{token}</Kbd>
                </KbdGroup>
              ))}
            </div>
          </div>
        )}
      </DocsSection>
    </DocsPage>
  );
}
