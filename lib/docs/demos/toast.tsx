"use client";

import * as React from "react";

import { Button } from "@/registry/layout/button/button";
import { Toaster, toast } from "@/registry/layout/toast/toast";

export const importLine = `import { Toaster, toast } from "@/components/ui/toast"`;

/**
 * Usage:
 * 1. Mount <Toaster /> once in your root layout.
 * 2. Call toast() anywhere in client code.
 *
 * API:
 *   toast({ title, description, duration?, action? })
 *   toast.success({ title, description })
 *   toast.warning({ title, description })
 *   toast.destructive({ title, description })
 *   toast.dismiss(id?)
 */

function AllVariantsDemo() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            toast({ title: "Project saved", description: "Your changes have been saved." })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.success({
              title: "Extraction complete",
              description: "192 tokens extracted from your Figma file.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.warning({
              title: "Rate limit approaching",
              description: "You have 4 extractions remaining this hour.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.destructive({
              title: "Extraction failed",
              description: "Could not connect to Figma. Check your token.",
            })
          }
        >
          Destructive
        </Button>
      </div>
    </>
  );
}

function WithActionDemo() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast({
              title: "Project archived",
              description: "Moved to archive. You can restore it at any time.",
              action: {
                label: "Undo",
                onClick: () =>
                  toast.success({ title: "Restored", description: "Project is active again." }),
              },
            })
          }
        >
          With action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success({
              title: "Bundle exported",
              description: "layout.zip is ready to download.",
              action: {
                label: "Download",
                onClick: () => {},
              },
            })
          }
        >
          Success with action
        </Button>
      </div>
    </>
  );
}

function TitleOnlyDemo() {
  return (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast({ title: "Link copied to clipboard" })}
      >
        Title only
      </Button>
    </>
  );
}

export const demos = [
  {
    title: "All variants",
    component: <AllVariantsDemo />,
    code: `// Mount once in your root layout:
// <Toaster />

toast({ title: "Project saved", description: "Your changes have been saved." });
toast.success({ title: "Extraction complete", description: "192 tokens extracted." });
toast.warning({ title: "Rate limit approaching", description: "4 extractions remaining." });
toast.destructive({ title: "Extraction failed", description: "Check your Figma token." });`,
  },
  {
    title: "With action",
    component: <WithActionDemo />,
    code: `toast({
  title: "Project archived",
  description: "Moved to archive. You can restore it at any time.",
  action: {
    label: "Undo",
    onClick: () => toast.success({ title: "Restored" }),
  },
});`,
  },
  {
    title: "Title only",
    component: <TitleOnlyDemo />,
    code: `toast({ title: "Link copied to clipboard" });`,
  },
];
