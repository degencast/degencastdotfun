import * as React from "react";
import type { Metadata } from "next";
import LandingPageHome from "@/components/landing-page/LandingPageHome";
import Home from "@/components/Home";
import { CAST_LANDING_PAGE } from "@/constants";

const appUrl =
	CAST_LANDING_PAGE === true ? "https://degencast.ai" : "https://degencast.fun"; //process.env.NEXT_PUBLIC_URL;

const frame = {
	version: "next",
	imageUrl: `${appUrl}/images/frame-cover.png`,
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
	return {
		title: "DegencastAI",
		openGraph: {
			title: "DegencastAI",
			description: "A DegencastAI app.",
		},
		other: {
			"fc:frame": JSON.stringify(frame),
		},
	};
}

export default function HomePage() {
	if (CAST_LANDING_PAGE) {
		return <LandingPageHome />;
	}
	return <Home />;
}
