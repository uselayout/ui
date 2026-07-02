import * as React from "react";
import { CheckCircle2, FileText, GitBranch } from "lucide-react";

import { Badge } from "@/registry/layout/badge/badge";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "All variants",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>`,
  },
  {
    title: "With icons",
    component: (
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success">
          <CheckCircle2 />
          Published
        </Badge>
        <Badge variant="warning">
          <GitBranch />
          Draft
        </Badge>
        <Badge variant="secondary">
          <FileText />
          layout.md
        </Badge>
      </div>
    ),
    code: `<Badge variant="success">
  <CheckCircle2 />
  Published
</Badge>
<Badge variant="warning">
  <GitBranch />
  Draft
</Badge>
<Badge variant="secondary">
  <FileText />
  layout.md
</Badge>`,
  },
  {
    title: "As status indicators in context",
    component: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {[
          { label: "Extraction", status: "success", text: "Complete" },
          { label: "Synthesis", status: "warning", text: "In progress" },
          { label: "Export", status: "outline", text: "Pending" },
        ].map(({ label, status, text }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="text-sm text-foreground">{label}</span>
            <Badge variant={status as "success" | "warning" | "outline"}>
              {text}
            </Badge>
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
  <span className="text-sm text-foreground">Extraction</span>
  <Badge variant="success">Complete</Badge>
</div>
<div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
  <span className="text-sm text-foreground">Synthesis</span>
  <Badge variant="warning">In progress</Badge>
</div>
<div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
  <span className="text-sm text-foreground">Export</span>
  <Badge variant="outline">Pending</Badge>
</div>`,
  },
];
