import { getAllComponentSlugs, getComponentDoc } from "@/lib/docs/components-meta";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const slugs = getAllComponentSlugs();

  // -------------------------------------------------------------------------
  // Token contract summary
  // -------------------------------------------------------------------------
  const tokenContract = `## Token Contract

Layout UI components reference only --layout-* semantic intent tokens. Changing a token value updates every component that uses it with no per-component overrides needed.

### Semantic tokens (--layout-*)

| Token | Purpose |
|-------|---------|
| --layout-bg | Page/root background |
| --layout-fg | Primary text and icons |
| --layout-primary | Primary action colour (filled buttons, active indicators) |
| --layout-primary-fg | Text/icons on primary surfaces |
| --layout-secondary | Secondary action colour |
| --layout-secondary-fg | Text/icons on secondary surfaces |
| --layout-accent | Hover states, selected backgrounds, mild highlight |
| --layout-accent-fg | Text/icons on accent surfaces |
| --layout-muted | Subtle background fill (inputs, skeletons, muted cards) |
| --layout-muted-fg | De-emphasised text (descriptions, placeholders, labels) |
| --layout-border | Dividers, input outlines, card borders |
| --layout-ring | Focus ring colour |
| --layout-input | Input field background |
| --layout-surface | Elevated card/panel background |
| --layout-surface-fg | Text on surface |
| --layout-overlay | Modal/dialog background (popover, sheet, drawer) |
| --layout-overlay-fg | Text on overlay surfaces |
| --layout-popover | Popover/dropdown background |
| --layout-popover-fg | Text on popover surfaces |
| --layout-danger | Destructive/error intent |
| --layout-danger-fg | Text/icons on danger surfaces |
| --layout-success | Success intent |
| --layout-success-fg | Text/icons on success surfaces |
| --layout-warning | Warning intent |
| --layout-warning-fg | Text/icons on warning surfaces |
| --layout-radius | Base border-radius (all components derive from this) |
| --layout-shadow-xs | Subtlest elevation (buttons, badges) |
| --layout-shadow-sm | Low elevation (cards) |
| --layout-shadow-md | Medium elevation (popovers, dropdowns) |
| --layout-shadow-lg | High elevation (modals, sheets) |
| --layout-duration-fast | 100 ms, micro-interactions |
| --layout-duration-base | 150 ms, standard transitions |
| --layout-duration-slow | 250 ms, panel transitions/exit animations |
| --layout-font-mono | Monospace font stack (kbd, code) |

### Theming model

Themes are applied via HTML attributes on any ancestor element:

- \`data-brand="<name>"\`: Activates a brand's CSS custom properties. Apply to a scoping wrapper to limit the brand to a preview area, or to \`<html>\` for global reskinning.
- \`data-theme="dark"\`: Activates dark mode values.
- \`data-density="compact"\`: Activates compact spacing (reduced padding/gap).

Shadcn compatibility: the token fallback chain is \`--layout-primary: var(--primary)\`, so any project with shadcn CSS variables already set gets correct colours without any additional configuration.

Install the default theme: \`npx shadcn add ${SITE_URL}/r/theme-layout.json\`
`;

  // -------------------------------------------------------------------------
  // Per-component full dump
  // -------------------------------------------------------------------------
  const componentSections = slugs
    .map((slug) => {
      const doc = getComponentDoc(slug);
      if (!doc) return "";

      const neverList =
        doc.meta.never.length > 0
          ? doc.meta.never.map((r) => `  - ${r}`).join("\n")
          : "  (none)";

      const tokensList =
        doc.meta.tokens.length > 0
          ? doc.meta.tokens.map((t) => `  - ${t}`).join("\n")
          : "  (no specific tokens; inherits from parent)";

      return `### ${doc.title} (\`${slug}\`)

**Description:** ${doc.description}

**Docs:** ${SITE_URL}/docs/components/${slug}
**Registry JSON:** ${SITE_URL}/r/${slug}.json
**Install:** \`npx shadcn add ${SITE_URL}/r/${slug}.json\`

**Usage rule:**
${doc.meta.usage}

**Never rules:**
${neverList}

**Tokens consumed:**
${tokensList}
`;
    })
    .join("\n---\n\n");

  const body = `# ${SITE_NAME}: Full Machine-Readable Reference

${SITE_DESCRIPTION}

**Registry base URL:** ${SITE_URL}/r/{name}.json
**Registry manifest:** ${SITE_URL}/r/registry.json
**Install command pattern:** \`npx shadcn add ${SITE_URL}/r/<component-name>.json\`
**MCP server:** \`npx @layoutdesign/context serve\` (package: \`@layoutdesign/context\`)
**layout.design:** https://layout.design

---

${tokenContract}

---

## Components (${slugs.length} total)

${componentSections}

---

## MCP Tools (via @layoutdesign/context)

| Tool | Purpose |
|------|---------|
| get_design_system | Returns the full layout.md context document for the current kit. |
| get_design_section | Returns a single section: colours, typography, spacing, components, etc. |
| get_tokens | Returns all CSS custom properties by category, ready to paste. |
| get_component | Returns a component's code, usage rules, and never rules by name. |
| get_component_with_context | Component code plus resolved token values and brand-specific guidelines. |
| list_components | Full component inventory with metadata, tags, and token usage. |
| check_compliance | Validates a code snippet against design system rules. Returns violations. |

## Recommended Agent Workflow

1. Call \`get_design_system()\` to load layout.md into context before writing any UI.
2. Call \`get_component("<name>")\` to fetch the component's rules and code.
3. Generate the UI code following the usage and never rules.
4. Call \`check_compliance(code)\` to validate before finishing.
5. Fix any violations and re-validate.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
