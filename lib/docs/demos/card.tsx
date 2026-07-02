import * as React from "react";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/registry/layout/card/card";
import { Button } from "@/registry/layout/button/button";
import { Input } from "@/registry/layout/input/input";
import { Label } from "@/registry/layout/label/label";
import { Badge } from "@/registry/layout/badge/badge";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Basic card",
    component: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to your Layout workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have 3 projects and 12 saved components ready to use.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">
            Open workspace
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Welcome back</CardTitle>
    <CardDescription>
      Sign in to continue to your Layout workspace.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      You have 3 projects and 12 saved components ready to use.
    </p>
  </CardContent>
  <CardFooter>
    <Button size="sm">
      Open workspace
      <ArrowRight />
    </Button>
  </CardFooter>
</Card>`,
  },
  {
    title: "Card with action slot",
    component: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>API usage</CardTitle>
          <CardDescription>Monthly extraction quota</CardDescription>
          <CardAction>
            <Badge variant="success">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-semibold tabular-nums text-foreground">
              847
            </span>
            <span className="mb-0.5 text-sm text-muted-foreground">/ 1,000</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            153 extractions remaining this month.
          </p>
        </CardContent>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>API usage</CardTitle>
    <CardDescription>Monthly extraction quota</CardDescription>
    <CardAction>
      <Badge variant="success">Active</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <div className="flex items-end gap-1">
      <span className="text-3xl font-semibold tabular-nums text-foreground">
        847
      </span>
      <span className="mb-0.5 text-sm text-muted-foreground">/ 1,000</span>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">
      153 extractions remaining this month.
    </p>
  </CardContent>
</Card>`,
  },
  {
    title: "Settings form inside a card",
    component: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>
            Choose how and when you receive updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-demo-email">Email address</Label>
            <Input
              id="card-demo-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-demo-digest">Digest frequency</Label>
            <Input id="card-demo-digest" placeholder="Daily" />
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">Save preferences</Button>
          <Button size="sm" variant="outline">
            Reset
          </Button>
        </CardFooter>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Notification preferences</CardTitle>
    <CardDescription>
      Choose how and when you receive updates.
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
    <div className="flex flex-col gap-2">
      <Label htmlFor="digest">Digest frequency</Label>
      <Input id="digest" placeholder="Daily" />
    </div>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Save preferences</Button>
    <Button size="sm" variant="outline">Reset</Button>
  </CardFooter>
</Card>`,
  },
];
