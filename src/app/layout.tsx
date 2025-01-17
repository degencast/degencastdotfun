import type { Metadata } from "next";
import "./globals.css";
import DefaultRootLayout from "@/components/layouts/DefaultRootLayout";
import PrivyProvider from "@/components/PrivyProvider";
import { Toaster } from "@/components/ui/toaster";
import { Comic_Neue as ComicNeueFont } from "next/font/google";
import LandingPageRootLayout from "@/components/landing-page/LandingPageRootLayout";
import OnchainFuturesRootLayout from "@/components/onchain-futures/layout/RootLayout";
import Script from "next/script";
import {
  DEGENCAST_APP_LANDING_PAGE,
  DEGENCAST_APP_ONCHAIN_FUTURES,
} from "@/constants";
import InitSdk from "@/components/InitSdk";

export const metadata: Metadata = DEGENCAST_APP_LANDING_PAGE
  ? {
      title: "degencast.ai",
      description: "Welcome to degencast.ai✨",
      icons: {
        icon: "/landing-page/images/logo.png",
      },
    }
  : {
      title: "degencast.fun",
      description: "Welcome to degencast.fun✨",
      icons: {
        icon: "/images/logo.png",
      },
    };

const font = ComicNeueFont({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://terminal.jup.ag/main-v3.js"></Script>
      <body className={`${font.className} antialiased`}>
        {DEGENCAST_APP_LANDING_PAGE ? (
          <LandingPageRootLayout>{children}</LandingPageRootLayout>
        ) : DEGENCAST_APP_ONCHAIN_FUTURES ? (
          <PrivyProvider>
            <OnchainFuturesRootLayout>{children}</OnchainFuturesRootLayout>
          </PrivyProvider>
        ) : (
          <PrivyProvider>
            <DefaultRootLayout>{children}</DefaultRootLayout>
          </PrivyProvider>
        )}
        <Toaster />
        <InitSdk />
      </body>
    </html>
  );
}
