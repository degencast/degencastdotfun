"use client";

import useSearchTerms from "@/hooks/app/useSearchTerms";
import { SearchInput } from "./ui/search-input";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Search() {
  const pathname = usePathname();
  const { setSearchTerms } = useSearchTerms();
  useEffect(() => {
    setSearchTerms("");
  }, [pathname]);
  return (
    <SearchInput
      placeholder="Search meme..."
      className={cn("flex-1 max-w-[240px] max-md:h-[32px] max-md:max-w-full")}
      onChange={(e) => setSearchTerms(e.target.value)}
    />
  );
}
