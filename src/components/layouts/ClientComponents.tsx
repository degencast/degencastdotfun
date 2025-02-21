"use client";

import { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import AboutDialogButton from "../About";
import { Button } from "../ui/button";
import { ChevronLeft, Home, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CAST_TOKEN_ADDRESS } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { LaunchTokenButton } from "../memes/create/LaunchTokenButton";
import { SharePageButton } from "../Share";
import { UserPill } from "@privy-io/react-auth/ui";
import Search from "../Search";

export function DefaultHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();
  return (
    <>
      {" "}
      <header className="w-screen h-[80px]  fixed top-0 left-0 bg-primary z-10 max-md:h-[70px]">
        <div className="w-ful mx-auto h-full flex shrink-0 items-center px-6 gap-2 box-border max-md:px-3">
          {isHomePage ? (
            <Link
              className="h-12 justify-start items-center gap-4 inline-flex hover:no-underline"
              href="https://degencast.fun"
              target="_blank"
            >
              <div className="size-12 max-md:size-10 relative">
                <Image src="/images/logo.png" alt="logo" fill />
              </div>

              <span className="text-primary-foreground text-4xl font-bold max-md:hidden">
                degencast.fun✨
              </span>
            </Link>
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
            <div className="min-w-[340px] max-md:hidden">
              <Search />
            </div>
            <AboutDialogButton />
            <div className="max-md:hidden">
              <LaunchTokenButton />
            </div>
            <UserPill size={60} label={logoImageElement} />
          </div>
          {!isHomePage && (
            <div className="ml-auto hidden max-md:block">
              <SharePageButton />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
const logoImageElement = <User2 className="size-12 rounded-full" />;
export function DefaultMain({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isMemeDetails = pathname.includes("/memes/");
  return (
    <main
      className={cn(
        "w-screen mx-auto box-border overflow-hidden p-6 max-md:p-3 relative",
        "min-h-screen mt-[80px] max-md:mt-[70px]",
        isMemeDetails && "max-md:p-0"
      )}
    >
      {children}
    </main>
  );
}
