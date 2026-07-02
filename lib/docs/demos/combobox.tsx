"use client";

import * as React from "react";

import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
} from "@/registry/layout/combobox/combobox";

export const importLine =
  `import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator } from "@/registry/layout/combobox/combobox";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "solid", label: "SolidStart" },
];

const languages: { group: string; items: { value: string; label: string }[] }[] = [
  {
    group: "Compiled",
    items: [
      { value: "ts", label: "TypeScript" },
      { value: "rs", label: "Rust" },
      { value: "go", label: "Go" },
    ],
  },
  {
    group: "Interpreted",
    items: [
      { value: "py", label: "Python" },
      { value: "rb", label: "Ruby" },
      { value: "js", label: "JavaScript" },
    ],
  },
];

export const demos: Demo[] = [
  {
    title: "Framework search",
    component: (
      <Combobox<string>
        items={frameworks.map((f) => f.value)}
        defaultValue={null}
      >
        <ComboboxTrigger
          placeholder="Search frameworks…"
          className="w-64"
        />
        <ComboboxContent>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    ),
    code: `<Combobox items={frameworks.map((f) => f.value)}>
  <ComboboxTrigger placeholder="Search frameworks…" className="w-64" />
  <ComboboxContent>
    {frameworks.map((fw) => (
      <ComboboxItem key={fw.value} value={fw.value}>
        {fw.label}
      </ComboboxItem>
    ))}
  </ComboboxContent>
</Combobox>`,
  },
  {
    title: "Grouped languages",
    component: (
      <Combobox<string>
        items={languages.flatMap((g) => g.items.map((i) => i.value))}
        defaultValue={null}
      >
        <ComboboxTrigger
          placeholder="Select a language…"
          className="w-64"
        />
        <ComboboxContent>
          {languages.map((group, idx) => (
            <React.Fragment key={group.group}>
              {idx > 0 && <ComboboxSeparator />}
              <ComboboxGroup>
                <ComboboxLabel>{group.group}</ComboboxLabel>
                {group.items.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </React.Fragment>
          ))}
        </ComboboxContent>
      </Combobox>
    ),
    code: `<Combobox items={allValues}>
  <ComboboxTrigger placeholder="Select a language…" />
  <ComboboxContent>
    <ComboboxGroup>
      <ComboboxLabel>Compiled</ComboboxLabel>
      <ComboboxItem value="ts">TypeScript</ComboboxItem>
      <ComboboxItem value="rs">Rust</ComboboxItem>
    </ComboboxGroup>
    <ComboboxSeparator />
    <ComboboxGroup>
      <ComboboxLabel>Interpreted</ComboboxLabel>
      <ComboboxItem value="py">Python</ComboboxItem>
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
  },
  {
    title: "Disabled",
    component: (
      <Combobox<string>
        items={frameworks.map((f) => f.value)}
        defaultValue={null}
        disabled
      >
        <ComboboxTrigger
          placeholder="Search frameworks…"
          className="w-64"
          disabled
        />
        <ComboboxContent>
          {frameworks.map((fw) => (
            <ComboboxItem key={fw.value} value={fw.value}>
              {fw.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    ),
    code: `<Combobox items={items} disabled>
  <ComboboxTrigger placeholder="Search frameworks…" disabled />
  <ComboboxContent>...</ComboboxContent>
</Combobox>`,
  },
];
