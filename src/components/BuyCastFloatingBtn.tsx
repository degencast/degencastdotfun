"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { CAST_TOKEN_ADDRESS } from "@/constants";

export default function BuyCastFloatingBtn() {
  const { meme, pending } = useLoadMeme({
    address: CAST_TOKEN_ADDRESS!,
  });
  return (
    <Link href={`/buy`} className="fixed bottom-24 right-20">
      <Button className=" flex flex-row items-center gap-6 p-6">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-6 object-cover rounded-full">
            <AvatarImage src={meme?.image || "/images/logo.png"} />
            <AvatarFallback className="w-full h-full object-cover rounded-full">
              <span className="text-3xl font-bold text-secondary max-md:text-xl">
                ${meme?.symbol || "CAST"}
              </span>
            </AvatarFallback>
          </Avatar>
          <span className="text-2xl font-bold">${meme?.symbol || "CAST"}</span>
          <div className="font-bold">${meme?.symbol || "CAST"}</div>
        </div>

        <div className="bg-white px-2 py-1 text-base font-bold rounded-full text-primary min-w-[42px]">
          Buy
        </div>
      </Button>
    </Link>
  );
}
