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
import MemeCast from "./details/MemeCast";

export function MemeMiniCard({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const baseToken = meme.baseToken;
  const solToken = meme.solToken;
  const castHash = meme?.castHash;
  return (
    <Card className="w-full h-fit overflow-hidden max-md:rounded-none">
      <CardContent className="w-full overflow-hidden p-2 bg-white">
        <MemeInfo meme={meme} />
        {!castHash && <div className="">{meme.description}</div>}
        {(!!baseToken || !!solToken) && (
          <Separator className="h-1 w-full bg-primary my-3" />
        )}

        <div className="flex flex-row gap-3">
          <PlatformInfo meme={meme} />
          {(!!baseToken || !!solToken) && (
            <Separator className="h-auto w-1 bg-primary" />
          )}
          {baseToken && (
            <MemeInfoOnChain
              token={baseToken}
              chainName={DEFAULT_CHAIN.name}
              scanName={DEFAULT_CHAIN.blockExplorers.default.name}
              scanIconUrl={`${DEFAULT_CHAIN.blockExplorers.default.url}/favicon.ico`}
              scanUrl={getScanUrl(DEFAULT_CHAIN.id, baseToken?.tokenAddress)}
              dexUrl={getDexTokenUrl(
                DEFAULT_CHAIN.id,
                baseToken?.tokenAddress!
              )}
              gmgnUrl={getGmgnTokenUrl(
                DEFAULT_CHAIN.id,
                baseToken?.tokenAddress!
              )}
            />
          )}

          {baseToken && solToken && (
            <Separator className="h-auto w-1 bg-primary" />
          )}

          {solToken && (
            <MemeInfoOnChain
              token={solToken}
              chainName={"Solana"}
              scanName={"Solscan"}
              scanIconUrl={solscanIconUrl}
              scanUrl={getScanUrl("sol", solToken?.tokenAddress)}
              dexUrl={getDexTokenUrl("sol", solToken?.tokenAddress!)}
              gmgnUrl={getGmgnTokenUrl("sol", solToken?.tokenAddress!)}
            />
          )}
          <div className="ml-auto">
            <MemeShareButton
              meme={meme}
              size={"sm"}
              className=" rounded-full py-1 px-2"
            />
          </div>
        </div>
        {(!!baseToken || !!solToken) && castHash && (
          <Separator className="h-1 w-full bg-primary my-3" />
        )}
        {castHash && <MemeCast hash={castHash} />}
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
          <div className="font-bold text-primary  max-md:text-xs">
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
          <div className="font-bold text-primary max-md:text-xs">
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
          <div className="font-bold text-primary  max-md:text-xs">Address</div>
          {baseToken?.tokenAddress && (
            <CopyAddress address={baseToken.tokenAddress} len={3} />
          )}
          {solToken?.tokenAddress && (
            <CopyAddress address={solToken.tokenAddress} len={3} />
          )}
        </div>
      </div>
    </div>
  );
}

function PlatformInfo({ meme }: { meme: MemeData }) {
  const platform = meme.platform || DeployPlatform.Degencast;
  const platforms = {
    [DeployPlatform.Degencast]: {
      name: "DegenCast",
      icon: "/images/logo.png",
    },
    [DeployPlatform.Clanker]: {
      name: "Clanker",
      icon: "/images/clanker.png",
    },
    [DeployPlatform.Virtuals]: {
      name: "Virtuals",
      icon: "",
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
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : ""}
      title={label}
    >
      {icon ? (
        icon
      ) : iconUrl ? (
        <Avatar className="size-6">
          <AvatarImage src={iconUrl} className="w-full h-full" />
          <AvatarFallback className="w-full h-full"></AvatarFallback>
        </Avatar>
      ) : null}
    </Link>
  );
}
