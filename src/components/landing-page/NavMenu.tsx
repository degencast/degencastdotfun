"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import AudioBtn from "./AudioBtn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  PARAGRAPH_LINK,
  TG_LINK,
  WARPCAST_LINK,
  X_LINK,
} from "@/constants/landing-page";
import { PositionLink } from "../PositionLink";
import useFrameSdk from "@/hooks/frame-sdk/useFrameSdk";
import OpenLink2 from "../OpenLink2";

export function NavMenu() {
  const { sdk, isSDKLoaded, context } = useFrameSdk();
  return (
    <div className="flex items-center gap-4 z-20 ml-auto max-md:gap-2">
      {/* <PositionLink href="#rules" className="max-md:hidden">
        <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
          Rules
        </Button>
      </PositionLink> */}

      {/* <PositionLink href="#tokenomics" className="max-md:hidden">
        <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
          Tokenomics
        </Button>
      </PositionLink> */}

      <PositionLink href="#roadmap" className="max-md:hidden">
        <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
          Roadmap
        </Button>
      </PositionLink>

      <Link href="/buy" className="max-md:hidden">
        <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
          <div>Buy $CAST</div>
        </Button>
      </Link>

      <OpenLink2
        frameSdk={sdk}
        frameCtx={context}
        href={TG_LINK}
        className="max-md:hidden"
      >
        <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
          <div className="w-6 h-6 relative">
            <Image
              src="/landing-page/images/telegram.png"
              alt="telegram"
              fill
            />
          </div>
          <span>Join Us</span>
        </Button>
      </OpenLink2>

      <AudioBtn className="max-md:w-[40px] max-md:h-[40px]" />
      <NavMenuMobile className="hidden max-md:block" />
    </div>
  );
}

export function NavMenuMobile({ className }: { className?: string }) {
  const { sdk, isSDKLoaded, context } = useFrameSdk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "p-0 m-0 w-[40px] h-[40px] bg-white hover:bg-white rounded-full",
            className
          )}
        >
          <NavMenuMobileIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary border-none p-2">
        <div className=" flex flex-col gap-2 overflow-hidden rounded-sm">
          {/* <DropdownMenuItem className="p-4 bg-white rounded-none text-xl font-normal justify-center">
            <PositionLink href="#rules">Rules</PositionLink>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem className="p-4 bg-white rounded-none text-xl font-normal justify-center">
            <PositionLink href="#tokenomics">Tokenomics</PositionLink>
          </DropdownMenuItem> */}
          <DropdownMenuItem className="p-4 bg-white rounded-none text-xl font-normal justify-center">
            <PositionLink href="#roadmap">Roadmap</PositionLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 bg-white rounded-none text-xl font-normal justify-center">
            <Link href="/buy">Buy $CAST</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="bg-white rounded-none text-xl font-normal">
            <OpenLink2
              frameSdk={sdk}
              frameCtx={context}
              className="justify-start items-center gap-2 flex w-full p-4"
              href={TG_LINK}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/landing-page/images/telegram.png"
                  alt="telegram"
                  fill
                />
              </div>
              <span className="text-xl font-normal">Telegram</span>
            </OpenLink2>
          </DropdownMenuItem>
          <DropdownMenuItem className=" bg-white rounded-none text-xl font-normal">
            <OpenLink2
              frameSdk={sdk}
              frameCtx={context}
              className="justify-start items-center gap-2 flex w-full p-4"
              href={X_LINK}
            >
              <div className="w-6 h-6 relative rounded-[10px] overflow-hidden">
                <Image src="/images/x.png" alt="x" fill />
              </div>
              <span className="text-xl font-normal">X</span>
            </OpenLink2>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-white rounded-none text-xl font-normal">
            <OpenLink2
              frameSdk={sdk}
              frameCtx={context}
              className="justify-start items-center gap-2 flex w-full p-4"
              href={WARPCAST_LINK}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/landing-page/images/warpcast.png"
                  alt="warpcast"
                  fill
                />
              </div>
              <span className="text-xl font-normal">Warpcast</span>
            </OpenLink2>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-white rounded-none text-xl font-normal">
            <OpenLink2
              frameSdk={sdk}
              frameCtx={context}
              className="justify-start items-center gap-2 flex w-full p-4"
              href={PARAGRAPH_LINK}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/landing-page/images/logo.png"
                  alt="paragraph"
                  fill
                />
              </div>
              <span className="text-xl font-normal">Paragraph</span>
            </OpenLink2>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavMenuMobileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="20" fill="white" />
      <path
        d="M25.8235 17.1765H9M31 12H9M31 22.3529H9M25.8235 27.5294H9"
        stroke="#FF1393"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
