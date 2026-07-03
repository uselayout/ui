import type { Metadata } from "next";
import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install Layout UI in TanStack Start",
  description: "Step-by-step guide to adding Layout UI components to a TanStack Start project using the shadcn registry CLI.",
  alternates: { canonical: `${SITE_URL}/docs/installation/tanstack` },
};

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function TanStackInstallPage() {
  return (
    <DocsPage
      title="TanStack Start"
      description="Set up Layout UI in a TanStack Start project with full-stack React, Vite, and Tailwind v4."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create a TanStack Start app">
            <p>
              TanStack Start uses the TanStack Router CLI for project scaffolding:
            </p>
            <Code>{`npm create tanstack@latest
# Choose: Start / React / TypeScript
cd my-app
npm install`}</Code>
          </Step>

          <Step title="Install Tailwind v4">
            <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
            <p>
              Add the Tailwind plugin to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app.config.ts
              </code>
              :
            </p>
            <Code>{`import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  vite: {
    plugins: [TanStackRouterVite(), tailwindcss()],
  },
});`}</Code>
            <p>
              Create{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app/styles/globals.css
              </code>
              :
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
            <p>
              Import it in your root route (
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app/routes/__root.tsx
              </code>
              ):
            </p>
            <Code>{`import "@/styles/globals.css";`}</Code>
          </Step>

          <Step title="Configure path aliases">
            <Code>{`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./app/*"] }
  }
}`}</Code>
            <p>
              Mirror the alias in{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app.config.ts
              </code>{" "}
              using{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite-tsconfig-paths
              </code>
              :
            </p>
            <Code>{`npm install -D vite-tsconfig-paths`}</Code>
            <Code>{`import tsconfigPaths from "vite-tsconfig-paths";
// add to vite.plugins: [TanStackRouterVite(), tailwindcss(), tsconfigPaths()]`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <Code>{`npx shadcn@latest init -y -b base -p nova`}</Code>
          </Step>

          <Step title="Add the Layout registry and install components">
            <Code>{`// components.json
{
  "registries": {
    "@layout": "${SITE_URL}/r/{name}.json"
  }
}`}</Code>
            <Code>{`npx shadcn add @layout/theme-layout
npx shadcn add @layout/button`}</Code>
          </Step>
        </Steps>
      </DocsSection>
    </DocsPage>
  );
}
