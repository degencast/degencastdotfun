"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Web3BioProfile } from "@/services/settings/types";
import CopyAddress from "@/components/CopyAddress";
import { FollowButton } from "../settings/FollowButton";
import { TokenData } from "@/services/meme/types";
import { chainIcons } from "@/lib/onchain/chain-icons";
import { TradeData2 } from "@/services/trade/types";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import MemeSwapDialogWithUniswap from "@/components/memes/MemeSwapDialogWithUniswap";
import { MemeSwapDialogWithJupiter } from "@/components/memes/MemeSwapDialogWithJupiter";

interface TradeCardProps {
  user: Web3BioProfile;
  following: boolean;
  tradeInfo: TradeData2;
}

export function TradeCard({ user, following, tradeInfo }: TradeCardProps) {
  const {
    token,
    txType,
    amount,
    priceUsd,
    swapToken,
    swapAmount,
    date,
    txHash,
  } = tradeInfo;
  return (
    <Card className="p-4 bg-white border-4 border-primary flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback className="bg-primary/60 text-primary-foreground">
              {user?.displayName?.slice(0, 2)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user.displayName}</span>
            <CopyAddress address={user.address} size="small" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-normal text-[#7E7E7E]">
            {dayjs(Number(date)).fromNow()}
          </span>
          <FollowButton address={user.address} following={following} />
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <ChainIcon chainId={token.chainName} />
        <span
          className={cn(
            "text-3xl font-bold",
            txType === "buy" ? "text-[#4CDD32]" : "text-[#FF0000]"
          )}
        >
          {txType === "buy" ? "Bought" : "Sold"}
        </span>
        <div className="border-2 border-primary rounded-2xl h-[72px] px-4 py-2 flex flex-row items-center gap-[136px]">
          <Link
            href={`/trades/${token.chainName}/${token.tokenAddress}`}
            className="flex flex-row items-center gap-1"
          >
            <TokenIcon url={token.image!} className="size-8" />
            {"  "}
            <span className="text-3xl font-bold">{token.symbol}</span>
          </Link>
          <div className="flex flex-col items-end leading-normal">
            <span
              className={cn(
                "text-2xl font-bold",
                txType === "buy" ? "text-[#4CDD32]" : "text-[#FF0000]"
              )}
            >
              {txType === "buy" ? `+` : `-`}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(Number(amount))}
              {"  "}
              {token.symbol}
            </span>
            <span className="text-[#7E7E7E]">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(priceUsd) * amount)}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 text-xl font-bold">
          <span>with</span>
          <div className="flex flex-row items-center gap-1">
            <TokenIcon url={swapToken.image!} />
            {"  "}
            <span>{swapToken.name}</span>
          </div>
          <span>
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(Number(swapAmount))}
            {"  "}
            {swapToken.symbol}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-3xl font-bold">
          at{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(priceUsd))}
          /{token.symbol}
        </span>
        <div className="flex flex-row gap-2 items-center">
          <Link href={`/trades/${token.chainName}/${token.tokenAddress}`}>
            <Button
              size="sm"
              className="rounded-full bg-black hover:bg-black/90 h-[30px]"
            >
              <TokenIcon
                chainId={token.chainName}
                url={token.image!}
                className="size-5"
              />
              <span className="font-bold">{token.name}</span>
            </Button>
          </Link>
          {token.chainName === "solana" ? (
            <MemeSwapDialogWithJupiter
              token={{
                address: token?.tokenAddress || "",
              }}
              className="rounded-full h-[30px]  px-3 py-1"
              btnContent={<span className="font-bold">Copy Trade</span>}
            />
          ) : (
            <MemeSwapDialogWithUniswap
              token={token}
              className="rounded-full h-[30px]  px-3 py-1"
              btnContent={<span className="font-bold">Copy Trade</span>}
            />
          )}
        </div>
      </div>
    </Card>
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
  chainId,
  chainName,
  className,
}: {
  url: string;
  chainId?: string | number;
  chainName?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative")}>
      <Avatar className={cn("size-6", className)}>
        <AvatarImage src={url} className="w-full h-full" />
        <AvatarFallback className="w-full h-full"></AvatarFallback>
      </Avatar>
      {(chainId || chainName) && (
        <ChainIcon
          chainId={chainId}
          chainName={chainName}
          className="absolute bottom-0 right-0 size-[8px]"
        />
      )}
    </div>
  );
}
