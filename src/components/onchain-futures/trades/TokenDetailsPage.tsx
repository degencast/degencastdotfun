"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import FollowingTrades from "./FollowingTrades";
import TrendingTrades from "./TrendingTrades";
import { ButtonToggle2 } from "@/components/ui/button-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

enum DataOrigin {
  Following = "following",
  Trending = "trending",
}

const DataOriginOptions = [
  { label: "👀 Following", value: DataOrigin.Following },
  { label: "🔥 Trending Trades", value: DataOrigin.Trending },
];
export default function TokenDetailsPage({
  chain,
  addr,
}: {
  chain: string;
  addr: string;
}) {
  const [dataOrigin, setDataOrigin] = useState(DataOrigin.Following);
  const iframeUrl = `https://dexscreener.com/${chain}/${addr}?embed=1&theme=dark&info=1`;

  return (
    <div className="w-full">
      <Card className="w-full max-md:rounded-none">
        <CardContent className="w-full p-0">
          <div className="w-full h-[760px]">
            <iframe className="w-full h-full" src={iframeUrl} />
          </div>
        </CardContent>
      </Card>
      <div className="w-full mt-4">
        <div className="w-full">
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
                <FollowingTrades tokenAddress={addr} />
              ) : (
                <TrendingTrades tokenAddress={addr} />
              )}
            </div>
          </div>
          <div className="w-[430px]"></div>
        </div>
      </div>
    </div>
  );
}
