"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/layout/tabs/tabs";

export const importLine =
  'import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";';

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="rounded-lg border p-4 mt-2">
            <p className="text-sm font-medium">Account settings</p>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account details and preferences here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-lg border p-4 mt-2">
            <p className="text-sm font-medium">Change password</p>
            <p className="text-sm text-muted-foreground mt-1">
              Update your password to keep your account secure.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-sm">Account settings content.</p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-sm">Password settings content.</p>
  </TabsContent>
</Tabs>`,
  },
  {
    title: "Three tabs",
    component: (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-sm text-muted-foreground mt-3">Project overview and key metrics.</p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="text-sm text-muted-foreground mt-3">Traffic and usage analytics.</p>
        </TabsContent>
        <TabsContent value="reports">
          <p className="text-sm text-muted-foreground mt-3">Generated reports and exports.</p>
        </TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content.</TabsContent>
  <TabsContent value="analytics">Analytics content.</TabsContent>
  <TabsContent value="reports">Reports content.</TabsContent>
</Tabs>`,
  },
  {
    title: "With disabled tab",
    component: (
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="disabled" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <p className="text-sm text-muted-foreground mt-3">Active tab content.</p>
        </TabsContent>
        <TabsContent value="inactive">
          <p className="text-sm text-muted-foreground mt-3">Inactive tab content.</p>
        </TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="inactive">Inactive</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="active">Active content.</TabsContent>
  <TabsContent value="inactive">Inactive content.</TabsContent>
</Tabs>`,
  },
];
