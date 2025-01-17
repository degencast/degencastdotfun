import { SearchResult } from "./types";

export async function searchProfiles(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`https://api.web3.bio/profile/${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching profiles:", error);
    return [];
  }
} 