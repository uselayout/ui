// GENERATED FILE — do not edit. Regenerate with: node scripts/gen-demo-index.mjs
import type * as React from "react";

import * as alertDemos from "./alert";
import * as badgeDemos from "./badge";
import * as buttonDemos from "./button";
import * as cardDemos from "./card";
import * as inputDemos from "./input";
import * as kbdDemos from "./kbd";
import * as labelDemos from "./label";
import * as separatorDemos from "./separator";
import * as skeletonDemos from "./skeleton";
import * as spinnerDemos from "./spinner";
import * as tableDemos from "./table";
import * as textareaDemos from "./textarea";

export interface DemoEntry {
  title: string;
  component: React.ReactNode;
  code: string;
}

interface DemoModule {
  demos: DemoEntry[];
  importLine?: string;
}

export const demoRegistry: Record<string, DemoModule> = {
  "alert": alertDemos,
  "badge": badgeDemos,
  "button": buttonDemos,
  "card": cardDemos,
  "input": inputDemos,
  "kbd": kbdDemos,
  "label": labelDemos,
  "separator": separatorDemos,
  "skeleton": skeletonDemos,
  "spinner": spinnerDemos,
  "table": tableDemos,
  "textarea": textareaDemos,
};

export const importLines: Record<string, string> = Object.fromEntries(
  Object.entries(demoRegistry)
    .filter(([, m]) => m.importLine)
    .map(([slug, m]) => [slug, m.importLine as string])
);
