import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { getCreateCastWebUrl } from "@/lib/sharing/warpcast";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

export default function Home() {
  return (
    <div>
      <section
        className={cn("mt-[42px] max-w-[1304px] mx-auto", "max-md:mt-0")}
      >
        <Card className="w-full h-fit overflow-hidden rounded-[30px]">
          <CardContent className={cn(" bg-white")}>
            <div
              className={cn(
                "flex flex-row items-center justify-between gap-10",
                "max-md:flex-col-reverse max-md:gap-4"
              )}
            >
              <div className="flex-1 flex-col justify-between items-start gap-6 inline-flex max-md:gap-4 max-md:h-fit">
                <h1 className="text-primary  text-[64px] font-bold leading-[120%] max-md:text-[36px]">
                  <span
                    style={{ textShadow: "4px 4px 0px #1E1E1E" }}
                    className="max-md:hidden"
                  >
                    On-Chain Futures,
                    <br /> Opportunities at Your Fingertips!
                  </span>
                  <span
                    style={{ textShadow: "2px 2px 0px #1E1E1E" }}
                    className="hidden max-md:inline-block"
                  >
                    On-Chain Futures, <br /> Opportunities at Your Fingertips!
                  </span>
                </h1>
                <span className="self-stretch  text-3xl font-normal max-md:text-[20px]">
                  Stay ahead with crystal-clear on-chain insights. Track wallet
                  moves, spot contract trends, and copy whale trades with a
                  single click. Make smarter decisions in the decentralized
                  world!
                </span>
              </div>
              <div className="w-[435px] h-[435px] relative max-md:hidden rounded-[30px] overflow-hidden">
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
            </div>
            <div className="flex flex-row gap-6 mt-16">
              <div className="flex-1 flex flex-col gap-6 items-center">
                <Link href={"/settings"} className="w-full">
                  <Button className="w-full h-[98px] px-6 py-3 rounded-[30px] gap-6 flex">
                    <div className=" text-4xl font-bold max-md:text-3xl">
                      {`Get Started >>`}
                    </div>
                  </Button>
                </Link>
                <div className="text-2xl font-normal max-md:text-[20px] text-center">
                  💡Connect your wallet to unlock on-chain tracking and
                  personalized trading feeds. Dive into the Web3 core.
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-6 items-center">
                <Link href={"/trades"} className="w-full">
                  <Button className="w-full h-[98px] px-6 py-3 rounded-[30px] gap-6 flex">
                    <div className=" text-4xl font-bold max-md:text-3xl">
                      {`Explore as Guest >>`}
                    </div>
                  </Button>
                </Link>
                <div className="text-2xl font-normal max-md:text-[20px] text-center">
                  💡No wallet required. Explore trending on-chain insights and
                  live updates to begin your Web3 journey.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
