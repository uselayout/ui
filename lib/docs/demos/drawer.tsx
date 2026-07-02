"use client";

import * as React from "react";
import { Share2, Download, Copy, Trash2 } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/registry/layout/drawer/drawer";

export const importLine = `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"`;

const shareActions = [
  { icon: Copy, label: "Copy link", description: "Anyone with the link can view" },
  { icon: Share2, label: "Share to team", description: "Notify your teammates" },
  { icon: Download, label: "Export bundle", description: "Download as .zip" },
  { icon: Trash2, label: "Delete", description: "Remove permanently", danger: true },
];

function ShareDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button><Share2 />Share</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share design system</DrawerTitle>
          <DrawerDescription>
            Choose how to share or export your design system.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 py-2">
          {shareActions.map(({ icon: Icon, label, description, danger }) => (
            <button
              key={label}
              className={[
                "flex items-center gap-3 rounded-md p-3 text-left transition-colors",
                danger
                  ? "hover:bg-destructive/10 text-destructive"
                  : "hover:bg-accent",
              ].join(" ")}
            >
              <Icon className="size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className={`text-xs ${danger ? "text-destructive/70" : "text-muted-foreground"}`}>
                  {description}
                </p>
              </div>
            </button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" className="w-full">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SimpleDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick actions</DrawerTitle>
          <DrawerDescription>
            Swipe down or tap Cancel to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-3 gap-3 py-4">
          {["Export", "Preview", "Publish", "Archive", "Duplicate", "Delete"].map(
            (label) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 rounded-md border border-border p-3 text-xs font-medium transition-colors hover:bg-accent"
              >
                {label}
              </button>
            )
          )}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" className="w-full">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const demos = [
  {
    title: "Share actions",
    component: <ShareDrawer />,
    code: `<Drawer>
  <DrawerTrigger render={<Button><Share2 />Share</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Share design system</DrawerTitle>
      <DrawerDescription>
        Choose how to share or export your design system.
      </DrawerDescription>
    </DrawerHeader>
    {/* action list */}
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" className="w-full">Cancel</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
  {
    title: "Grid actions",
    component: <SimpleDrawer />,
    code: `<Drawer>
  <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Quick actions</DrawerTitle>
      <DrawerDescription>Swipe down or tap Cancel to dismiss.</DrawerDescription>
    </DrawerHeader>
    <div className="grid grid-cols-3 gap-3 py-4">
      {actions.map((label) => (
        <button key={label} className="rounded-md border border-border p-3 text-xs font-medium">
          {label}
        </button>
      ))}
    </div>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" className="w-full">Cancel</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
];
