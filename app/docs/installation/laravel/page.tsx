import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Steps, Step } from "@/components/docs/Steps";

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function LaravelInstallPage() {
  return (
    <DocsPage
      title="Laravel"
      description="Set up Layout UI in a Laravel project using the Inertia.js React stack and Tailwind v4."
    >
      <DocsSection title="New project">
        <Steps>
          <Step title="Create a Laravel app with the React/Inertia starter kit">
            <p>
              Laravel 11+ ships official starter kits. Use the React variant which
              includes Inertia.js, TypeScript, and Tailwind:
            </p>
            <Code>{`laravel new my-app --starter-kit=react
cd my-app`}</Code>
          </Step>

          <Step title="Upgrade to Tailwind v4">
            <p>
              The Laravel React starter kit ships with Tailwind v3. Upgrade to v4:
            </p>
            <Code>{`npm install tailwindcss@latest @tailwindcss/vite@latest
npm uninstall @tailwindcss/forms autoprefixer postcss`}</Code>
            <p>
              Update{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                vite.config.ts
              </code>{" "}
              to use the Vite plugin instead of PostCSS:
            </p>
            <Code>{`import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    laravel({ input: ["resources/css/app.css", ...] }),
    react(),
    tailwindcss(),
  ],
});`}</Code>
            <p>
              Replace{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                resources/css/app.css
              </code>{" "}
              content with:
            </p>
            <Code>{`@import "tailwindcss";`}</Code>
          </Step>

          <Step title="Configure path aliases">
            <p>
              The starter kit sets up{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                @/
              </code>{" "}
              aliased to{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                resources/js/
              </code>
              . Verify in{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                tsconfig.json
              </code>
              :
            </p>
            <Code>{`{
  "compilerOptions": {
    "paths": { "@/*": ["./resources/js/*"] }
  }
}`}</Code>
          </Step>

          <Step title="Initialise shadcn">
            <Code>{`npx shadcn@latest init`}</Code>
            <p>
              When prompted for the components path, use{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                resources/js/components
              </code>
              .
            </p>
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
