"use client";

import { ReactNode, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TG_LINK } from "@/constants/landing-page";
import { ConnectButton } from "@/components/ConnectButton";
import BuyCastFloatingBtn from "@/components/BuyCastFloatingBtn";

export function DefaultHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <>
      {" "}
      <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-md:h-[64px]">
        <div className="w-full max-w-screen-2xl mx-auto h-full flex shrink-0 items-center px-6 gap-2 box-border max-md:px-3">
          {isHomePage ? (
            <div className="h-12 justify-start items-center gap-4 inline-flex hover:no-underline max-md:gap-2">
              {/* <img src="/images/logo.png" className="size-12 max-md:size-10" /> */}
              <Link href="/">
                <div className="size-12 max-md:size-10 relative">
                  <Image src="/landing-page/images/logo.png" alt="logo" fill />
                </div>
              </Link>

              <div className="text-primary-foreground text-4xl font-bold max-md:text-2xl">
                DegenCast✨
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Link href="/">
                <Button className="size-14 rounded-xl bg-primary-foreground hover:bg-primary-foreground max-md:size-[46px] p-0">
                  <ChevronLeft className="stroke-primary hover:stroke-primary  !size-8" />
                </Button>
              </Link>
            </div>
          )}
          <div
            className={cn(
              "flex items-center gap-4 z-20 ml-auto max-md:gap-2",
              !isHomePage && "max-md:hidden"
            )}
          >
            {" "}
            <Link href={TG_LINK} target="_blank" className="max-md:hidden">
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
            </Link>
            <div>
              <div className="max-md:hidden">
                <ConnectButton
                  showBalance={false}
                  chainStatus={"none"}
                  label="Connect"
                />
              </div>

              <div className="hidden max-md:block">
                <ConnectButton
                  showBalance={false}
                  chainStatus={"none"}
                  accountStatus={"avatar"}
                  label="Connect"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export function DefaultMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSettingsPage = pathname === "/settings";
  return (
    <main
      className={cn(
        "w-screen  max-w-screen-2xl mx-auto box-border overflow-hidden mt-[80px] max-md:mt-[64px] p-6 max-md:p-4 relative",
        "min-h-[calc(100vh-80px)] max-md:min-h-[calc(100vh-64px)]"
      )}
    >
      {children}
      {!isSettingsPage && <BuyCastFloatingBtn />}
    </main>
  );
}
