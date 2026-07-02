import * as React from "react";

import { Textarea } from "@/registry/layout/textarea/textarea";
import { Label } from "@/registry/layout/label/label";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="textarea-default">Notes</Label>
        <Textarea
          id="textarea-default"
          placeholder="Add any additional context about this design system…"
          rows={4}
        />
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea
    id="notes"
    placeholder="Add any additional context…"
    rows={4}
  />
</div>`,
  },
  {
    title: "Error state",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="textarea-error">Description</Label>
        <Textarea
          id="textarea-error"
          defaultValue="Too short."
          rows={3}
          aria-invalid
        />
        <p className="text-xs text-destructive">
          Description must be at least 20 characters.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="description">Description</Label>
  <Textarea
    id="description"
    defaultValue="Too short."
    rows={3}
    aria-invalid
  />
  <p className="text-xs text-destructive">
    Description must be at least 20 characters.
  </p>
</div>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="textarea-disabled">Generated summary</Label>
        <Textarea
          id="textarea-disabled"
          defaultValue="This kit uses a warm neutral palette derived from the Figma file, with a near-black primary and generous corner radii."
          rows={3}
          disabled
        />
        <p className="text-xs text-muted-foreground">
          AI-generated. Edit in the studio editor.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="summary">Generated summary</Label>
  <Textarea
    id="summary"
    defaultValue="This kit uses a warm neutral palette…"
    rows={3}
    disabled
  />
</div>`,
  },
];
