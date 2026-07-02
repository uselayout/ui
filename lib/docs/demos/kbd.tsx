import * as React from "react";

import { Kbd, KbdGroup } from "@/registry/layout/kbd/kbd";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Single keys",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Tab</Kbd>
      </div>
    ),
    code: `<Kbd>⌘</Kbd>
<Kbd>⇧</Kbd>
<Kbd>⌥</Kbd>
<Kbd>⌃</Kbd>
<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>
<Kbd>Tab</Kbd>`,
  },
  {
    title: "Key combinations with KbdGroup",
    component: (
      <div className="flex flex-wrap items-center gap-6">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    ),
    code: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>S</Kbd>
</KbdGroup>`,
  },
  {
    title: "In a menu context",
    component: (
      <div className="w-full max-w-xs rounded-lg border border-border bg-card shadow-md overflow-hidden">
        {[
          { label: "Open command palette", keys: ["⌘", "K"] },
          { label: "New project", keys: ["⌘", "N"] },
          { label: "Save", keys: ["⌘", "S"] },
          { label: "Search", keys: ["⌘", "F"] },
        ].map(({ label, keys }) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2 text-sm hover:bg-accent transition-colors duration-[var(--layout-duration-base)]"
          >
            <span className="text-foreground">{label}</span>
            <KbdGroup>
              {keys.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </div>
    ),
    code: `<div className="rounded-lg border border-border bg-card shadow-md overflow-hidden">
  <div className="flex items-center justify-between px-3 py-2 text-sm hover:bg-accent">
    <span>Open command palette</span>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  </div>
  <div className="flex items-center justify-between px-3 py-2 text-sm hover:bg-accent">
    <span>New project</span>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>N</Kbd>
    </KbdGroup>
  </div>
</div>`,
  },
];
