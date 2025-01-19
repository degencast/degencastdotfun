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
import { Filter } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MemeData, SortBy, TokenData } from "@/services/meme/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortPubKey } from "@/lib/shortAddress";
import { useEffect, useState } from "react";
import useSearchTerms from "@/hooks/app/useSearchTerms";
import { useInView } from "react-cool-inview";
import dayjs from "dayjs";
import useLoadMemes from "@/hooks/meme/useLoadMemes";
import { useRouter } from "next/navigation";

function ArrowUpDownIcon({
  className,
  status,
}: {
  className?: string;
  status?: "up" | "down";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8 9L11.6464 5.35355C11.8417 5.15829 12.1583 5.15829 12.3536 5.35355L16 9"
        strokeWidth="2"
        strokeLinecap="round"
        className={status === "up" ? "stroke-primary" : "stroke-foreground"}
      />
      <path
        d="M8 15L11.6464 18.6464C11.8417 18.8417 12.1583 18.8417 12.3536 18.6464L16 15"
        strokeWidth="2"
        strokeLinecap="round"
        className={status === "down" ? "stroke-primary" : "stroke-foreground"}
      />
    </svg>
  );
}
const columns: ColumnDef<MemeData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button className="text-foreground flex flex-row gap-2 items-center">
          Token
          {/* <Filter className="ml-2 h-4 w-4" /> */}
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const baseToken = meme?.baseToken;
      const solToken = meme?.solToken;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-[50px] object-cover rounded-full">
            <AvatarImage
              src={meme?.image}
              className="hover:scale-105 transition-all"
            />
            <AvatarFallback className="w-full h-full object-cover rounded-lg">
              <span className="text-3xl font-bold text-secondary max-md:text-xl">
                {meme?.name[0].toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {meme?.name} ({meme?.symbol})
            </div>
            <div className="text-sm text-gray-500 flex flex-row items-center gap-5">
              <span>{shortPubKey(baseToken.tokenAddress)}</span>
              <span>{shortPubKey(solToken.tokenAddress)}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: SortBy.launchTime,
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
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
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
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
  // {
  //   accessorKey: "txns",
  //   header: ({ column }) => {
  //     return (
  //       <button
  //         className="text-foreground flex flex-row gap-2 items-center"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         TXs
  //         <ArrowUpDownIcon className="ml-2 h-4 w-4" />
  //       </button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const meme = row.original;
  //     const token = meme?.baseToken || meme?.solToken;
  //     return (
  //       <span>
  //         {" "}
  //         {new Intl.NumberFormat("en-US", {
  //           style: "currency",
  //           currency: "USD",
  //           maximumFractionDigits: 2,
  //           minimumFractionDigits: 0,
  //           notation: "compact",
  //         }).format(token?.marketCap || 0)}{" "}
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: "volume",
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vol
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.volume?.h24 || 0)}{" "}
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
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
      return (
        <span>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(Number(token?.priceUsd) || 0)}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: SortBy.priceChangeM1,
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1m
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
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
    accessorKey: SortBy.priceChangeM5,
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          5m
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
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
    accessorKey: SortBy.priceChangeH1,
    header: ({ column }) => {
      return (
        <button
          className="text-foreground flex flex-row gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1h
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },

    cell: ({ row }) => {
      const meme = row.original;
      const token = meme?.baseToken || meme?.solToken;
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
  const router = useRouter();
  const { searchTerms } = useSearchTerms();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { items, loadItems, loading } = useLoadMemes();

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
                  className="cursor-pointer"
                  onClick={() => {
                    const meme = row.original;
                    const baseToken = meme?.baseToken;
                    const solToken = meme?.solToken;
                    router.push(
                      `/memes/${
                        baseToken?.tokenAddress ||
                        solToken.tokenAddress ||
                        meme.id
                      }`
                    );
                  }}
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
