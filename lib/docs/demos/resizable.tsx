"use client";

import * as React from "react";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/registry/layout/resizable/resizable";

export const importLine = `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"`;

export const demos = [
  {
    title: "Horizontal split",
    component: (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border border-border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <p className="text-sm font-medium">Sidebar</p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <p className="text-sm font-medium">Content</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    code: `<ResizablePanelGroup
  orientation="horizontal"
  className="min-h-[200px] rounded-lg border border-border"
>
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <p className="text-sm font-medium">Sidebar</p>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <p className="text-sm font-medium">Content</p>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
  },
  {
    title: "With handle grip",
    component: (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border border-border"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-4">
            <p className="text-sm font-medium">Navigation</p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-4">
            <p className="text-sm font-medium">Main panel</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    code: `<ResizablePanelGroup
  orientation="horizontal"
  className="min-h-[200px] rounded-lg border border-border"
>
  <ResizablePanel defaultSize={30}>
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-sm font-medium">Navigation</p>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-sm font-medium">Main panel</p>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
  },
  {
    title: "Nested panels",
    component: (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border border-border"
      >
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center p-4">
            <p className="text-sm font-medium">Left</p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-sm font-medium">Top right</p>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-sm font-medium">Bottom right</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    code: `<ResizablePanelGroup orientation="horizontal" className="min-h-[200px] rounded-lg border border-border">
  <ResizablePanel defaultSize={40}>
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-sm font-medium">Left</p>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-sm font-medium">Top right</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-sm font-medium">Bottom right</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`,
  },
];
