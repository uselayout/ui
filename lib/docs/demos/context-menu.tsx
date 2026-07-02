"use client";

import * as React from "react";
import {
  Copy,
  CopyPlus,
  FilePlus,
  FolderOpen,
  Scissors,
  Trash2,
} from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/layout/context-menu/context-menu";

export const importLine =
  'import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function FileContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuItem>
            <FolderOpen />
            Open
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <CopyPlus />
              Open with
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>VS Code</ContextMenuItem>
              <ContextMenuItem>Cursor</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Other...</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <Copy />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Scissors />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <FilePlus />
            Duplicate
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function CheckboxContextMenuDemo() {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-20 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
        Right-click for formatting
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Text style</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={bold} onCheckedChange={setBold}>
          Bold
          <ContextMenuShortcut>⌘B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={italic} onCheckedChange={setItalic}>
          Italic
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={underline}
          onCheckedChange={setUnderline}
        >
          Underline
          <ContextMenuShortcut>⌘U</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function RadioContextMenuDemo() {
  const [view, setView] = React.useState("grid");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-20 w-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
        Right-click to change view
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuLabel>View as</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const demos: Demo[] = [
  {
    title: "File browser",
    component: <FileContextMenuDemo />,
    code: `<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-52">
    <ContextMenuItem>
      <FolderOpen />
      Open
      <ContextMenuShortcut>⌘O</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <Copy />
      Copy
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">
      <Trash2 />
      Delete
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  {
    title: "With checkboxes",
    component: <CheckboxContextMenuDemo />,
    code: `const [bold, setBold] = React.useState(false);

<ContextMenu>
  <ContextMenuTrigger className="flex h-20 w-64 items-center justify-center rounded-lg border border-dashed">
    Right-click for formatting
  </ContextMenuTrigger>
  <ContextMenuContent className="w-48">
    <ContextMenuLabel>Text style</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={bold} onCheckedChange={setBold}>
      Bold
      <ContextMenuShortcut>⌘B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  {
    title: "Radio group",
    component: <RadioContextMenuDemo />,
    code: `const [view, setView] = React.useState("grid");

<ContextMenu>
  <ContextMenuTrigger className="flex h-20 w-64 items-center justify-center rounded-lg border border-dashed">
    Right-click to change view
  </ContextMenuTrigger>
  <ContextMenuContent className="w-40">
    <ContextMenuLabel>View as</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value={view} onValueChange={setView}>
      <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
      <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
      <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`,
  },
];
