"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonToggle2 } from "./ui/button-toggle";
import { ChainType } from "@/services/meme/types";

const chainOptions = [
  {
    value: ChainType.All,
    label: "All",
  },
  {
    value: ChainType.Base,
    label: "Base",
    icon: (
      <img
        src="/images/chain/base.png"
        alt={ChainType.Base}
        className="size-[28px] rounded-full max-md:size-[16px]"
      />
    ),
  },
  {
    value: ChainType.Sol,
    label: "Solana",
    icon: (
      <img
        src="/images/chain/solana.png"
        alt={ChainType.Sol}
        className="size-[28px] rounded-full max-md:size-[16px]"
      />
    ),
  },
];
export default function ChainSelector({
  chain,
  onChangeChain,
}: {
  chain: ChainType;
  onChangeChain: (value: ChainType) => void;
}) {
  const selected = chain || chainOptions[0].value;

  return (
    <>
      {" "}
      <div className="max-md:hidden">
        <ButtonToggle2
          value={selected}
          options={chainOptions}
          onChange={onChangeChain}
        />
      </div>
      <div className="hidden max-md:block max-sm:max-w-[510px] max-sm:mx-auto">
        {/* TODO Dropdown Select */}
        <ButtonToggle2
          value={selected}
          options={chainOptions}
          onChange={onChangeChain}
        />
      </div>
    </>
  );
}
