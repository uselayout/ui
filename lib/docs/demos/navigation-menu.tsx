"use client";

import * as React from "react";
import { BookOpen, Code2, Layers, Sparkles, Zap } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/layout/navigation-menu/navigation-menu";
import { cn } from "@/lib/utils";

export const importLine =
  'import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

const features: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "Design system extraction",
    href: "#",
    description: "Pull colours, typography, and spacing from any Figma file or live website.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "AI component generation",
    href: "#",
    description: "Generate on-brand UI components using your extracted design context.",
    icon: <Sparkles className="size-5" />,
  },
  {
    title: "MCP server",
    href: "#",
    description: "Feed your design system directly to Claude Code, Cursor, and Copilot.",
    icon: <Code2 className="size-5" />,
  },
  {
    title: "Instant exports",
    href: "#",
    description: "Export tokens as CSS variables, Tailwind config, or W3C DTCG JSON.",
    icon: <Zap className="size-5" />,
  },
];

function ListItem({
  className,
  title,
  children,
  href,
  icon,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className={cn("group block select-none rounded-md p-3 no-underline outline-none", className)}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <span className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground">
              {icon}
            </span>
          )}
          <div>
            <div className="text-sm font-medium leading-none mb-1">{title}</div>
            <p className="text-xs leading-snug text-muted-foreground">{children}</p>
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}

function ProductNavDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((feature) => (
                <ListItem
                  key={feature.title}
                  title={feature.title}
                  href={feature.href}
                  icon={feature.icon}
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink
                  href="#"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none"
                >
                  <BookOpen className="size-6 mb-2" />
                  <div className="mb-2 text-lg font-medium">Getting started</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Extract your first design system in under five minutes.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="CLI reference">
                Full command reference for the @layoutdesign/context CLI.
              </ListItem>
              <ListItem href="#" title="MCP tools">
                All 13 MCP tools with usage examples and type signatures.
              </ListItem>
              <ListItem href="#" title="Figma plugin">
                Sync tokens bidirectionally between Figma and your codebase.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const demos: Demo[] = [
  {
    title: "Product navigation",
    component: <ProductNavDemo />,
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-1 p-3 md:grid-cols-2">
          <li>
            <NavigationMenuLink href="/features/extraction">
              <div className="text-sm font-medium mb-1">Design system extraction</div>
              <p className="text-xs text-muted-foreground">
                Pull colours, typography, and spacing from any Figma file.
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  {
    title: "Simple links",
    component: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/blog" className={navigationMenuTriggerStyle()}>
        Blog
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
];
