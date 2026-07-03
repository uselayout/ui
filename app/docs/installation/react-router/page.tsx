import type { Metadata } from "next";
import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install Layout UI in React Router",
  description: "Step-by-step guide to adding Layout UI components to a React Router project using the shadcn registry CLI.",
  alternates: { canonical: `${SITE_URL}/docs/installation/react-router` },
};

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function ReactRouterInstallPage() {
  return (
    <DocsPage
      title="React Router"
      description="Set up Layout UI in a React Router v7 project with Vite and Tailwind v4."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create a React Router v7 app">
            <p>
              React Router v7 includes its own CLI that sets up Vite and TypeScript:
            </p>
            <Code>{`npx create-react-router@latest my-app
cd my-app
npm install`}</Code>
          </Step>

          <Step title="Install Tailwind v4">
            <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
            <p>
              Add the Tailwind plugin to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite.config.ts
              </code>
              :
            </p>
            <Code>{`import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],
});`}</Code>
            <p>
              Create or replace{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                app/app.css
              </code>
              :
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
          </Step>

          <Step title="Confirm path aliases">
            <p>
              React Router v7 uses{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite-tsconfig-paths
              </code>{" "}
              to mirror{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                tsconfig.json
              </code>{" "}
              paths into Vite. Add the{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @
              </code>{" "}
              alias if it is not already present:
            </p>
            <Code>{`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./app/*"] }
  }
}`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <Code>{`npx shadcn@latest init -y -b base -p nova`}</Code>
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
          </Step>
        </Steps>
      </DocsSection>
    </DocsPage>
  );
}
