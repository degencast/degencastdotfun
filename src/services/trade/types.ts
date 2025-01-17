import { MemeData, TokenData } from "../meme/types";
import { Web3BioProfile } from "../settings/types";

export type TradeData = {
  user: {
    walletAddress: string;
    name?: string;
    avatar?: string;
  };
  meme: MemeData;
  txType: "buy" | "sell";
  ethAmount: number;
  solAmount: number;
  memeAmount: number;
  date: number;
  txHash: string;
};

export type OhlctData = {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
};

export type TradeData2 = {
  txType: "buy" | "sell";
  token: TokenData;
  amount: number;
  priceUsd: string;

  swapToken: TokenData;
  swapAmount: number;

  date: number;
  txHash: string;
  user: Web3BioProfile;
};
