import * as React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/layout/table/table";
import { Badge } from "@/registry/layout/badge/badge";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

const invoices = [
  {
    id: "INV-2025-001",
    date: "1 May 2025",
    desc: "Starter plan",
    amount: "£9.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2025-002",
    date: "1 Jun 2025",
    desc: "Pro plan",
    amount: "£29.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2025-003",
    date: "1 Jul 2025",
    desc: "Pro plan",
    amount: "£29.00",
    status: "Due" as const,
  },
];

const members = [
  { name: "Alice Chen", email: "alice@example.com", role: "Owner", joined: "Jan 2025" },
  { name: "Ben Wright", email: "ben@example.com", role: "Admin", joined: "Feb 2025" },
  { name: "Cara Osei", email: "cara@example.com", role: "Member", joined: "Mar 2025" },
];

export const demos: Demo[] = [
  {
    title: "Invoice table",
    component: (
      <div className="w-full max-w-2xl rounded-lg border border-border overflow-hidden">
        <Table>
          <TableCaption className="sr-only">Recent invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                <TableCell>{inv.desc}</TableCell>
                <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === "Paid" ? "success" : "warning"}>
                    {inv.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right tabular-nums">£67.00</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    ),
    code: `<div className="rounded-lg border border-border overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Description</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((inv) => (
        <TableRow key={inv.id}>
          <TableCell className="font-mono text-xs">{inv.id}</TableCell>
          <TableCell className="text-muted-foreground">{inv.date}</TableCell>
          <TableCell>{inv.desc}</TableCell>
          <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
          <TableCell>
            <Badge variant={inv.status === "Paid" ? "success" : "warning"}>
              {inv.status}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right tabular-nums">£67.00</TableCell>
        <TableCell />
      </TableRow>
    </TableFooter>
  </Table>
</div>`,
  },
  {
    title: "Team members table",
    component: (
      <div className="w-full max-w-2xl rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.email}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {m.email}
                </TableCell>
                <TableCell>
                  <Badge variant={m.role === "Owner" ? "default" : "secondary"}>
                    {m.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ),
    code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {members.map((m) => (
      <TableRow key={m.email}>
        <TableCell className="font-medium">{m.name}</TableCell>
        <TableCell className="text-muted-foreground font-mono text-xs">
          {m.email}
        </TableCell>
        <TableCell>
          <Badge variant={m.role === "Owner" ? "default" : "secondary"}>
            {m.role}
          </Badge>
        </TableCell>
        <TableCell className="text-muted-foreground">{m.joined}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
  },
];
