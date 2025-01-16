import { Address } from "viem";

export type Web3BioUser = {
  name: string;
  address: Address;
  avatarUrl?: string;
}