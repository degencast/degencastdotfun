"use client";
import * as React from "react";
import MemeList from "@/components/memes/MemeList";
import { ChainType, SortBy } from "@/services/meme/types";
import Search from "./Search";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ChainSelector from "./ChainSelector";
import HotMemes from "./memes/HotMemes";
import { ButtonToggle2 } from "./ui/button-toggle";
import { LayoutGrid, List } from "lucide-react";
import TokensTable from "./tokens/TokensTable";

enum ListStyle {
  Grid = "grid",
  List = "list",
}
const getStorageDefaultListStyle = () => {
  return window.localStorage.getItem("listStyle") || ListStyle.Grid;
};
const setStorageDefaultListStyle = (listStyle: ListStyle) => {
  window.localStorage.setItem("listStyle", listStyle);
};
export default function Home() {
  const tabs = [
    { name: "🔥 Hot", value: SortBy.marketCap },
    { name: "⬆️ Top", value: SortBy.trending },
    { name: "🆕 New", value: SortBy.newest },
  ];
  const [listStyle, setListStyle] = React.useState(
    getStorageDefaultListStyle()
  );
  const [chain, setChain] = React.useState(ChainType.Base);
  const [sortBy, setSortBy] = React.useState(SortBy.marketCap);
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between gap-6 max-lg:flex-col max-md:gap-3">
        <div className="flex gap-6 max-lg:justify-between max-sm:flex-col max-sm:gap-3">
          <ButtonToggle2
            value={listStyle}
            options={[
              {
                value: ListStyle.Grid,
                icon: <LayoutGrid className="size-7 text-primary" />,
                activeIcon: (
                  <LayoutGrid className="size-7 text-primary-foreground" />
                ),
              },
              {
                value: ListStyle.List,
                icon: <List className="size-7 text-primary" />,
                activeIcon: <List className="size-7 text-primary-foreground" />,
              },
            ]}
            onChange={(v) => {
              setListStyle(v);
              setStorageDefaultListStyle(v);
            }}
          />
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
        {listStyle === ListStyle.Grid ? (
          <>
            {sortBy === SortBy.marketCap ? (
              <HotMemes key={`${chain}-${sortBy}`} chain={chain} />
            ) : (
              <MemeList key={`${chain}-${sortBy}`} sortBy={sortBy} />
            )}
          </>
        ) : (
          <TokensTable />
        )}
      </div>
    </div>
  );
}
