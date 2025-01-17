"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/settings/search/useDebounce";
import { useOnClickOutside } from "@/hooks/settings/search/useOnClickOutside";
import { SearchResult } from "@/services/settings/search/types";
import { searchProfiles } from "@/services/settings/search/api";
import { SearchResultList } from "./SearchResultList";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSelect?: (result: SearchResult) => void;
}

export function SearchInput({ placeholder, className, onSelect }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setShowResults(false));

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await searchProfiles(debouncedQuery);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder}
        className={`flex h-12 w-full rounded-full border-4 border-primary bg-background px-6 py-3 text-xl font-normal text-foreground/80 shadow-sm transition-colors placeholder:text-foreground/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-80 max-sm:text-xs max-sm:px-2 max-sm:py-2 ${className}`}
      />
      {showResults && (query || loading) && (
        <SearchResultList
          results={results}
          loading={loading}
        />
      )}
    </div>
  );
} 