import registryData from "@/registry.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ComponentMeta {
  usage: string;
  never: string[];
  tokens: string[];
}

export interface ComponentDoc {
  name: string;
  title: string;
  description: string;
  meta: ComponentMeta;
}

// ---------------------------------------------------------------------------
// Derive a typed list of component items from the registry, excluding the
// theme entry which has a different shape.
// ---------------------------------------------------------------------------

type RegistryItem = (typeof registryData.items)[number];

function isComponentItem(
  item: RegistryItem
): item is RegistryItem & { meta: ComponentMeta } {
  return "meta" in item;
}

const componentItems = registryData.items.filter(isComponentItem);

// ---------------------------------------------------------------------------
// Exported helpers
// ---------------------------------------------------------------------------

export function getComponentDoc(slug: string): ComponentDoc | null {
  const item = componentItems.find((c) => c.name === slug);
  if (!item) return null;

  return {
    name: item.name,
    title: item.title,
    description: item.description,
    meta: item.meta,
  };
}

/** All slugs, used for generateStaticParams */
export function getAllComponentSlugs(): string[] {
  return componentItems.map((c) => c.name);
}
