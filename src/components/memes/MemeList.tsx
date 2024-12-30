"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useLoadMemes from "@/hooks/meme/useLoadMemes";
import { SortBy } from "@/services/meme/types";
import { useInView } from "react-cool-inview";
import { cn } from "@/lib/utils";
import useSearchTerms from "@/hooks/app/useSearchTerms";
import { MemeCard } from "./MemeCard";

export default function MemeList({
  sortBy,
  topicId,
  chainName,
}: {
  sortBy: SortBy;
  topicId?: number;
  chainName?: string;
}) {
  const { searchTerms } = useSearchTerms();
  const { items, loading, loadItems } = useLoadMemes({
    sortBy,
    topicId,
    query: searchTerms,
  });

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
  return (
    <div
      className={cn(
        "grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
      )}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={`${item.id}_${idx}`}
            ref={idx === items.length - 1 ? observe : null}
          >
            <MemeCard meme={item} />
          </div>
        );
      })}
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[184px] rounded-[20px]" />
          ))
        : null}
    </div>
  );
}
