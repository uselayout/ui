"use client";

import * as React from "react";
import { Calendar, GitBranch, Users } from "lucide-react";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/registry/layout/hover-card/hover-card";

export const importLine = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"`;

function UserHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded"
            onClick={(e) => e.preventDefault()}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              A
            </span>
            @alexjohnson
          </a>
        }
      />
      <HoverCardContent>
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            A
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">@alexjohnson</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Design systems engineer. Building Layout UI at layout.design.
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            Joined July 2024
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            12 followers
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function RepoHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded"
            onClick={(e) => e.preventDefault()}
          >
            layout-ui
          </a>
        }
      />
      <HoverCardContent side="top">
        <div className="flex items-start gap-3">
          <GitBranch className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">uselayout/layout-ui</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Component library built on Base UI primitives and the Layout
              design token system.
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>TypeScript</span>
              <span>MIT</span>
              <span>128 stars</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export const demos = [
  {
    title: "User profile",
    component: (
      <p className="text-sm text-muted-foreground">
        Design system by <UserHoverCard />. Hover to see profile.
      </p>
    ),
    code: `<HoverCard>
  <HoverCardTrigger render={<a href="#">@alexjohnson</a>} />
  <HoverCardContent>
    <div className="flex gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        A
      </div>
      <div>
        <p className="text-sm font-semibold">Alex Johnson</p>
        <p className="text-xs text-muted-foreground">@alexjohnson</p>
        <p className="mt-2 text-xs text-muted-foreground">Design systems engineer.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
  },
  {
    title: "Repository card",
    component: (
      <p className="text-sm text-muted-foreground">
        See the <RepoHoverCard /> repository for source code.
      </p>
    ),
    code: `<HoverCard>
  <HoverCardTrigger render={<a href="#">layout-ui</a>} />
  <HoverCardContent side="top">
    <div className="flex items-start gap-3">
      <GitBranch className="size-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-semibold">uselayout/layout-ui</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Component library built on Base UI primitives.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
  },
];
