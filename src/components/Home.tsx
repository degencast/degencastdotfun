"use client";
import * as React from "react";
import MemeList from "@/components/memes/MemeList";
import { ChainType, DeployPlatform, SortBy } from "@/services/meme/types";
import Search from "./Search";
import ChainSelector from "./ChainSelector";
import HotMemes from "./memes/HotMemes";
import { ButtonToggle2 } from "./ui/button-toggle";
import { LayoutGrid, List } from "lucide-react";
import TokensTable from "./tokens/TokensTable";
import BuyCastFloatingBtn from "./BuyCastFloatingBtn";

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

const ListStyleOptions = [
  {
    value: ListStyle.Grid,
    icon: <LayoutGrid className="size-7 text-primary" />,
    activeIcon: <LayoutGrid className="size-7 text-primary-foreground" />,
  },
  {
    value: ListStyle.List,
    icon: <List className="size-7 text-primary" />,
    activeIcon: <List className="size-7 text-primary-foreground" />,
  },
];
const PlatformOptions = [
  {
    value: "" as DeployPlatform,
    label: <div className="px-6">All</div>,
  },
  {
    value: DeployPlatform.Degencast,
    label: "Degencast",
  },
  {
    value: DeployPlatform.Clanker,
    label: "Clanker",
  },
  {
    value: DeployPlatform.Virtuals,
    label: "Virtuals",
  },
];
const SortByOptions = [
  { label: "🔥 Hot", value: SortBy.marketCap },
  { label: "⬆️ Top", value: SortBy.trending },
  { label: "🆕 New", value: SortBy.newest },
];

const SortByVolOptions = [
  { value: SortBy.volumem1, label: "1m" },
  { value: SortBy.volumem5, label: "5m" },
  { value: SortBy.volumeh1, label: "1h" },
  { value: SortBy.volumeh6, label: "6h" },
  { value: SortBy.volumeh24, label: "24h" },
];
export default function Home() {
  const [listStyle, setListStyle] = React.useState(
    getStorageDefaultListStyle()
  );
  const [chain, setChain] = React.useState(ChainType.Base);
  const [platform, setPlatform] = React.useState("" as DeployPlatform);
  const [sortBy, setSortBy] = React.useState(SortBy.marketCap);
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between gap-6 max-lg:flex-col max-md:gap-3">
        <div className="flex gap-6 max-lg:justify-between max-sm:flex-col max-sm:gap-3">
          <ButtonToggle2
            value={listStyle}
            options={ListStyleOptions}
            onChange={(v) => {
              setListStyle(v);
              // if (v === ListStyle.Grid) {
              //   setSortBy(SortBy.marketCap);
              // } else {
              //   setSortBy(SortBy.volumeh24);
              // }
              setStorageDefaultListStyle(v);
            }}
          />
          {/* <ChainSelector chain={chain} onChangeChain={setChain} />
          <ButtonToggle2
            value={platform}
            options={PlatformOptions}
            onChange={setPlatform}
          /> */}
          <ButtonToggle2
            value={sortBy}
            options={SortByOptions}
            onChange={setSortBy}
          />
          {/* {listStyle === ListStyle.Grid ? (
            <ButtonToggle2
              value={sortBy}
              options={SortByOptions}
              onChange={setSortBy}
            />
          ) : (
            <ButtonToggle2
              value={sortBy}
              options={SortByVolOptions}
              onChange={setSortBy}
            />
          )} */}
        </div>

        {/* <div className="max-md:w-full">
          <Search />
        </div> */}
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
      <BuyCastFloatingBtn />
    </div>
  );
}
