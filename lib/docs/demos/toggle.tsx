"use client";

import * as React from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

import { Toggle } from "@/registry/layout/toggle/toggle";

export const importLine = `import { Toggle } from "@/components/ui/toggle"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="flex items-center gap-2">
        <Toggle aria-label="Toggle bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline />
        </Toggle>
      </div>
    ),
    code: `<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>
<Toggle aria-label="Toggle italic">
  <Italic />
</Toggle>
<Toggle aria-label="Toggle underline">
  <Underline />
</Toggle>`,
  },
  {
    title: "Outline variant",
    component: (
      <div className="flex items-center gap-2">
        <Toggle variant="outline" aria-label="Align left">
          <AlignLeft />
        </Toggle>
        <Toggle variant="outline" aria-label="Align centre">
          <AlignCenter />
        </Toggle>
        <Toggle variant="outline" aria-label="Align right">
          <AlignRight />
        </Toggle>
      </div>
    ),
    code: `<Toggle variant="outline" aria-label="Align left">
  <AlignLeft />
</Toggle>
<Toggle variant="outline" aria-label="Align centre">
  <AlignCenter />
</Toggle>
<Toggle variant="outline" aria-label="Align right">
  <AlignRight />
</Toggle>`,
  },
  {
    title: "Sizes",
    component: (
      <div className="flex items-center gap-2">
        <Toggle size="sm" aria-label="Small bold">
          <Bold />
          Small
        </Toggle>
        <Toggle aria-label="Default bold">
          <Bold />
          Default
        </Toggle>
        <Toggle size="lg" aria-label="Large bold">
          <Bold />
          Large
        </Toggle>
      </div>
    ),
    code: `<Toggle size="sm" aria-label="Small bold">
  <Bold />
  Small
</Toggle>
<Toggle aria-label="Default bold">
  <Bold />
  Default
</Toggle>
<Toggle size="lg" aria-label="Large bold">
  <Bold />
  Large
</Toggle>`,
  },
  {
    title: "With text and pressed by default",
    component: (
      <Toggle defaultPressed aria-label="Toggle italic">
        <Italic />
        Italic
      </Toggle>
    ),
    code: `<Toggle defaultPressed aria-label="Toggle italic">
  <Italic />
  Italic
</Toggle>`,
  },
];
