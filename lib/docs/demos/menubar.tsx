"use client";

import * as React from "react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/layout/menubar/menubar";

export const importLine =
  'import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function TextEditorMenubarDemo() {
  const [wordWrap, setWordWrap] = React.useState(true);
  const [minimap, setMinimap] = React.useState(false);
  const [tabSize, setTabSize] = React.useState("2");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New file
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open...
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save as...
            <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                Find
                <MenubarShortcut>⌘F</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Find and replace
                <MenubarShortcut>⌥⌘F</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Editor</MenubarLabel>
          <MenubarSeparator />
          <MenubarCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            Word wrap
            <MenubarShortcut>⌥Z</MenubarShortcut>
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={minimap}
            onCheckedChange={setMinimap}
          >
            Minimap
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Tab size</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioGroup value={tabSize} onValueChange={setTabSize}>
            <MenubarRadioItem value="2">2 spaces</MenubarRadioItem>
            <MenubarRadioItem value="4">4 spaces</MenubarRadioItem>
            <MenubarRadioItem value="tab">Tab</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export const demos: Demo[] = [
  {
    title: "Text editor",
    component: <TextEditorMenubarDemo />,
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New file
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Open...
        <MenubarShortcut>⌘O</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Save
        <MenubarShortcut>⌘S</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo
        <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo
        <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  {
    title: "With checkboxes and radio",
    component: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem defaultChecked>Word wrap</MenubarCheckboxItem>
            <MenubarCheckboxItem>Minimap</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup defaultValue="2">
              <MenubarRadioItem value="2">2 spaces</MenubarRadioItem>
              <MenubarRadioItem value="4">4 spaces</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem defaultChecked>Word wrap</MenubarCheckboxItem>
      <MenubarCheckboxItem>Minimap</MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarRadioGroup defaultValue="2">
        <MenubarRadioItem value="2">2 spaces</MenubarRadioItem>
        <MenubarRadioItem value="4">4 spaces</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
];
