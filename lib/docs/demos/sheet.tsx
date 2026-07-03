"use client";

import * as React from "react";
import { Settings, Bell, Monitor, Palette } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/registry/layout/sheet/sheet";

export const importLine = `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"`;

function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button><Settings />Settings</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your workspace preferences and account settings.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {[
            { icon: Bell, label: "Notifications", description: "Push, email, and in-app alerts" },
            { icon: Monitor, label: "Appearance", description: "Theme, density, and display" },
            { icon: Palette, label: "Design tokens", description: "Default values and overrides" },
          ].map(({ icon: Icon, label, description }) => (
            <button
              key={label}
              className="flex items-center gap-3 rounded-md p-3 text-left transition-colors hover:bg-accent"
            >
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </button>
          ))}
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function LeftSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open from left</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Jump to a section of your project.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 py-4">
          {["Overview", "Colours", "Typography", "Spacing", "Components"].map(
            (item) => (
              <button
                key={item}
                className="rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent"
              >
                {item}
              </button>
            )
          )}
        </nav>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" className="w-full">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function SideVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet: {side}</SheetTitle>
              <SheetDescription>Slides in from the {side}.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button>Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export const demos = [
  {
    title: "Settings panel",
    component: <SettingsSheet />,
    code: `<Sheet>
  <SheetTrigger render={<Button><Settings />Settings</Button>} />
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Manage your workspace preferences.</SheetDescription>
    </SheetHeader>
    {/* content */}
    <SheetFooter>
      <SheetClose render={<Button variant="outline">Close</Button>} />
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  },
  {
    title: "Left side",
    component: <LeftSheet />,
    code: `<Sheet>
  <SheetTrigger render={<Button variant="outline">Open from left</Button>} />
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
      <SheetDescription>Jump to a section.</SheetDescription>
    </SheetHeader>
    {/* nav items */}
  </SheetContent>
</Sheet>`,
  },
  {
    title: "All sides",
    component: <SideVariantsDemo />,
    code: `{(["top", "right", "bottom", "left"] as const).map((side) => (
  <Sheet key={side}>
    <SheetTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Sheet: {side}</SheetTitle>
        <SheetDescription>Slides in from the {side}.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
))}`,
  },
];
