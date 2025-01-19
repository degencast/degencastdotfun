import { base } from "viem/chains";

export const chainIcons = {
  [base.id]: "/images/chain/base.png",
  [`base`]: "/images/chain/base.png",
  [`solana`]: "/images/chain/solana.png",
} as { [key: string | number]: string };
