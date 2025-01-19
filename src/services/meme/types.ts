import type { TopicData } from "../topic/types";

export type MemeData = {
  // Meme 基本信息
  id: number;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdAt: Date;
  tgPostLink?: string; // tg channel post link
  topic?: TopicData;
  platform?: DeployPlatform;

  deployerEVMAddress: string;
  deployerSolanaAddress: string;
  deployerFid: string;
  deployerFcName: string;
  castHash?: string;

  deployerTwitterHandle?: string;
  tweetId?: string;

  baseToken: TokenData; // 部署在base上的token
  solToken: TokenData; // 部署在sol上的token
};

export type TokenData = {
  chainId: number;
  chainName: ChainName;
  tokenAddress: string;
  poolAddress: string;
  symbol: string;
  name: string;
  image?: string;
  memeData?: MemeData;
  marketCap: number;
  priceNative: string;
  priceUsd: string;
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
    m1: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
    m1: number;
  };
  txns: {
    h24: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
    m5: {
      buys: number;
      sells: number;
    };
  };
  nttConnect: {
    manager: string;
    transceiver: {
      address: string;
    };
  };
};
export enum ChainType {
  All = "",
  Base = "base",
  Sol = "sol",
}

export enum ChainName {
  Base = "base",
  Solana = "solana",
}
export enum DeployPlatform {
  Degencast = "degencast",
  Clanker = "clanker",
  Virtuals = "virtuals",
}

export enum SortBy {
  trending = "trending",
  newest = "newest",
  marketCap = "marketCap",
  launchTime = "launchTime",
  txns = "txns",
  txnsm1 = "txnsm1",
  txnsm5 = "txnsm5",
  txnsh1 = "txnsh1",
  txnsh6 = "txnsh6",
  txnsh24 = "txnsh24",
  volume = "volume",
  volumem1 = "volumem1",
  volumem5 = "volumem5",
  volumeh1 = "volumeh1",
  volumeh6 = "volumeh6",
  volumeh24 = "volume24",
  price = "price",
  priceChangeM1 = "pricechangem1",
  priceChangeM5 = "pricechangem5",
  priceChangeH1 = "pricechangeh1",
}
export enum OrderBy {
  asc = "asc",
  desc = "desc",
}
