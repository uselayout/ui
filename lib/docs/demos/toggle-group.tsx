"use client";

import * as React from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, LayoutGrid } from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/layout/toggle-group/toggle-group";

export const importLine = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function MultipleDemo() {
  const [value, setValue] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroup
      multiple
      value={value}
      onValueChange={setValue}
      aria-label="Text formatting"
    >
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export const demos: Demo[] = [
  {
    title: "Single selection",
    component: (
      <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align centre">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    code: `<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align centre">
    <AlignCenter />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight />
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  {
    title: "Multiple selection",
    component: <MultipleDemo />,
    code: `const [value, setValue] = React.useState<string[]>(["bold"]);

<ToggleGroup
  multiple
  value={value}
  onValueChange={setValue}
  aria-label="Text formatting"
>
  <ToggleGroupItem value="bold" aria-label="Bold">
    <Bold />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">
    <Italic />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">
    <Underline />
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  {
    title: "Outline variant",
    component: (
      <ToggleGroup variant="outline" defaultValue={["grid"]} aria-label="View mode">
        <ToggleGroupItem value="list" aria-label="List view">
          <List />
          List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <LayoutGrid />
          Grid
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    code: `<ToggleGroup variant="outline" defaultValue={["grid"]} aria-label="View mode">
  <ToggleGroupItem value="list" aria-label="List view">
    <List />
    List
  </ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="Grid view">
    <LayoutGrid />
    Grid
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  {
    title: "Sizes",
    component: (
      <div className="flex flex-col gap-3">
        <ToggleGroup size="sm" defaultValue={["b"]} aria-label="Small formatting">
          <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="u"><Underline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={["b"]} aria-label="Default formatting">
          <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="u"><Underline /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup size="lg" defaultValue={["b"]} aria-label="Large formatting">
          <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="u"><Underline /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    ),
    code: `<ToggleGroup size="sm" defaultValue={["b"]} aria-label="Small formatting">
  <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
</ToggleGroup>
<ToggleGroup defaultValue={["b"]} aria-label="Default formatting">
  <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
</ToggleGroup>
<ToggleGroup size="lg" defaultValue={["b"]} aria-label="Large formatting">
  <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
</ToggleGroup>`,
  },
];
