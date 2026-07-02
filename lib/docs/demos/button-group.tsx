import * as React from "react";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";

import { ButtonGroup } from "@/registry/layout/button-group/button-group";
import { Button } from "@/registry/layout/button/button";

export const importLine =
  `import { ButtonGroup } from "@/registry/layout/button-group/button-group";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Text formatting toolbar",
    component: (
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Bold">
          <Bold />
        </Button>
        <Button variant="outline" size="icon" aria-label="Italic">
          <Italic />
        </Button>
        <Button variant="outline" size="icon" aria-label="Underline">
          <Underline />
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup>
  <Button variant="outline" size="icon" aria-label="Bold">
    <Bold />
  </Button>
  <Button variant="outline" size="icon" aria-label="Italic">
    <Italic />
  </Button>
  <Button variant="outline" size="icon" aria-label="Underline">
    <Underline />
  </Button>
</ButtonGroup>`,
  },
  {
    title: "Alignment picker",
    component: (
      <ButtonGroup>
        <Button variant="outline" aria-label="Align left">
          <AlignLeft />
          Left
        </Button>
        <Button variant="outline" aria-label="Align centre">
          <AlignCenter />
          Centre
        </Button>
        <Button variant="outline" aria-label="Align right">
          <AlignRight />
          Right
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup>
  <Button variant="outline" aria-label="Align left">
    <AlignLeft /> Left
  </Button>
  <Button variant="outline" aria-label="Align centre">
    <AlignCenter /> Centre
  </Button>
  <Button variant="outline" aria-label="Align right">
    <AlignRight /> Right
  </Button>
</ButtonGroup>`,
  },
  {
    title: "Vertical group",
    component: (
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`,
  },
  {
    title: "Primary action group",
    component: (
      <ButtonGroup>
        <Button>Save changes</Button>
        <Button size="icon" aria-label="More options">
          <AlignRight />
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup>
  <Button>Save changes</Button>
  <Button size="icon" aria-label="More options">
    <ChevronDown />
  </Button>
</ButtonGroup>`,
  },
];
