import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import DefaultRootLayout from "@/components/layouts/DefaultRootLayout";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Comic_Neue as ComicNeueFont } from "next/font/google";
import LandingPageRootLayout from "@/components/landing-page/LandingPageRootLayout";
import Script from "next/script";
import { DEGENCAST_APP_LANDING_PAGE } from "@/constants";
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
        ) : (
          <Providers>
            <DefaultRootLayout>{children}</DefaultRootLayout>
          </Providers>
        )}
        <Toaster />
        <InitSdk />
      </body>
    </html>
  );
}
