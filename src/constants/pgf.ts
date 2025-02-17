import { getChain } from "@/lib/onchain";
import { Address } from "viem";

export const PGF_CONTRACT_CHAIN_ID: number = Number(
  process.env.NEXT_PUBLIC_PGF_CONTRACT_CHAIN_ID
);
export const PGF_CONTRACT_CHAIN = getChain(PGF_CONTRACT_CHAIN_ID);
export const PGF_FACTORY_CONTRACT_ADDRESS: Address = process.env
  .NEXT_PUBLIC_PGF_FACTORY_CONTRACT_ADDRESS as unknown as Address;
