import axios from "axios";
import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { OhlctData, TradeData, TradeData2 } from "./types";

export function getMemeTrades({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<TradeData[]>> {
  return request({
    url: `/memes/${address}/trades`,
    method: "get",
  });
}

export function getFollowingTrades(params: {
  pageSize?: number;
  pageNumber?: number;
  tokenAddress?: string;
}): RequestPromise<ApiResp<TradeData2[]>> {
  return request({
    url: `/memes/trades/following`,
    method: "get",
    params,
    headers: {
      needToken: true,
    },
  });
}
export function getTrendingTrades(params: {
  pageSize?: number;
  pageNumber?: number;
  tokenAddress?: string;
}): RequestPromise<ApiResp<TradeData2[]>> {
  return request({
    url: `/memes/trades/trending`,
    method: "get",
    params,
  });
}
export function getUserTrades({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<TradeData[]>> {
  return request({
    url: `/users/${address}/trades`,
    method: "get",
  });
}

export function getMemeOhlct({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<OhlctData[]>> {
  return request({
    url: `/memes/${address}/ohlct`,
    method: "get",
  });
}

export function getTokenInfoWithDexscreener(
  chainName: "base" | "solana" | string,
  tokenAddress: string
): RequestPromise<
  Array<{
    chainId: "base" | "solana" | string;
    baseToken: {
      address: string;
    };
    info: {
      imageUrl: string;
    };
  }>
> {
  return axios.get(
    `https://api.dexscreener.com/token-pairs/v1/${chainName}/${tokenAddress}`
  );
}
