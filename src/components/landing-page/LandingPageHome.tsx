import Image from "next/image";
import { Button } from "../ui/button";
import AirdropRules from "./AirdropRules";
import Tokenomics from "./Tokenomics";
import Footer from "./Footer";
import Link from "next/link";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import Roadmap from "./Roadmap";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Card, CardContent } from "../ui/card";

export default function LandingPageHome() {
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
              <span className=" text-[36px] font-bold leading-[120%] max-md:text-[24px]">
                Claim $CAST and Unlock Web3 Opportunities
              </span>
              <span className="self-stretch  text-2xl font-normal max-md:text-[20px]">
                $CAST connects Solana and Base with seamless cross-chain
                utility. Powering the future of Web3, $CAST unlocks endless
                possibilities—start your journey today!
              </span>
              <Link
                href={getCreateCastWebUrl(
                  [],
                  "",
                  `@degencast.eth claim $CAST airdrop!`
                )}
                target="_blank"
                className="w-full"
              >
                <Button className="w-full h-[65px] px-6 py-3 rounded-[30px] gap-6 flex">
                  <div className=" text-4xl font-bold max-md:text-3xl">
                    Claim $CAST
                  </div>
                </Button>
              </Link>
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
      <section className=" " id="rules">
        <SectionTitle>✨ Airdrop Rules ✨</SectionTitle>
        <AirdropRules />
      </section>
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
      <section className=" " id="castdao">
        <SectionTitle>🐱 CAST DAO 🐱</SectionTitle>
        <Card className="w-full h-fit overflow-hidden rounded-[30px]">
          <CardContent>
            <div className="text-[24px] font-normal leading-[120%] max-md:text-[12px]">
              CAST DAO declares that the Token it issues is not intended for use
              in jurisdictions where its offering is unlawful, including but not
              limited to the United States, Canada, Japan, Hong Kong, South
              Africa, and Brazil. The Token is not registered with the SEC under
              the US Securities Act of 1933 or listed on any US securities
              exchange.
              <br />
              <br />
              CAST DAO has taken no action to facilitate a market for the Token
              in the United States. The Token may not be offered, sold, or
              transferred in the US unless exempt from or not subject to
              registration under the Securities Act and complies with applicable
              US securities laws.
            </div>
          </CardContent>
        </Card>
      </section>
      <section className=" mt-[128px] max-md:hidden">
        <Footer />
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
