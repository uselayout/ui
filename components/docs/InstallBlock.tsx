"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/CodeBlock";

interface InstallBlockProps {
  name: string;
  className?: string;
}

type Method = "shadcn" | "url";

export function InstallBlock({ name, className }: InstallBlockProps) {
  const [method, setMethod] = React.useState<Method>("shadcn");

  const commands: Record<Method, string> = {
    shadcn: `npx shadcn@latest add @layout/${name}`,
    url: `npx shadcn@latest add https://layout.design/r/${name}.json`,
  };

  const labels: Record<Method, string> = {
    shadcn: "shadcn CLI",
    url: "URL",
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-1">
        {(["shadcn", "url"] as Method[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-[var(--layout-duration-base)] ease-out outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
              method === m
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels[m]}
          </button>
        ))}
      </div>
      <CodeBlock code={commands[method]} language="bash" />
    </div>
  );
}
