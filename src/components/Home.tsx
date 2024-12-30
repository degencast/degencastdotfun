"use client";
import * as React from "react";
import MemeList from "@/components/memes/MemeList";
import { ChainType, SortBy } from "@/services/meme/types";
import Search from "./Search";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ChainSelector from "./ChainSelector";
import HotMemes from "./memes/HotMemes";

export default function Home() {
  const tabs = [
    { name: "🔥 Hot", value: SortBy.marketCap },
    { name: "⬆️ Top", value: SortBy.trending },
    { name: "🆕 New", value: SortBy.newest },
  ];
  const [chain, setChain] = React.useState(ChainType.All);
  const [sortBy, setSortBy] = React.useState(SortBy.marketCap);
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between gap-6 max-lg:flex-col max-md:gap-3">
        <div className="flex gap-6 max-lg:justify-between max-sm:flex-col max-sm:gap-3">
          <ChainSelector chain={chain} onChangeChain={setChain} />
          <div className=" flex flex-row gap-3 max-md:justify-center max-sm:gap-2">
            {tabs.map((tab) => (
              <Button
                variant={tab.value === sortBy ? "default" : "tertiary"}
                key={tab.value}
                size={"lg"}
                className={cn(
                  "rounded-[10px] max-sm:h-[30px] max-sm:p-2 max-sm:text-xs"
                )}
                onClick={() => setSortBy(tab.value)}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-md:w-full">
          <Search />
        </div>
      </div>
      <div className="mt-6 w-full max-sm:mt-2">
        {sortBy === SortBy.marketCap ? (
          <HotMemes key={`${chain}-${sortBy}`} chain={chain} />
        ) : (
          <MemeList key={`${chain}-${sortBy}`} sortBy={sortBy} />
        )}
      </div>
    </div>
  );
}
