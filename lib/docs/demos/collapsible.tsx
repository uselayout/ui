"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/layout/collapsible/collapsible";

export const importLine =
  'import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function StarredReposDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@uselayout starred repos</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon" aria-label="Toggle repos" />}>
          <ChevronsUpDown className="size-4" />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @uselayout/app
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @uselayout/cli
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @uselayout/figma
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarSectionDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-64">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-[var(--layout-duration-base)] ease-out">
        Navigation
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <nav className="mt-1 flex flex-col gap-0.5 pl-3">
          {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-[var(--layout-duration-base)] ease-out"
            >
              {item}
            </a>
          ))}
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const demos: Demo[] = [
  {
    title: "Starred repositories",
    component: <StarredReposDemo />,
    code: `const [isOpen, setIsOpen] = React.useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
  <div className="flex items-center justify-between px-4">
    <h4 className="text-sm font-semibold">Starred repos</h4>
    <CollapsibleTrigger render={<Button variant="ghost" size="icon" aria-label="Toggle repos" />}>
      <ChevronsUpDown className="size-4" />
    </CollapsibleTrigger>
  </div>
  <div className="rounded-md border px-4 py-3 font-mono text-sm">@uselayout/app</div>
  <CollapsibleContent className="space-y-2">
    <div className="rounded-md border px-4 py-3 font-mono text-sm">@uselayout/cli</div>
    <div className="rounded-md border px-4 py-3 font-mono text-sm">@uselayout/figma</div>
  </CollapsibleContent>
</Collapsible>`,
  },
  {
    title: "Sidebar section",
    component: <SidebarSectionDemo />,
    code: `const [open, setOpen] = React.useState(true);

<Collapsible open={open} onOpenChange={setOpen} className="w-64">
  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
    Navigation
    <ChevronsUpDown className="size-4" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <nav className="mt-1 flex flex-col gap-0.5 pl-3">
      <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-accent">Dashboard</a>
      <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-accent">Projects</a>
    </nav>
  </CollapsibleContent>
</Collapsible>`,
  },
];
