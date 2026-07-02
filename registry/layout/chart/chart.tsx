"use client";

import * as React from "react";
import {
  Legend,
  Tooltip,
  type TooltipContentProps,
} from "recharts";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChartSeriesConfig {
  /** Human-readable label shown in legends and tooltips. */
  label: string;
  /**
   * Colour for this series. Must be a CSS custom property reference,
   * e.g. "var(--layout-primary)". Never a hardcoded hex value.
   */
  color: string;
}

export type ChartConfig = Record<string, ChartSeriesConfig>;

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maps series keys to their label and colour. Colours are injected as
   * `--color-<key>` CSS custom properties scoped to this container so
   * Recharts dataKey references resolve automatically.
   */
  config: ChartConfig;
  children: React.ReactNode;
}

function ChartContainer({
  config,
  children,
  className,
  style,
  ...props
}: ChartContainerProps) {
  // Build scoped CSS custom properties: --color-<key> = resolved colour.
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {};
    for (const [key, value] of Object.entries(config)) {
      vars[`--color-${key}`] = value.color;
    }
    return vars;
  }, [config]);

  return (
    <div
      data-slot="chart"
      className={cn("w-full", className)}
      style={{ ...cssVars, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChartTooltip — thin re-export of Recharts Tooltip with sensible defaults
// ---------------------------------------------------------------------------

const ChartTooltip = Tooltip;

// ---------------------------------------------------------------------------
// ChartTooltipContent
// ---------------------------------------------------------------------------

type ChartTooltipContentProps = Partial<TooltipContentProps<number, string>> & {
  config?: ChartConfig;
  className?: string;
  labelClassName?: string;
  hideLabel?: boolean;
};

function ChartTooltipContent({
  active,
  payload,
  label,
  config,
  className,
  labelClassName,
  hideLabel = false,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      data-slot="chart-tooltip"
      className={cn(
        "rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-sm text-popover-foreground",
        className
      )}
    >
      {!hideLabel && label && (
        <p
          className={cn(
            "mb-1.5 font-medium text-foreground",
            labelClassName
          )}
        >
          {label}
        </p>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((entry, i) => {
          const key = (entry.dataKey as string | undefined) ?? String(i);
          const seriesConfig = config?.[key];
          const colour =
            entry.color ??
            (seriesConfig
              ? `var(--color-${key})`
              : "var(--layout-muted-fg)");
          const displayLabel = seriesConfig?.label ?? String(entry.name ?? key);

          return (
            <div key={key} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: colour }}
              />
              <span className="text-muted-foreground">{displayLabel}</span>
              <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString()
                  : String(entry.value ?? "")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChartLegend — thin re-export of Recharts Legend with sensible defaults
// ---------------------------------------------------------------------------

const ChartLegend = Legend;

// ---------------------------------------------------------------------------
// ChartLegendContent
// ---------------------------------------------------------------------------

interface ChartLegendContentProps {
  payload?: Array<{
    value: string;
    color?: string;
    dataKey?: string | number;
  }>;
  config?: ChartConfig;
  className?: string;
}

function ChartLegendContent({
  payload,
  config,
  className,
}: ChartLegendContentProps) {
  if (!payload?.length) return null;

  return (
    <div
      data-slot="chart-legend"
      className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground", className)}
    >
      {payload.map((entry) => {
        const key = entry.dataKey as string | undefined;
        const seriesConfig = key ? config?.[key] : undefined;
        const colour = entry.color ?? (key ? `var(--color-${key})` : "var(--layout-muted-fg)");
        const displayLabel = seriesConfig?.label ?? entry.value ?? key;

        return (
          <div key={entry.value} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: colour }}
            />
            <span>{displayLabel}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
