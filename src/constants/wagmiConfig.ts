import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { http } from "wagmi";
import { createConfig } from "@privy-io/wagmi";
export const config = createConfig({
  chains: [
    base,
    mainnet,
    optimism,
    arbitrum,
    baseSepolia,
    sepolia,
    optimismSepolia,
    arbitrumSepolia,
  ],
  transports: {
    [base.id]: http("https://base-rpc.publicnode.com"),
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    [optimism.id]: http("https://optimism-rpc.publicnode.com"),
    [arbitrum.id]: http("https://arbitrum-one-rpc.publicnode.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
    [arbitrumSepolia.id]: http("https://arbitrum-sepolia-rpc.publicnode.com"),
    [optimismSepolia.id]: http("https://optimism-sepolia-rpc.publicnode.com"),
  },
}); 