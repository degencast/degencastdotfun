"use client";

import { ReactNode, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TG_LINK } from "@/constants";
import BuyCastFloatingBtn from "@/components/BuyCastFloatingBtn";
import { UserPill } from "@privy-io/react-auth/ui";
import AboutDialogButton from "../About";

export function DefaultHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();
  return (
    <>
      {" "}
      <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-md:h-[64px]">
        <div className="w-full max-w-screen-2xl mx-auto h-full flex shrink-0 items-center px-6 gap-2 box-border max-md:px-3">
          {isHomePage ? (
            <div className="h-12 justify-start items-center gap-4 inline-flex hover:no-underline max-md:gap-2">
              <Link href="/">
                <div className="size-12 max-md:size-10 relative">
                  <Image
                    src="/onchain-futures/images/logo.png"
                    alt="logo"
                    fill
                  />
                </div>
              </Link>

              <div className="text-primary-foreground text-4xl font-bold max-md:text-2xl">
                DegenCast✨
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Button
                className="size-14 rounded-xl bg-primary-foreground hover:bg-primary-foreground max-md:size-11 p-0"
                onClick={() => {
                  router.push("/");
                }}
              >
                <Home className="stroke-primary hover:stroke-primary  !size-8" />
              </Button>
              <Button
                className="size-14 rounded-xl bg-primary-foreground hover:bg-primary-foreground max-md:size-11 p-0"
                onClick={() => {
                  router.back();
                }}
              >
                <ChevronLeft className="stroke-primary hover:stroke-primary  !size-8" />
              </Button>
            </div>
          )}
          <div
            className={cn(
              "flex items-center gap-4 z-20 ml-auto max-md:gap-2",
              !isHomePage && "max-md:hidden"
            )}
          >
            {" "}
            <AboutDialogButton />
            <Link href={TG_LINK} target="_blank" className="max-md:hidden">
              <Button className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6">
                <div className="w-6 h-6 relative">
                  <Image src="/images/telegram.png" alt="telegram" fill />
                </div>
                <span>Join Us</span>
              </Button>
            </Link>
            <UserPill size={60} label={logoImageElement} />
          </div>
        </div>
      </header>
    </>
  );
}
const logoImageElement = <User2 className="size-12 rounded-full" />;
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
