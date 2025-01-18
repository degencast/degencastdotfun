import useLoadTrendingTrades from "@/hooks/onchain-futures/trades/useLoadTrendingTrades";
import TradeList from "./TradeList";
import { TradeData2 } from "@/services/trade/types";
import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";

export default function TrendingTrades({
  tokenAddress,
}: {
  tokenAddress?: string;
}) {
  const { items, loadItems, loading } = useLoadTrendingTrades({
    tokenAddress,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    loadItems();
  }, [mounted]);

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
    <div>
      <TradeList items={items} />

      <div ref={observe} className="h-10 flex items-center justify-center">
        {loading && (
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
        )}
      </div>
    </div>
  );
}
