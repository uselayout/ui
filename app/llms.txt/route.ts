import { getAllComponentSlugs, getComponentDoc } from "@/lib/docs/components-meta";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const slugs = getAllComponentSlugs();

  const componentLines = slugs
    .map((slug) => {
      const doc = getComponentDoc(slug);
      const title = doc?.title ?? slug;
      const description = doc?.description ?? "";
      return [
        `- [${title}](${SITE_URL}/docs/components/${slug}): ${description}`,
        `  Registry JSON: ${SITE_URL}/r/${slug}.json`,
      ].join("\n");
    })
    .join("\n");

  const body = `# ${SITE_NAME}

${SITE_DESCRIPTION} ${SITE_NAME} is shadcn-compatible: install via the shadcn CLI (\`npx shadcn add @layout/<name>\` with registry at ${SITE_URL}/r/{name}.json) or by direct URL. Every component carries machine-readable \`meta.usage\`, \`meta.never\`, and \`meta.tokens\` rules in its registry JSON, readable by AI coding agents via the Layout MCP server (\`@layoutdesign/context\`). Themes use \`data-brand\`, \`data-theme\`, and \`data-density\` attributes; the shadcn fallback chain means existing shadcn themes are respected automatically.

## Docs

- [Introduction](${SITE_URL}/docs): What Layout UI is, the three principles, and quick links.
- [Installation](${SITE_URL}/docs/installation): Adding components to your project via the shadcn registry CLI.
- [Next.js](${SITE_URL}/docs/installation/next): Installation guide for Next.js projects.
- [Vite](${SITE_URL}/docs/installation/vite): Installation guide for Vite projects.
- [Astro](${SITE_URL}/docs/installation/astro): Installation guide for Astro projects.
- [React Router](${SITE_URL}/docs/installation/react-router): Installation guide for React Router projects.
- [TanStack Start](${SITE_URL}/docs/installation/tanstack): Installation guide for TanStack Start projects.
- [Laravel](${SITE_URL}/docs/installation/laravel): Installation guide for Laravel + Inertia projects.
- [Theming](${SITE_URL}/docs/theming): Token contract, dark mode, brands, density, and shadcn compat.
- [For AI agents](${SITE_URL}/docs/ai-agents): Registry meta, layout.md context files, and the Layout MCP server.
- [Create your theme](${SITE_URL}/create): Interactive theme builder to generate a custom Layout UI brand.

## Components

${componentLines}

## Registry

- [Registry index](${SITE_URL}/r/registry.json): Full shadcn-compatible registry manifest for all ${slugs.length} components.
- [Default theme](${SITE_URL}/r/theme-layout.json): Layout UI default theme — warm neutrals, near-black primary, 10 px radius, plus extended --layout-* tokens (success, warning, shadows, motion).

## Optional

- [layout.design](https://layout.design): Extract design tokens from any Figma file or website. Generates layout.md context kits and CSS brand blocks for use with Layout UI.
- [GitHub](https://github.com/uselayout/ui): Source code for Layout UI components and the registry.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
