"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/layout/button/button";
import { Checkbox } from "@/registry/layout/checkbox/checkbox";
import { Input } from "@/registry/layout/input/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/layout/table/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Column id to use for the filter input. Defaults to the first string column. */
  filterColumn?: string;
  /** Placeholder text for the filter input. */
  filterPlaceholder?: string;
  /** Number of rows per page. Defaults to 10. */
  pageSize?: number;
}

function SortIcon({
  direction,
}: {
  direction: "asc" | "desc" | false;
}) {
  if (direction === "asc") return <ChevronUp className="size-3.5" />;
  if (direction === "desc") return <ChevronDown className="size-3.5" />;
  return <ChevronsUpDown className="size-3.5 text-muted-foreground/60" />;
}

function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter…",
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Resolve the filter column: use explicit prop or fall back to first column id
  const resolvedFilterColumn = React.useMemo(() => {
    if (filterColumn) return filterColumn;
    const first = columns[0];
    if (!first) return undefined;
    return typeof first === "object" && "accessorKey" in first
      ? String((first as { accessorKey: string }).accessorKey)
      : typeof first === "object" && "id" in first
        ? String((first as { id: string }).id)
        : undefined;
  }, [filterColumn, columns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize } },
    state: { sorting, columnFilters, rowSelection },
  });

  const selectedCount = Object.keys(rowSelection).length;
  const filterValue = resolvedFilterColumn
    ? (table.getColumn(resolvedFilterColumn)?.getFilterValue() as string) ?? ""
    : "";

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        {resolvedFilterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={filterValue}
            onChange={(e) =>
              table
                .getColumn(resolvedFilterColumn)
                ?.setFilterValue(e.target.value)
            }
            className="max-w-xs"
            aria-label="Filter rows"
          />
        )}
        {selectedCount > 0 && (
          <p className="text-sm text-muted-foreground ml-auto shrink-0">
            {selectedCount} of {table.getFilteredRowModel().rows.length} selected
          </p>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "inline-flex items-center gap-1 cursor-pointer select-none",
                            "transition-colors duration-[var(--layout-duration-base)] ease-out",
                            "hover:text-foreground",
                            sorted && "text-foreground"
                          )}
                          aria-label={`Sort by ${header.column.id}`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <SortIcon direction={sorted} />
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Convenience column helper: a select-all / select-row checkbox column. */
function createSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          !table.getIsAllPageRowsSelected() &&
          table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 40,
  };
}

export { DataTable, createSelectColumn, type DataTableProps };
