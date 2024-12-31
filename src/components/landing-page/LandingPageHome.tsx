"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import AirdropRules from "./AirdropRules";
import Tokenomics from "./Tokenomics";
import Link from "next/link";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import Roadmap from "./Roadmap";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import CastDao from "./CastDao";
import OpenLink2 from "../OpenLink2";
import useFrameSdk from "@/hooks/frame-sdk/useFrameSdk";

export default function LandingPageHome() {
  const { sdk, isSDKLoaded, context } = useFrameSdk();

  const claimLink = (
    <OpenLink2
      frameSdk={sdk}
      frameCtx={context}
      href={getCreateCastWebUrl([], "", `@degencast.eth claim $CAST airdrop!`)}
      className="block mx-auto"
    >
      <Button className="w-full h-[65px] px-6 py-3 rounded-[30px] gap-6 flex">
        <div className=" text-4xl font-bold max-md:text-3xl">Claim $CAST</div>
      </Button>
    </OpenLink2>
  );
  return (
    <div className="min-h-screen">
      <section className={cn("mt-[42px] ", "max-md:mt-0")}>
        <Card className="w-full h-fit overflow-hidden rounded-[30px]">
          <CardContent
            className={cn(
              "flex flex-row items-center justify-between bg-white gap-10",
              "max-md:flex-col-reverse max-md:gap-4"
            )}
          >
            <div className="flex-1 h-[496px] flex-col justify-between items-start gap-8 inline-flex max-md:gap-4 max-md:h-fit">
              <h1 className="text-primary  text-[64px] font-bold leading-[120%] max-md:text-[36px]">
                <span
                  style={{ textShadow: "4px 4px 0px #1E1E1E" }}
                  className="max-md:hidden"
                >
                  Build, Trade, Earn – All in DegenCast
                </span>
                <span
                  style={{ textShadow: "2px 2px 0px #1E1E1E" }}
                  className="hidden max-md:inline-block"
                >
                  Build, Trade, Earn – All in DegenCast
                </span>
              </h1>
              <div className="w-full hidden max-md:block">{claimLink}</div>
              <span className=" text-[36px] font-bold leading-[120%] max-md:text-[24px]">
                Claim $CAST and Unlock Web3 Opportunities
              </span>
              <span className="self-stretch  text-2xl font-normal max-md:text-[20px]">
                $CAST connects Solana and Base with seamless cross-chain
                utility. Powering the future of Web3, $CAST unlocks endless
                possibilities—start your journey today!
              </span>
              <div className="w-full max-md:hidden">{claimLink}</div>
              <OpenLink2
                frameSdk={sdk}
                frameCtx={context}
                href={`https://newcaster.org/`}
                className=" text-[#ff1393] text-2xl font-normal underline w-auto mx-auto hover:scale-105 transition-all"
              >
                No Farcaster account?
              </OpenLink2>
            </div>
            <div className="w-[505px] h-[496px] relative max-md:hidden rounded-[30px] overflow-hidden">
              <Image
                src="/landing-page/images/claim-banner.png"
                alt="landing-page-home"
                fill
              />
            </div>
            <div className="hidden w-full max-md:block ">
              <img
                className="w-full rounded-[30px]"
                src="/landing-page/images/claim-banner.png"
                alt="landing-page-home"
              />
            </div>
          </CardContent>
        </Card>
      </section>
      {/* <section className=" " id="rules">
        <SectionTitle>✨ Airdrop Rules ✨</SectionTitle>
        <AirdropRules />
      </section> */}
      <section className=" " id="tokenomics">
        <SectionTitle>📊 TOKENOMICS 📊</SectionTitle>
        <Card className="w-full h-fit overflow-hidden rounded-[30px]">
          <CardContent>
            <Tokenomics />
          </CardContent>
        </Card>
      </section>
      <section className=" " id="roadmap">
        <SectionTitle>🗺️ Roadmap 🗺️</SectionTitle>
        <Card className="w-full h-fit overflow-hidden rounded-[30px]">
          <CardContent>
            <Roadmap />
          </CardContent>
        </Card>
      </section>
      <section className="mb-20" id="castdao">
        <SectionTitle>🐱 CAST DAO 🐱</SectionTitle>
        <Card className="w-full max-w-[978px] h-fit overflow-hidden rounded-[30px] mx-auto">
          <CardContent>
            <CastDao />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h1
      className={cn(
        " text-primary text-[64px] font-bold leading-[120%] text-center mt-[128px] mb-12 ",
        "max-md:mt-[48px] max-md:mb-4 max-md:text-[32px]"
      )}
    >
      <span
        style={{ textShadow: "4px 4px 0px #1E1E1E" }}
        className="max-md:hidden"
      >
        {children}
      </span>
      <span
        style={{ textShadow: "2px 2px 0px #1E1E1E" }}
        className="hidden max-md:inline-block"
      >
        {children}
      </span>
    </h1>
  );
}
