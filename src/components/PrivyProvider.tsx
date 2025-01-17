"use client";

import { PrivyProvider as PrivyProviderBase } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { config } from "@/constants/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AsyncData from "./AsyncData";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["telegram", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#FF1393",
          showWalletLoginFirst: true,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <Provider store={store}>
            {children}
            <AsyncData />
          </Provider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProviderBase>
  );
}
