"use client";

import { ReactNode } from "react";
import BgGifs, { BgGifsMask } from "../layouts/BgGifs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NavMenu as LandingPageNavMenu } from "../landing-page/NavMenu";
import { cn } from "@/lib/utils";
import { divide } from "lodash";
import { HeaderRight as TradeHeaderRight } from "../onchain-futures/layout/LayoutComponents";
import { HeaderRight as LaunchHeaderRight } from "./ClientComponents";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background-attachment: local;
        }
      `}</style>
      <DefaultHeader />
      <DefaultMain>{children}</DefaultMain>
      <BgGifs className="max-md:mt-[64px]" />
      <BgGifsMask className="max-md:mt-[64px]" />
    </>
  );
}

function DefaultHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLaunchPage = pathname === "/launch";
  return (
    <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-md:h-[64px]">
      <div className="w-full max-w-screen-2xl mx-auto h-full flex shrink-0 items-center px-6 gap-12 box-border max-md:px-3">
        <div className="h-12 justify-start items-center gap-4 inline-flex hover:no-underline max-md:gap-2">
          {/* <img src="/images/logo.png" className="size-12 max-md:size-10" /> */}
          <Link href="/">
            <div className="size-12 max-md:size-10 relative">
              <Image src="/landing-page/images/logo.png" alt="logo" fill />
            </div>
          </Link>
          <Link href="/">
            <div className="text-primary-foreground text-4xl font-bold max-md:text-2xl">
              degencast.fun✨
            </div>
          </Link>
        </div>

        {isHomePage ? (
          <>
            <LandingPageNavMenu />
          </>
        ) : (
          <>
            <NavToggle />
            <div className="ml-auto">
              <TradeHeaderRight hideAbout={isLaunchPage} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export function DefaultMain({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        "w-screen  max-w-screen-2xl mx-auto box-border overflow-hidden mt-[80px] max-md:mt-[64px] p-6 max-md:p-4 relative",
        "min-h-[calc(100vh-80px)] max-md:min-h-[calc(100vh-64px)]"
      )}
    >
      {children}
    </main>
  );
}

export function NavToggle() {
  const pathname = usePathname();

  return (
    <div className="flex gap-12 text-4xl font-normal">
      <Link
        href="/trades"
        className={cn(
          "text-white/80 hover:text-white transition-colors",
          pathname === "/trades" && "text-white font-bold"
        )}
      >
        Trade
      </Link>
      <Link
        href="/launch"
        className={cn(
          "text-white/80 hover:text-white transition-colors",
          pathname === "/launch" && "text-white font-bold"
        )}
      >
        Launch
      </Link>
    </div>
  );
}
