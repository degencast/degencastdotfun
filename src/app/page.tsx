import * as React from "react";
import type { Metadata } from "next";
import LandingPageHome from "@/components/landing-page/LandingPageHome";
import OnchainFuturesHome from "@/components/onchain-futures/Home";
import Home from "@/components/Home";
import {
  DEGENCAST_APP_LANDING_PAGE,
  DEGENCAST_APP_ONCHAIN_FUTURES,
} from "@/constants";

const appUrl =
  DEGENCAST_APP_LANDING_PAGE === true
    ? "https://degencast.ai"
    : "https://degencast.fun"; //process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/frame-cover.jpg`,
  button: {
    title: "Launch",
    action: {
      type: "launch_frame",
      name: "DegencastAI",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/logo.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  if (DEGENCAST_APP_LANDING_PAGE) {
    return {
      other: {
        "fc:frame": JSON.stringify(frame),
      },
    };
  }
  return {};
}

export default function HomePage() {
  if (DEGENCAST_APP_LANDING_PAGE) {
    return <LandingPageHome />;
  }
  if (DEGENCAST_APP_ONCHAIN_FUTURES) {
    return <OnchainFuturesHome />;
  }
  return <Home />;
}
