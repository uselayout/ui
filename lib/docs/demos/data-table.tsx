"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/registry/layout/badge/badge";
import {
  DataTable,
  createSelectColumn,
} from "@/registry/layout/data-table/data-table";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

// ---------------------------------------------------------------------------
// Dataset
// ---------------------------------------------------------------------------

type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

interface Payment {
  id: string;
  email: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  method: string;
}

const payments: Payment[] = [
  { id: "PAY-001", email: "alice@example.com",    amount: 99.00,  status: "completed", date: "2 Jun 2025",  method: "Visa" },
  { id: "PAY-002", email: "ben@example.com",       amount: 249.00, status: "completed", date: "5 Jun 2025",  method: "Mastercard" },
  { id: "PAY-003", email: "cara@example.com",      amount: 19.00,  status: "pending",   date: "7 Jun 2025",  method: "PayPal" },
  { id: "PAY-004", email: "david@example.com",     amount: 499.00, status: "completed", date: "10 Jun 2025", method: "Visa" },
  { id: "PAY-005", email: "eva@example.com",       amount: 99.00,  status: "failed",    date: "12 Jun 2025", method: "Amex" },
  { id: "PAY-006", email: "finn@example.com",      amount: 149.00, status: "refunded",  date: "14 Jun 2025", method: "Visa" },
  { id: "PAY-007", email: "grace@example.com",     amount: 249.00, status: "completed", date: "18 Jun 2025", method: "Mastercard" },
  { id: "PAY-008", email: "henry@example.com",     amount: 19.00,  status: "pending",   date: "21 Jun 2025", method: "PayPal" },
  { id: "PAY-009", email: "iris@example.com",      amount: 99.00,  status: "completed", date: "24 Jun 2025", method: "Visa" },
  { id: "PAY-010", email: "james@example.com",     amount: 499.00, status: "completed", date: "28 Jun 2025", method: "Mastercard" },
  { id: "PAY-011", email: "kate@example.com",      amount: 149.00, status: "failed",    date: "30 Jun 2025", method: "Amex" },
  { id: "PAY-012", email: "liam@example.com",      amount: 249.00, status: "completed", date: "1 Jul 2025",  method: "Visa" },
];

const statusVariant: Record<PaymentStatus, "success" | "warning" | "destructive" | "secondary"> = {
  completed: "success",
  pending:   "warning",
  failed:    "destructive",
  refunded:  "secondary",
};

const statusLabel: Record<PaymentStatus, string> = {
  completed: "Completed",
  pending:   "Pending",
  failed:    "Failed",
  refunded:  "Refunded",
};

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

const columns: ColumnDef<Payment>[] = [
  createSelectColumn<Payment>(),
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      return (
        <span className="tabular-nums text-right block">
          £{amount.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<PaymentStatus>("status");
      return (
        <Badge variant={statusVariant[status]}>
          {statusLabel[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
  },
];

// ---------------------------------------------------------------------------
// Demo wrapper (needs client state for column/filter/pagination)
// ---------------------------------------------------------------------------

function PaymentsTableDemo() {
  return (
    <div className="w-full max-w-4xl">
      <DataTable
        columns={columns}
        data={payments}
        filterColumn="email"
        filterPlaceholder="Filter by email…"
        pageSize={8}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const importLine =
  `import { DataTable, createSelectColumn } from "@/registry/layout/data-table/data-table";`;

export const demos: Demo[] = [
  {
    title: "Payments table",
    component: <PaymentsTableDemo />,
    code: `const columns: ColumnDef<Payment>[] = [
  createSelectColumn<Payment>(),
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      return <span className="tabular-nums">£{amount.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<PaymentStatus>("status");
      return (
        <Badge variant={statusVariant[status]}>
          {statusLabel[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
  },
];

<DataTable
  columns={columns}
  data={payments}
  filterColumn="email"
  filterPlaceholder="Filter by email…"
  pageSize={8}
/>`,
  },
];
