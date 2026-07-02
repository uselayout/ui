"use client";

import * as React from "react";

import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InstallBlock } from "@/components/docs/InstallBlock";
import { Kbd, KbdGroup } from "@/registry/layout/kbd/kbd";
import { getComponentDoc } from "@/lib/docs/components-meta";
import {
  demoRegistry,
  importLines as generatedImportLines,
} from "@/lib/docs/demos";
import { baseImportLines } from "./import-lines";

export function ComponentDocContent({ slug }: { slug: string }) {
  const doc = getComponentDoc(slug);
  if (!doc) return null;

  const module = demoRegistry[slug];
  const demos = module?.demos ?? [];
  const [hero, ...rest] = demos;
  const importLine =
    generatedImportLines[slug] ??
    baseImportLines[slug] ??
    `import { ${doc.title} } from "@/components/ui/${slug}"`;

  return (
    <DocsPage title={doc.title} description={doc.description}>
      {/* Hero preview */}
      {hero && (
        <DocsSection title="Preview">
          <ComponentPreview code={hero.code}>{hero.component}</ComponentPreview>
        </DocsSection>
      )}

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
        <p className="text-sm leading-relaxed text-muted-foreground">
          {doc.meta.usage}
        </p>

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
                  <span className="text-muted-foreground">
                    {rule.replace(/^Never\s+/i, "")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
