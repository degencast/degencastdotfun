"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { TokenData } from "@/services/meme/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortPubKey } from "@/lib/shortAddress";
import useLoadTokens from "@/hooks/token/useLoadTokens";
import { useEffect, useState } from "react";
import useSearchTerms from "@/hooks/app/useSearchTerms";
import { useInView } from "react-cool-inview";
import dayjs from "dayjs";

const columns: ColumnDef<TokenData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button className="text-foreground flex flex-row gap-2 items-center">
          Token
          <Filter className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-[50px] object-cover rounded-full">
            <AvatarImage
              src={meme?.image}
              className="hover:scale-105 transition-all"
            />
            <AvatarFallback className="w-full h-full object-cover rounded-lg">
              <span className="text-3xl font-bold text-secondary max-md:text-xl">
                {token?.name[0].toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {token?.name} ({token?.symbol})
            </div>
            <div className="text-sm text-gray-500">
              {shortPubKey(token.tokenAddress)}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return <span>{dayjs(meme?.createdAt).fromNow()}</span>;
    },
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          MC
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.marketCap || 0)}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TXs
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.marketCap || 0)}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.marketCap || 0)}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.marketCap || 0)}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "change1m",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1m
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      const priceChange = token?.priceChange?.m1 || 0;
      return (
        <div className={priceChange > 0 ? "text-green-500" : "text-red-500"}>
          {priceChange > 0 ? "+" : ""}
          {priceChange}%
        </div>
      );
    },
  },
  {
    accessorKey: "change5m",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          5m
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      const priceChange = token?.priceChange?.m5 || 0;
      return (
        <div className={priceChange > 0 ? "text-green-500" : "text-red-500"}>
          {priceChange > 0 ? "+" : ""}
          {priceChange}%
        </div>
      );
    },
  },
  {
    accessorKey: "change1h",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1h
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },

    cell: ({ row }) => {
      const token = row.original;
      const meme = token?.memeData;
      const priceChange = token?.priceChange?.h1 || 0;
      return (
        <div className={priceChange > 0 ? "text-green-500" : "text-red-500"}>
          {priceChange > 0 ? "+" : ""}
          {priceChange}%
        </div>
      );
    },
  },
];

export default function TokensTable() {
  const { searchTerms } = useSearchTerms();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { items, loadItems, loading } = useLoadTokens();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // useEffect(() => {
  //   if (!mounted) return;
  //   loadItems();
  // }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    loadItems(true);
  }, [mounted, searchTerms]);

  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      // Pause observe when loading data
      unobserve();
      // Load more data
      loadItems();
    },
  });

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border-2 border-primary bg-primary-foreground text-foreground">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div ref={observe} className="h-10 flex items-center justify-center">
        {loading && (
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
        )}
      </div>
    </div>
  );
}
