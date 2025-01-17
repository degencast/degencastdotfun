"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateMemeFormWithApi } from "./CreateMemeFormWithApi";
import Image from "next/image";

export function CreateMemeButton() {
  const { login, authenticated } = usePrivy();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createBtnContent = (
    <div className="w-full h-full relative overflow-hidden">
      <Image src="/images/logo.png" alt="logo" fill />
    </div>
  );
  if (!authenticated) {
    return (
      <Button
        className="p-0 m-0 w-full h-full"
        onClick={() => {
          login();
        }}
      >
        {createBtnContent}
      </Button>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 m-0 w-full h-full">{createBtnContent}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-md:h-screen max-md:max-h-full max-h-[90%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Meme</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <CreateMemeFormWithApi
            onSuccess={(meme) => {
              setOpen(false);
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
