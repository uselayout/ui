import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
} from "lucide-react";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/registry/layout/alert/alert";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default (informational)",
    component: (
      <Alert className="w-full max-w-lg">
        <Info className="size-4" />
        <AlertTitle>Design tokens extracted</AlertTitle>
        <AlertDescription>
          Your layout.md bundle is ready. Copy it into your project or install
          via the CLI.
        </AlertDescription>
      </Alert>
    ),
    code: `<Alert>
  <Info className="size-4" />
  <AlertTitle>Design tokens extracted</AlertTitle>
  <AlertDescription>
    Your layout.md bundle is ready. Copy it into your project or install
    via the CLI.
  </AlertDescription>
</Alert>`,
  },
  {
    title: "Success",
    component: (
      <Alert variant="success" className="w-full max-w-lg">
        <CheckCircle2 className="size-4" />
        <AlertTitle>Published</AlertTitle>
        <AlertDescription>
          Your layout.md bundle has been pushed to the repository and is live
          for all team members.
        </AlertDescription>
      </Alert>
    ),
    code: `<Alert variant="success">
  <CheckCircle2 className="size-4" />
  <AlertTitle>Published</AlertTitle>
  <AlertDescription>
    Your layout.md bundle has been pushed to the repository and is live
    for all team members.
  </AlertDescription>
</Alert>`,
  },
  {
    title: "Warning",
    component: (
      <Alert variant="warning" className="w-full max-w-lg">
        <TriangleAlert className="size-4" />
        <AlertTitle>Deprecation notice</AlertTitle>
        <AlertDescription>
          The <code className="font-mono text-xs">--layout-shadow-*</code>{" "}
          tokens will be renamed in v2. Update your references before upgrading.
        </AlertDescription>
      </Alert>
    ),
    code: `<Alert variant="warning">
  <TriangleAlert className="size-4" />
  <AlertTitle>Deprecation notice</AlertTitle>
  <AlertDescription>
    The <code>--layout-shadow-*</code> tokens will be renamed in v2.
  </AlertDescription>
</Alert>`,
  },
  {
    title: "Destructive",
    component: (
      <Alert variant="destructive" className="w-full max-w-lg">
        <AlertCircle className="size-4" />
        <AlertTitle>Extraction failed</AlertTitle>
        <AlertDescription>
          Could not reach the Figma file. Check your access token and file
          permissions, then try again.
        </AlertDescription>
      </Alert>
    ),
    code: `<Alert variant="destructive">
  <AlertCircle className="size-4" />
  <AlertTitle>Extraction failed</AlertTitle>
  <AlertDescription>
    Could not reach the Figma file. Check your access token and file
    permissions, then try again.
  </AlertDescription>
</Alert>`,
  },
];
