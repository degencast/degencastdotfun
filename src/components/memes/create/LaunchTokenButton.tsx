"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateMemeFormWithApi } from "./CreateMemeFormWithApi";
import Image from "next/image";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import { getBotText } from "./CreateMemeWithBot";
import { CAST_TOKEN_ADDRESS } from "@/constants";
import { toast } from "@/hooks/use-toast";

export function LaunchTokenButton() {
  const { openConnectModal } = useConnectModal();
  const [open, setOpen] = useState(false);
  const [openLaunchDailog, setOpenLaunchDailog] = useState(false);
  return (
    <>
      <Button
        className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6"
        onClick={() => {
          if (openConnectModal) {
            openConnectModal();
          } else {
            setOpen(true);
          }
        }}
      >
        Token Launch
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[816px] gap-8 max-md:h-screen max-md:max-h-full max-h-[90%] flex flex-col">
          <DialogHeader>
            <DialogTitle>Token Launch</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="w-full flex flex-col justify-start items-center gap-6">
              <span className="text-2xl font-normal max-md:text-base self-start">
                Launch, Grow, Cross-Chain.! 🎉
              </span>
              <span className="text-2xl font-normal max-md:text-base self-start">
                Launch your token on <b>Base</b> and <b>Solana</b> at the same
                time with <b>DegenCast</b>. When the market cap hits <b>$1</b>{" "}
                million, cross-chain trading is enabled automatically.
              </span>
              <div className="w-full">
                {" "}
                <p className="text-2xl font-bold text-secondary self-start mb-4">
                  Holder Requirement:
                </p>
                <HolderRequirement />
              </div>
              <div className="w-full">
                <p className="text-2xl font-bold text-secondary self-start mb-4">
                  Launch From:
                </p>
                <div className="w-full shrink-0 justify-center items-start flex sm:gap-12 max-md:justify-evenly">
                  <LaunchItem
                    icon="/images/logo.png"
                    name="DegenCast"
                    onClick={() => {
                      setOpen(false);
                      setOpenLaunchDailog(true);
                    }}
                  />
                  <LaunchItem
                    icon="/images/warpcast.png"
                    name="Warpcast"
                    onClick={() => {
                      window.open(
                        getCreateCastWebUrl([], "", getBotText()),
                        "_blank"
                      );
                    }}
                  />
                  <LaunchItem
                    icon="/images/clanker.png"
                    name="Clanker"
                    onClick={() => {
                      window.open(
                        getCreateCastWebUrl(
                          [],
                          "",
                          getBotText({ botName: "clanker" })
                        ),
                        "_blank"
                      );
                    }}
                  />
                  <LaunchItem
                    icon="/images/larry.png"
                    name="Larry"
                    onClick={() => {
                      window.open(
                        getCreateCastWebUrl(
                          [],
                          "",
                          getBotText({ botName: "larrybot" })
                        ),
                        "_blank"
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <LaunchTokenWithDegencastDialog
        open={openLaunchDailog}
        onOpenChange={setOpenLaunchDailog}
      />
    </>
  );
}

function HolderRequirement() {
  const router = useRouter();
  const holdingAmount = 10000;
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-1">
        {holdingAmount >= 10000 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              opacity="0.12"
              d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
              fill="#4CDD32"
            />
            <path
              d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M15 9H15.01M9 9H9.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9Z"
              stroke="#4CDD32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              opacity="0.12"
              d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
              fill="#4CDD32"
            />
            <path
              d="M8 16C8 16 9.5 14.5 12 14.5C14.5 14.5 16 16 16 16M15 9H15.01M9 9H9.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9Z"
              stroke="#FF4804"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
        <span className="text-2xl font-normal">
          Holding {(holdingAmount || 0).toLocaleString()} $CAST
        </span>
      </div>
      <Button
        className="md:px-6 md:py-3 text-2xl h-auto text-center max-md:text-xs"
        onClick={() => {
          if (!CAST_TOKEN_ADDRESS) {
            toast({
              description: "CAST Token Address not found",
              duration: 5000,
            });
            return;
          }
          router.push(`/memes/${CAST_TOKEN_ADDRESS}`);
        }}
      >
        Buy $CAST
      </Button>
    </div>
  );
}
function LaunchTokenWithDegencastDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[816px] gap-8 max-md:h-screen max-md:max-h-full max-h-[90%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Meme</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <CreateMemeFormWithApi
            onSuccess={(meme) => {
              onOpenChange(false);
              const baseToken = meme?.baseToken;
              const solToken = meme?.solToken;
              const tokenAddress =
                baseToken?.tokenAddress || solToken?.tokenAddress || meme.id;
              router.push(`/memes/${tokenAddress}`);
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
function LaunchItem({
  icon,
  name,
  onClick,
}: {
  icon: string;
  name: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex-col justify-start items-center gap-6 flex cursor-pointer">
      <img
        src={icon}
        alt={name}
        className="w-[80px] h-[80px] max-md:w-[48px] max-md:h-[48px] rounded-full border-2 border-foreground"
      />
      <Button
        className="md:px-6 md:py-3 text-2xl h-auto text-center max-md:text-xs"
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  );
}
