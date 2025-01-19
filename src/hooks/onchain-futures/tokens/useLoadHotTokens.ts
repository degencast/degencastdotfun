import { API_BASE_URL } from "@/constants";
import { TokenData } from "@/services/meme/types";
import { fetcher } from "@/services/swr";
import { ApiResp } from "@/services/types";
import useSWR from "swr";

const mockData = Array.from({ length: 6 }).map((_, i) => ({
  chainName: "base",
  tokenAddress: "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b",
  symbol: "VIRTUAL",
  name: "Virtual Protocol",
  image:
    "https://dd.dexscreener.com/ds-data/tokens/base/0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b.png?size=lg&key=08d484",
  marketCap: Math.random() * 1000000000,
  priceUsd: 3.0855,
  priceChange: {
    h24: i % 2 === 0 ? Math.random() * 100 : -Math.random() * 100,
  },
})) as unknown as TokenData[];
export default function useLoadHotTokens() {
  const url =
    API_BASE_URL + "/memes/tokens/recommended?pageSize=10&pageNumber=1";
  const {
    data: res,
    error,
    isLoading,
  } = useSWR<ApiResp<Array<TokenData>>>(url, fetcher);
  const { data, code, msg } = res || {};

  return {
    pending: isLoading,
    items: data || [],
  };
}
