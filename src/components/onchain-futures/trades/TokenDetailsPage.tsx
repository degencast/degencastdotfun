"use client";

import MemeSwap from "@/components/memes/MemeSwap";
import { Card, CardContent } from "@/components/ui/card";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { useEffect, useState } from "react";
import FollowingTradesWithToken from "./FollowingTradesWithToken";

export default function TokenDetailsPage({
  chain,
  addr,
}: {
  chain: string;
  addr: string;
}) {
  const iframeUrl = `https://dexscreener.com/${chain}/${addr}?embed=1&theme=dark&info=1`;

  return (
    <div className="w-full">
      <Card className="w-full max-md:rounded-none">
        <CardContent className="w-full p-0">
          <div className="w-full aspect-[1/0.5]">
            <iframe className="w-full h-full" src={iframeUrl} />
          </div>
        </CardContent>
      </Card>
      <div className="w-full mt-4">
        <FollowingTradesWithToken chainName={chain} tokenAddress={addr} />
      </div>
    </div>
  );
}
