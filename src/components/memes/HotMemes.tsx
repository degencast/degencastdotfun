"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChainType, SortBy } from "@/services/meme/types";
import { cn } from "@/lib/utils";
import useSearchTerms from "@/hooks/app/useSearchTerms";
import { MemeCard } from "./MemeCard";
import useHotMemes from "@/hooks/meme/useHotMemes";
import { motion } from "motion/react";

export default function HotMemes({ chain }: { chain?: ChainType }) {
  const { searchTerms } = useSearchTerms();
  const { items, loading, loadItems } = useHotMemes({
    query: searchTerms,
    chain,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    loadItems(true);
  }, [mounted, searchTerms]);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      loadItems();
    }, 1000 * 15);

    return () => clearInterval(interval);
  }, [mounted]);
  return (
    <div
      className={cn(
        "grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
      )}
    >
      {items[0] && (
        <motion.div
          key={items[0].id}
          animate={{ rotate: [-5, 5, -5, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.4 }}
        >
          <MemeCard meme={items[0]} />
        </motion.div>
      )}
      {items.slice(1).map((item, i) => (
        <MemeCard key={i} meme={item} />
      ))}
      {items.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[184px] rounded-[20px]" />
          ))
        : null}
    </div>
  );
}
