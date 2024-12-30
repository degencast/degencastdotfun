import { cn } from "@/lib/utils";
import { DeployPlatform, MemeData, TokenData } from "@/services/meme/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { shortPubKey } from "@/lib/shortAddress";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import {
  dexscreenerIconUrl,
  getScanUrl,
  getDexTokenUrl,
  getGmgnTokenUrl,
  gmgnIconUrl,
  solscanIconUrl,
} from "@/lib/onchain";
import MemeShareButton from "./details/MemeShareButton";
import { Separator } from "../ui/separator";
import CopyAddress from "../CopyAddress";
import MemeSwapDialogWithUniswap from "./MemeSwapDialogWithUniswap";
import { MemeSwapDialogWithJupiter } from "./MemeSwapDialogWithJupiter";
import { DEFAULT_CHAIN } from "@/constants/chain";
import { CAST_TOKEN_ADDRESS } from "@/constants";

export function MemeCard({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const baseToken = meme.baseToken;
  const solToken = meme.solToken;
  return (
    <Card className="w-full h-fit overflow-hidden">
      <CardContent className="w-full overflow-hidden p-2 bg-white">
        <Link
          className={cn("w-full", className)}
          href={`/memes/${
            baseToken?.tokenAddress || solToken?.tokenAddress || meme.id
          }`}
        >
          <MemeInfo meme={meme} />
        </Link>
        <div className="flex flex-row justify-between items-center mt-2">
          <PlatformInfo meme={meme} />

          <div className="flex flex-row items-center gap-2">
            {baseToken && <MemeSwapDialogWithUniswap token={baseToken} />}
            {solToken && (
              <MemeSwapDialogWithJupiter
                token={{
                  address: solToken?.tokenAddress || "",
                }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemeInfo({ meme }: { meme: MemeData }) {
  const baseToken = meme.baseToken;
  const solToken = meme.solToken;
  const totalMarketCap =
    Number(baseToken?.marketCap || 0) + Number(solToken?.marketCap || 0);
  const deployerAddress = meme.deployerEVMAddress || meme.deployerSolanaAddress;
  return (
    <div className="flex flex-row gap-2 ">
      {" "}
      <div className="h-[128px] aspect-square max-md:h-[100px]">
        <Avatar className="w-full h-full object-cover rounded-lg">
          <AvatarImage
            src={meme.image}
            className="hover:scale-105 transition-all"
          />
          <AvatarFallback className="w-full h-full object-cover rounded-lg">
            <span className="text-3xl font-bold text-secondary max-md:text-xl">
              {meme.name[0].toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-primary text-2xl font-bold line-clamp-1 max-md:text-base">
          {meme.name} (${meme.symbol})
        </span>

        <div className="flex items-center gap-3">
          <div className="font-bold text-secondary  max-md:text-xs">
            Created By
          </div>
          {baseToken.tokenAddress === CAST_TOKEN_ADDRESS ? (
            <Link
              className="flex items-center gap-1"
              href="https://degencast.ai"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
            >
              <span className="text-xs font-bold">degencast.ai</span>
              <div className="text-xs">{dayjs(meme.createdAt).fromNow()}</div>
            </Link>
          ) : (
            deployerAddress && (
              <Link
                className="flex items-center gap-1"
                href={`/u/${deployerAddress}`}
                onClick={(e) => e.stopPropagation()}
              >
                <DefaultUserAvatar
                  address={deployerAddress}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs">{shortPubKey(deployerAddress)}</span>
                <div className="text-xs">{dayjs(meme.createdAt).fromNow()}</div>
              </Link>
            )
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="font-bold text-secondary max-md:text-xs">
            Total Market Cap
          </div>
          <div className="text-xs">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(totalMarketCap)}{" "}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-bold text-secondary  max-md:text-xs">
            Address
          </div>
          {baseToken?.tokenAddress && (
            <CopyAddress address={baseToken.tokenAddress} />
          )}
          {solToken?.tokenAddress && (
            <CopyAddress address={solToken.tokenAddress} />
          )}
        </div>
      </div>
    </div>
  );
}

function PlatformInfo({ meme }: { meme: MemeData }) {
  const platform = meme.platform || DeployPlatform.DEGENCAST;
  const platforms = {
    [DeployPlatform.DEGENCAST]: {
      name: "DegenCast",
      icon: "/images/logo.png",
    },
    [DeployPlatform.CLANKER]: {
      name: "Clanker",
      icon: "/images/clanker.png",
    },
  };
  const platformInfo = platforms[platform];
  return (
    <div className="flex flex-row items-center gap-1">
      <img
        src={platformInfo.icon}
        alt={platformInfo.name}
        className="w-6 h-6"
      />
      <span className="text-xl font-bold text-primary">
        {platformInfo.name}
      </span>
    </div>
  );
}

function MemeInfoOnChain({
  token,
  scanName,
  scanUrl,
  scanIconUrl,
  dexUrl,
  gmgnUrl,
  chainName,
  swapButton,
}: {
  token: TokenData;
  scanName: string;
  scanUrl: string;
  scanIconUrl: string;
  dexUrl: string;
  gmgnUrl: string;
  chainName: string;
  swapButton?: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3 max-md:gap-2">
        <div className="font-bold text-secondary max-md:text-xs">
          {chainName} Market Cap
        </div>
        <div className="text-xs">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(token?.marketCap || 0)}{" "}
        </div>
      </div>

      <div className="flex items-center gap-3 max-md:gap-2">
        <div className="font-bold text-secondary max-md:text-xs">
          {chainName} Address
        </div>
        {/* <span className="text-xs">{shortPubKey(token?.tokenAddress)}</span> */}
        <CopyAddress address={token?.tokenAddress} size="small" />
      </div>

      <div className="flex items-center gap-2 max-md:gap-1">
        <MemeLinkButton label={scanName} href={scanUrl} iconUrl={scanIconUrl} />
        <MemeLinkButton
          label={"Dexscreener"}
          href={dexUrl}
          iconUrl={dexscreenerIconUrl}
        />
        <MemeLinkButton label={"GMGN"} href={gmgnUrl} iconUrl={gmgnIconUrl} />
        {swapButton}
      </div>
    </div>
  );
}

function MemeLinkButton({
  label,
  href,
  iconUrl,
  icon,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link href={href} target={href.startsWith("http") ? "_blank" : ""}>
      <Button
        variant={"secondary"}
        className="flex flex-row gap-1 items-center px-3 py-1 max-md:px-1"
        onClick={(e) => e.stopPropagation()}
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="size-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1 max-md:text-xs">{label}</span>
      </Button>
    </Link>
  );
}
