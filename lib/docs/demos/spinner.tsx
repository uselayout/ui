import * as React from "react";

import { Spinner } from "@/registry/layout/spinner/spinner";
import { Button } from "@/registry/layout/button/button";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Sizes",
    component: (
      <div className="flex items-center gap-6">
        <Spinner size={12} />
        <Spinner size={16} />
        <Spinner size={20} />
        <Spinner size={28} />
        <Spinner size={36} />
      </div>
    ),
    code: `<Spinner size={12} />
<Spinner size={16} />
<Spinner size={20} />
<Spinner size={28} />
<Spinner size={36} />`,
  },
  {
    title: "Inside buttons",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Spinner size={14} className="text-primary-foreground" />
          Saving…
        </Button>
        <Button variant="outline">
          <Spinner size={14} />
          Loading…
        </Button>
        <Button variant="secondary">
          <Spinner size={14} />
          Generating…
        </Button>
      </div>
    ),
    code: `<Button>
  <Spinner size={14} className="text-primary-foreground" />
  Saving…
</Button>
<Button variant="outline">
  <Spinner size={14} />
  Loading…
</Button>`,
  },
  {
    title: "Inheriting colour",
    component: (
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Spinner size={20} className="text-destructive" />
          <span className="text-xs text-muted-foreground">destructive</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size={20} className="text-success" />
          <span className="text-xs text-muted-foreground">success</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size={20} className="text-warning" />
          <span className="text-xs text-muted-foreground">warning</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size={20} className="text-foreground" />
          <span className="text-xs text-muted-foreground">foreground</span>
        </div>
      </div>
    ),
    code: `<Spinner size={20} className="text-destructive" />
<Spinner size={20} className="text-success" />
<Spinner size={20} className="text-warning" />
<Spinner size={20} className="text-foreground" />`,
  },
];
