"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/layout/accordion/accordion";

export const importLine =
  'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "FAQ",
    component: (
      <Accordion className="w-full max-w-md">
        <AccordionItem value="what-is-layout">
          <AccordionTrigger>What is Layout?</AccordionTrigger>
          <AccordionContent>
            Layout extracts design systems from Figma files and live websites, then transforms them
            into structured context bundles that enable AI coding agents to produce on-brand UI code
            consistently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-does-mcp-work">
          <AccordionTrigger>How does the MCP server work?</AccordionTrigger>
          <AccordionContent>
            The MCP server exposes 13 tools that AI coding agents such as Claude Code and Cursor can
            call to retrieve design tokens, component specs, and compliance checks. It runs locally
            alongside your project via the @layoutdesign/context CLI.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="figma-plans">
          <AccordionTrigger>Which Figma plans are supported?</AccordionTrigger>
          <AccordionContent>
            Layout works with all Figma plans. The Variables API requires an Enterprise plan but
            Layout falls back gracefully to styles extraction on Starter, Professional, and
            Organisation plans.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <AccordionTrigger>Is there a free tier?</AccordionTrigger>
          <AccordionContent>
            Yes. The CLI and MCP server are MIT-licensed and free to use. The web app offers a free
            tier with generous extraction limits to get started with no credit card required.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<Accordion className="w-full max-w-md">
  <AccordionItem value="what-is-layout">
    <AccordionTrigger>What is Layout?</AccordionTrigger>
    <AccordionContent>
      Layout extracts design systems from Figma files and live websites.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="how-does-mcp-work">
    <AccordionTrigger>How does the MCP server work?</AccordionTrigger>
    <AccordionContent>
      The MCP server exposes 13 tools AI coding agents can call.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    title: "Multiple open",
    component: (
      <Accordion className="w-full max-w-md" multiple>
        <AccordionItem value="colours">
          <AccordionTrigger>Colours</AccordionTrigger>
          <AccordionContent>
            Semantic colour tokens for primary, secondary, muted, accent, destructive, success, and
            warning intents.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="typography">
          <AccordionTrigger>Typography</AccordionTrigger>
          <AccordionContent>
            Font families, size scale, line heights, and weight tokens all available as CSS custom
            properties.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="spacing">
          <AccordionTrigger>Spacing</AccordionTrigger>
          <AccordionContent>
            4px base grid with a density axis that tightens all spacing utilities uniformly at
            runtime.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<Accordion className="w-full max-w-md" multiple>
  <AccordionItem value="colours">
    <AccordionTrigger>Colours</AccordionTrigger>
    <AccordionContent>Semantic colour tokens...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="typography">
    <AccordionTrigger>Typography</AccordionTrigger>
    <AccordionContent>Font families, size scale...</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
];
