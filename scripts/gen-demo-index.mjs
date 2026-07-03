// Generates lib/docs/demos/index.ts from the demo modules on disk.
// Run after adding a component: node scripts/gen-demo-index.mjs
import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const demosDir = join(root, "lib/docs/demos");

const slugs = readdirSync(demosDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort();

const ident = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Demos";

const lines = [
  "// GENERATED FILE, do not edit. Regenerate with: node scripts/gen-demo-index.mjs",
  "import type * as React from \"react\";",
  "",
  ...slugs.map((s) => `import * as ${ident(s)} from "./${s}";`),
  "",
  "export interface DemoEntry {",
  "  title: string;",
  "  component: React.ReactNode;",
  "  code: string;",
  "}",
  "",
  "interface DemoModule {",
  "  demos: DemoEntry[];",
  "  importLine?: string;",
  "}",
  "",
  "export const demoRegistry: Record<string, DemoModule> = {",
  ...slugs.map((s) => `  "${s}": ${ident(s)},`),
  "};",
  "",
  "export const importLines: Record<string, string> = Object.fromEntries(",
  "  Object.entries(demoRegistry)",
  "    .filter(([, m]) => m.importLine)",
  "    .map(([slug, m]) => [slug, m.importLine as string])",
  ");",
  "",
];

writeFileSync(join(demosDir, "index.ts"), lines.join("\n"));
console.log(`Generated demos/index.ts with ${slugs.length} modules: ${slugs.join(", ")}`);
