import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function AstroInstallPage() {
  return (
    <DocsPage
      title="Astro"
      description="Set up Layout UI in an Astro project using the React integration and Tailwind v4."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create an Astro app">
            <Code>{`npm create astro@latest my-app
cd my-app`}</Code>
          </Step>

          <Step title="Add the React integration">
            <p>
              Layout UI components are React components, so the Astro React
              integration is required:
            </p>
            <Code>{`npx astro add react`}</Code>
          </Step>

          <Step title="Add Tailwind v4">
            <Code>{`npx astro add tailwind`}</Code>
            <p>
              The Astro Tailwind integration v4 adds{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @tailwindcss/vite
              </code>{" "}
              automatically. Confirm{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                src/styles/global.css
              </code>{" "}
              starts with:
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
          </Step>

          <Step title="Configure path aliases">
            <p>
              Add the{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @
              </code>{" "}
              alias to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                tsconfig.json
              </code>
              :
            </p>
            <Code>{`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`}</Code>
            <p>
              Also add it to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                astro.config.mjs
              </code>
              :
            </p>
            <Code>{`import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": path.resolve("./src") },
    },
  },
});`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <Code>{`npx shadcn@latest init`}</Code>
          </Step>

          <Step title="Add the Layout registry and install components">
            <Code>{`// components.json
{
  "registries": {
    "@layout": "https://layout.design/r/{name}.json"
  }
}`}</Code>
            <Code>{`npx shadcn add @layout/theme-layout
npx shadcn add @layout/button`}</Code>
            <p>
              Use Layout UI components as React islands in your{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                .astro
              </code>{" "}
              files with{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                client:load
              </code>{" "}
              for interactive components:
            </p>
            <Code>{`---
import { Button } from "@/components/ui/button";
---
<Button client:load>Get started</Button>`}</Code>
          </Step>
        </Steps>
      </DocsSection>
    </DocsPage>
  );
}
