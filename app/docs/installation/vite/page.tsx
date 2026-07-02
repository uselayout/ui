import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function ViteInstallPage() {
  return (
    <DocsPage
      title="Vite"
      description="Set up Layout UI in a React + Vite project with Tailwind v4 and TypeScript."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create a Vite React app">
            <Code>{`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}</Code>
          </Step>

          <Step title="Install Tailwind v4">
            <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
            <p>
              Add the Tailwind Vite plugin to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite.config.ts
              </code>
              :
            </p>
            <Code>{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}</Code>
            <p>
              Replace the contents of{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                src/index.css
              </code>{" "}
              with:
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
          </Step>

          <Step title="Add path aliases">
            <p>
              Install{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @types/node
              </code>{" "}
              and configure the{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @
              </code>{" "}
              alias in both{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite.config.ts
              </code>{" "}
              and{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                tsconfig.json
              </code>
              :
            </p>
            <Code>{`npm install -D @types/node`}</Code>
            <Code>{`// vite.config.ts
import path from "path";
// ...
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});`}</Code>
            <Code>{`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <Code>{`npx shadcn@latest init`}</Code>
          </Step>

          <Step title="Add the Layout registry">
            <Code>{`// components.json
{
  "registries": {
    "@layout": "https://layout.design/r/{name}.json"
  }
}`}</Code>
          </Step>

          <Step title="Install the theme and a component">
            <Code>{`npx shadcn add @layout/theme-layout
npx shadcn add @layout/button`}</Code>
          </Step>
        </Steps>
      </DocsSection>
    </DocsPage>
  );
}
