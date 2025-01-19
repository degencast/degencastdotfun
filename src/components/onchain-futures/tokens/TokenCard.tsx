"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TokenData } from "@/services/meme/types";
import { chainIcons } from "@/lib/onchain/chain-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function TokenCard({ token }: { token: TokenData }) {
  const priceChange = token?.priceChange?.h24 || 0;
  return (
    <Link href={`/trades/${token.chainName}/${token.tokenAddress}`}>
      <Card className="p-4 bg-white border-4 border-primary flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TokenIcon
              chainId={token.chainName}
              url={token.image!}
              tokenName={token.name}
            />
            <div className="h-full flex flex-col justify-between gap-2">
              <div className="font-bold text-2xl">{token.name}</div>
              <div className="text-base font-normal text-[#7E7E7E]">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                  notation: "compact",
                }).format(token?.marketCap || 0)}{" "}
                MC
              </div>
            </div>
          </div>
          <div className="h-full flex flex-col justify-between items-end gap-2">
            <div className="font-bold text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
              }).format(Number(token.priceUsd))}
              {` `}
            </div>
            <div
              className={cn(
                "text-base font-normal text-[#65D072]",
                priceChange < 0 && "text-[#EF4444]"
              )}
            >
              {priceChange > 0
                ? `+${priceChange.toFixed(2)}`
                : String(priceChange?.toFixed(2) || 0)}
              %
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ChainIcon({
  chainId,
  chainName,
  className,
}: {
  chainId?: string | number;
  chainName?: string;
  className?: string;
}) {
  const iconUrl = chainIcons[chainId || chainName || ""];
  return (
    <Avatar className={cn("size-6", className)}>
      <AvatarImage src={iconUrl} className="w-full h-full" />
      <AvatarFallback className="w-full h-full"></AvatarFallback>
    </Avatar>
  );
}

function TokenIcon({
  url,
  tokenName,
  chainId,
  chainName,
  className,
}: {
  url: string;
  tokenName?: string;
  chainId?: string | number;
  chainName?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative")}>
      <Avatar className={cn("size-16", className)}>
        <AvatarImage src={url} className="w-full h-full" />
        <AvatarFallback className="w-full h-full">
          {tokenName?.slice(0, 2)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {(chainId || chainName) && (
        <ChainIcon
          chainId={chainId}
          chainName={chainName}
          className="absolute bottom-0 right-0 size-6"
        />
      )}
    </div>
  );
}
