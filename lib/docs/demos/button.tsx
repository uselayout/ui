import * as React from "react";
import { ArrowRight, Download, Trash2 } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import { Spinner } from "@/registry/layout/spinner/spinner";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Variants",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
    code: `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
  },
  {
    title: "Sizes",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Large</Button>
        <Button>Default</Button>
        <Button size="sm">Small</Button>
        <Button size="icon" aria-label="Arrow right">
          <ArrowRight />
        </Button>
      </div>
    ),
    code: `<Button size="lg">Large</Button>
<Button>Default</Button>
<Button size="sm">Small</Button>
<Button size="icon" aria-label="Arrow right">
  <ArrowRight />
</Button>`,
  },
  {
    title: "With icons",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          Get started
          <ArrowRight />
        </Button>
        <Button variant="outline">
          <Download />
          Download
        </Button>
        <Button variant="destructive">
          <Trash2 />
          Delete project
        </Button>
      </div>
    ),
    code: `<Button>
  Get started
  <ArrowRight />
</Button>
<Button variant="outline">
  <Download />
  Download
</Button>
<Button variant="destructive">
  <Trash2 />
  Delete project
</Button>`,
  },
  {
    title: "Loading and disabled states",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Spinner size={14} className="text-primary-foreground" />
          Saving…
        </Button>
        <Button variant="outline">
          <Spinner size={14} />
          Generating…
        </Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled secondary
        </Button>
      </div>
    ),
    code: `<Button>
  <Spinner size={14} className="text-primary-foreground" />
  Saving…
</Button>
<Button variant="outline">
  <Spinner size={14} />
  Generating…
</Button>
<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>
  Disabled secondary
</Button>`,
  },
  {
    title: "Render as link",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Button render={<a href="https://layout.design" />}>
          Visit layout.design
          <ArrowRight />
        </Button>
        <Button variant="outline" render={<a href="/docs" />}>
          Read the docs
        </Button>
      </div>
    ),
    code: `<Button render={<a href="https://layout.design" />}>
  Visit layout.design
  <ArrowRight />
</Button>
<Button variant="outline" render={<a href="/docs" />}>
  Read the docs
</Button>`,
  },
];
