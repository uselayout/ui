"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/layout/chart/chart";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

// ---------------------------------------------------------------------------
// Shared dataset
// ---------------------------------------------------------------------------

const monthlyData = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 5800, expenses: 3100 },
  { month: "Mar", revenue: 4900, expenses: 2600 },
  { month: "Apr", revenue: 7200, expenses: 3400 },
  { month: "May", revenue: 6100, expenses: 3000 },
  { month: "Jun", revenue: 8400, expenses: 3700 },
];

const trafficData = [
  { month: "Jan", organic: 1200, paid: 800,  direct: 400 },
  { month: "Feb", organic: 1800, paid: 950,  direct: 520 },
  { month: "Mar", organic: 1500, paid: 870,  direct: 480 },
  { month: "Apr", organic: 2200, paid: 1100, direct: 610 },
  { month: "May", organic: 1900, paid: 980,  direct: 570 },
  { month: "Jun", organic: 2600, paid: 1300, direct: 720 },
];

// ---------------------------------------------------------------------------
// Bar chart demo
// ---------------------------------------------------------------------------

const revenueConfig: ChartConfig = {
  revenue:  { label: "Revenue",  color: "var(--layout-primary)" },
  expenses: { label: "Expenses", color: "var(--layout-danger)" },
};

function RevenueBarChart() {
  return (
    <ChartContainer config={revenueConfig} className="max-w-2xl">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={monthlyData} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--layout-border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--layout-muted-fg)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--layout-muted-fg)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                config={revenueConfig}
                labelClassName="font-medium"
              />
            }
          />
          <ChartLegend content={<ChartLegendContent config={revenueConfig} />} />
          <Bar dataKey="revenue"  fill="var(--color-revenue)"  radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Area chart demo
// ---------------------------------------------------------------------------

const trafficConfig: ChartConfig = {
  organic: { label: "Organic",  color: "var(--layout-success)" },
  paid:    { label: "Paid",     color: "var(--layout-warning)" },
  direct:  { label: "Direct",   color: "var(--layout-primary)" },
};

function TrafficAreaChart() {
  return (
    <ChartContainer config={trafficConfig} className="max-w-2xl">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={trafficData}>
          <defs>
            <linearGradient id="grad-organic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-organic)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-organic)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-paid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-paid)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-paid)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-direct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-direct)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-direct)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--layout-border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--layout-muted-fg)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--layout-muted-fg)" }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip
            content={<ChartTooltipContent config={trafficConfig} />}
          />
          <ChartLegend content={<ChartLegendContent config={trafficConfig} />} />
          <Area
            type="monotone"
            dataKey="organic"
            stroke="var(--color-organic)"
            strokeWidth={2}
            fill="url(#grad-organic)"
          />
          <Area
            type="monotone"
            dataKey="paid"
            stroke="var(--color-paid)"
            strokeWidth={2}
            fill="url(#grad-paid)"
          />
          <Area
            type="monotone"
            dataKey="direct"
            stroke="var(--color-direct)"
            strokeWidth={2}
            fill="url(#grad-direct)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const importLine =
  `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/registry/layout/chart/chart";`;

export const demos: Demo[] = [
  {
    title: "Bar chart: revenue vs expenses",
    component: <RevenueBarChart />,
    code: `const revenueConfig: ChartConfig = {
  revenue:  { label: "Revenue",  color: "var(--layout-primary)" },
  expenses: { label: "Expenses", color: "var(--layout-danger)" },
};

<ChartContainer config={revenueConfig}>
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={monthlyData} barCategoryGap="30%">
      <CartesianGrid strokeDasharray="3 3" stroke="var(--layout-border)" vertical={false} />
      <XAxis dataKey="month" tick={{ fill: "var(--layout-muted-fg)" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "var(--layout-muted-fg)" }} axisLine={false} tickLine={false} />
      <ChartTooltip content={<ChartTooltipContent config={revenueConfig} />} />
      <ChartLegend content={<ChartLegendContent config={revenueConfig} />} />
      <Bar dataKey="revenue"  fill="var(--color-revenue)"  radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</ChartContainer>`,
  },
  {
    title: "Area chart: traffic channels",
    component: <TrafficAreaChart />,
    code: `const trafficConfig: ChartConfig = {
  organic: { label: "Organic", color: "var(--layout-success)" },
  paid:    { label: "Paid",    color: "var(--layout-warning)" },
  direct:  { label: "Direct",  color: "var(--layout-primary)" },
};

<ChartContainer config={trafficConfig}>
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={trafficData}>
      <defs>
        <linearGradient id="grad-organic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="var(--color-organic)" stopOpacity={0.25} />
          <stop offset="95%" stopColor="var(--color-organic)" stopOpacity={0} />
        </linearGradient>
        {/* repeat for paid, direct */}
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--layout-border)" vertical={false} />
      <XAxis dataKey="month" tick={{ fill: "var(--layout-muted-fg)" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "var(--layout-muted-fg)" }} axisLine={false} tickLine={false} />
      <ChartTooltip content={<ChartTooltipContent config={trafficConfig} />} />
      <ChartLegend content={<ChartLegendContent config={trafficConfig} />} />
      <Area type="monotone" dataKey="organic" stroke="var(--color-organic)" strokeWidth={2} fill="url(#grad-organic)" />
      <Area type="monotone" dataKey="paid"    stroke="var(--color-paid)"    strokeWidth={2} fill="url(#grad-paid)" />
      <Area type="monotone" dataKey="direct"  stroke="var(--color-direct)"  strokeWidth={2} fill="url(#grad-direct)" />
    </AreaChart>
  </ResponsiveContainer>
</ChartContainer>`,
  },
];
