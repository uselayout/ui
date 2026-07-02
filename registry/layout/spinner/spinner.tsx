import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: number;
}

function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <Loader2
      data-slot="spinner"
      aria-label="Loading"
      role="status"
      size={size}
      className={cn("animate-spin text-muted-foreground shrink-0", className)}
      {...props}
    />
  );
}

export { Spinner, type SpinnerProps };
