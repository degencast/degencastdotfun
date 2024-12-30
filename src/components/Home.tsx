"use client";
import * as React from "react";
import MemeList from "@/components/memes/MemeList";
import { SortBy } from "@/services/meme/types";
import Search from "./Search";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const tabs = [
    { name: "🔥 Hot", value: SortBy.marketCap },
    { name: "⬆️ Top", value: SortBy.trending },
    { name: "🆕 New", value: SortBy.newest },
  ];
  const [activeTab, setActiveTab] = React.useState(SortBy.marketCap);
  return (
    <div className="w-full">
      <div className="w-full flex gap-6">
        <div className=" flex flex-row gap-4 max-md:justify-center max-sm:gap-2">
          {tabs.map((tab) => (
            <Button
              variant={tab.value === activeTab ? "default" : "tertiary"}
              key={tab.value}
              size={"lg"}
              className={cn(
                "rounded-[10px] max-sm:h-[30px] max-sm:p-2 max-sm:text-xs"
              )}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        <div className="ml-auto max-md:w-full">
          <Search />
        </div>
      </div>
      <div className="mt-6 w-full max-sm:mt-2">
        <MemeList key={activeTab} sortBy={activeTab} />
      </div>
    </div>
  );
}
