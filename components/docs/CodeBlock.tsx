"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // execCommand fallback for HTTP contexts
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  return (
    <div className={cn("group relative", className)}>
      {language && (
        <span className="absolute left-4 top-3 text-[0.6875rem] font-mono text-muted-foreground select-none pointer-events-none">
          {language}
        </span>
      )}
      <pre
        className={cn(
          "overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground",
          language && "pt-8"
        )}
      >
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground",
          "opacity-0 transition-opacity duration-[var(--layout-duration-base)] ease-out group-hover:opacity-100",
          "hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-success" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
