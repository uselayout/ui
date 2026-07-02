"use client";

import * as React from "react";
import { Copy, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/layout/input-group/input-group";
import { Button } from "@/registry/layout/button/button";

export const importLine =
  `import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/registry/layout/input-group/input-group";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function CopyUrlField() {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText("https://layout.design");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        type="text"
        defaultValue="layout.design"
        aria-label="URL"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy URL"
            onClick={handleCopy}
          >
            <Copy className="size-4" />
          </Button>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export const demos: Demo[] = [
  {
    title: "URL field with prefix and copy button",
    component: <CopyUrlField />,
    code: `<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="text" defaultValue="layout.design" aria-label="URL" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>
      <Button variant="ghost" size="icon" aria-label="Copy URL" onClick={handleCopy}>
        <Copy className="size-4" />
      </Button>
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
  },
  {
    title: "Search with icon",
    component: (
      <InputGroup className="max-w-sm">
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <Search className="size-4" />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="search" placeholder="Search components…" />
      </InputGroup>
    ),
    code: `<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <Search className="size-4" />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="search" placeholder="Search components…" />
</InputGroup>`,
  },
  {
    title: "Currency input",
    component: (
      <div className="flex w-full max-w-sm gap-2">
        <InputGroup className="flex-1">
          <InputGroupAddon align="inline-start">
            <InputGroupText>£</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput type="number" placeholder="0.00" min={0} step={0.01} />
        </InputGroup>
        <InputGroup className="w-24">
          <InputGroupInput defaultValue="GBP" readOnly aria-label="Currency code" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>£</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="number" placeholder="0.00" min={0} step={0.01} />
</InputGroup>`,
  },
  {
    title: "Textarea with character count",
    component: (
      <InputGroup className="max-w-sm flex-col items-stretch">
        <InputGroupTextarea
          placeholder="Write a short bio…"
          rows={3}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="px-3 py-1.5 text-xs">
            0 / 160
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    ),
    code: `<InputGroup className="flex-col items-stretch">
  <InputGroupTextarea placeholder="Write a short bio…" rows={3} />
  <InputGroupAddon align="block-end">
    <InputGroupText className="px-3 py-1.5 text-xs">0 / 160</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
  },
];
