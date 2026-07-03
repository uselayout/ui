import type { Metadata } from "next";
import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install Layout UI in Next.js",
  description: "Step-by-step guide to adding Layout UI components to a Next.js project using the shadcn registry CLI.",
  alternates: { canonical: `${SITE_URL}/docs/installation/next` },
};

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function NextInstallPage() {
  return (
    <DocsPage
      title="Next.js"
      description="Set up Layout UI in a new or existing Next.js project using the App Router, Tailwind v4, and TypeScript strict mode."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create a Next.js app">
            <p>Bootstrap a new project with the latest Next.js and accept the TypeScript and Tailwind v4 prompts:</p>
            <Code>{`npx create-next-app@latest my-app --typescript --tailwind --app --src-dir no
cd my-app`}</Code>
          </Step>

          <Step title="Verify Tailwind v4 is installed">
            <p>
              Next.js scaffolding installs Tailwind v4 automatically. Confirm{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app/globals.css
              </code>{" "}
              starts with the Tailwind v4 import:
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
            <p>
              If you see{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @tailwind base;
              </code>{" "}
              instead, you have Tailwind v3. Upgrade:{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                npm install tailwindcss@latest @tailwindcss/postcss@latest
              </code>
              .
            </p>
          </Step>

          <Step title="Confirm path aliases">
            <p>
              The scaffolded{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                tsconfig.json
              </code>{" "}
              should already have the{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @/*
              </code>{" "}
              alias. Check:
            </p>
            <Code>{`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <p>Run the shadcn init command to create a components.json. The -b flag picks the primitives library and -p picks a starting preset; any preset works because Layout UI themes replace it:</p>
            <Code>{`npx shadcn@latest init -y -b base -p nova`}</Code>
          </Step>

          <Step title="Add the Layout registry">
            <p>
              Open{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                components.json
              </code>{" "}
              and add the Layout registry:
            </p>
            <Code>{`{
  "registries": {
    "@layout": "https://layout.design/r/{name}.json"
  }
}`}</Code>
          </Step>

          <Step title="Install the theme and your first component">
            <p>Install the Layout theme (sets the full token contract) then your first component:</p>
            <Code>{`npx shadcn add @layout/theme-layout
npx shadcn add @layout/button`}</Code>
            <p>
              The theme token file is added to your{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                globals.css
              </code>
              . The button lands in{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                components/ui/button.tsx
              </code>
              .
            </p>
          </Step>

          <Step title="Use the component">
            <Code>{`import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button>Get started</Button>;
}`}</Code>
          </Step>
        </Steps>
      </DocsSection>

      <DocsSection title="Existing project">
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you already have a Next.js project with shadcn configured, skip to step 5 above:
          add the Layout registry to{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            components.json
          </code>{" "}
          and run{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            npx shadcn add @layout/theme-layout
          </code>
          .
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If your project uses Tailwind v3 you will need to migrate to v4 first, as the Layout
          token contract uses{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            @theme inline
          </code>
          , CSS layers, and{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            @custom-variant
          </code>{" "}
          which are v4-only.
        </p>
      </DocsSection>
    </DocsPage>
  );
}
