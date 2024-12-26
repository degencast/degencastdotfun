"use client";

import useSearchTerms from "@/hooks/app/useSearchTerms";
import { SearchInput } from "./ui/search-input";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const { setSearchTerms } = useSearchTerms();
  useEffect(() => {
    setSearchTerms("");
  }, [pathname]);
  return (
    <SearchInput
      placeholder="Search meme..."
      className="flex-1 max-w-[240px]"
      onChange={(e) => setSearchTerms(e.target.value)}
    />
  );
}
