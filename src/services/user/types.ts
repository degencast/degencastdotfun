import { Address } from "viem";
import { MemeData } from "../meme/types";

export type UserData = {
  id: string;
  name: string;
  email?: string;
};

export type UserLeaderboardData = {
  user: {
    walletAddress: Address;
    name?: string;
    avatar?: string;
  };
  ethAmount: number;
  memeAmount: number;
  proportion: number | string;
};

export type OwnedMemeData = {
  user: {
    walletAddress: Address;
    name?: string;
    avatar?: string;
  };
  meme: MemeData;
  memeAmount: number;
  ethAmount: number;
  usdAmount: number;
  referralReward?: {
    amount: number;
    proof: any;
    index: number;
    root: any;
    isClaimed: boolean;
  };
};

export type Web3BioProfile = {
  address: string;
  identity: string;
  platform: string;
  displayName: string;
  avatar: string;
  description: string;
  email: string;
  location: string;
  header: string;
  contenthash: string;
  links: {
    website: {
      link: string;
      handle: string;
    };
    farcaster: {
      handle: string;
      links: string;
    };
    lens: {
      handle: string;
      links: string;
    };
  };
  social: {};
};
