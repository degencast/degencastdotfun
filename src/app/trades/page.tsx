"use client";

import * as React from "react";
import { ButtonToggle2 } from "@/components/ui/button-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import FollowingTrades from "@/components/onchain-futures/trades/FollowingTrades";
import TrendingTrades from "@/components/onchain-futures/trades/TrendingTrades";
import HotTokens from "@/components/onchain-futures/tokens/HotTokens";

enum DataOrigin {
  Following = "following",
  Trending = "trending",
}

const DataOriginOptions = [
  { label: "👀 Following", value: DataOrigin.Following },
  { label: "🔥 Trending Trades", value: DataOrigin.Trending },
];

export default function TradesPage() {
  const [dataOrigin, setDataOrigin] = React.useState(DataOrigin.Following);

  return (
    <div className="w-full flex flex-row gap-6">
      <div className="flex-1">
        <div className="w-full flex flex-row justify-between items-center">
          <ButtonToggle2
            value={dataOrigin}
            options={DataOriginOptions}
            onChange={(v) => {
              setDataOrigin(v);
            }}
          />
          <Link href="/settings">
            <Button className="size-12 bg-white hover:bg-white rounded-xl border-4 border-primary p-0">
              <Settings className=" stroke-primary" />
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          {dataOrigin === DataOrigin.Following ? (
            <FollowingTrades />
          ) : (
            <TrendingTrades />
          )}
        </div>
      </div>
      <div className="w-[430px]">
        <div className="w-fit rounded-xl bg-tertiary border-4 border-primary flex justify-center items-center h-[52px] px-3  mb-6">
          <span className="text-2xl font-bold text-primary">
            🔥 What’s Popular
          </span>
        </div>
        <HotTokens />
      </div>
    </div>
  );
}
