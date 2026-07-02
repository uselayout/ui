// Upserts registry-fragments/*.json items into registry.json (matched by name).
// Run after adding a component: node scripts/merge-registry.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "registry.json");
const fragmentsDir = join(root, "registry-fragments");

const registry = JSON.parse(readFileSync(registryPath, "utf8"));

if (!existsSync(fragmentsDir)) {
  console.log("No registry-fragments directory; nothing to merge.");
  process.exit(0);
}

const fragments = readdirSync(fragmentsDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(fragmentsDir, f), "utf8")));

let added = 0;
let updated = 0;
for (const item of fragments) {
  const idx = registry.items.findIndex((i) => i.name === item.name);
  if (idx === -1) {
    registry.items.push(item);
    added += 1;
  } else {
    registry.items[idx] = item;
    updated += 1;
  }
}

// Keep the theme first, then components alphabetically.
registry.items.sort((a, b) => {
  const at = a.type === "registry:theme" ? 0 : 1;
  const bt = b.type === "registry:theme" ? 0 : 1;
  return at - bt || a.name.localeCompare(b.name);
});

writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
console.log(`Merged ${fragments.length} fragments (${added} added, ${updated} updated). Total items: ${registry.items.length}`);
