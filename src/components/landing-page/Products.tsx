"use client";

import useFrameSdk from "@/hooks/frame-sdk/useFrameSdk";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import OpenLink2 from "../OpenLink2";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Products() {
  return (
    <div className="w-full flex flex-row gap-12 max-md:flex-col">
      <div className="flex-1 flex flex-col gap-12 items-center justify-between max-md:gap-6">
        <ProductTitle>Launch</ProductTitle>
        <ProductDesc>
          The ultimate tool for multi-chain token launches. One click to bring
          your token to life. Multi-platform support coming soon!
        </ProductDesc>
        <FeatureBtn href={`/launch`}>Launch Now 🚀</FeatureBtn>
      </div>
      <div className="flex-1 flex flex-col gap-12 items-center justify-between max-md:gap-6">
        <ProductTitle>Trade</ProductTitle>
        <ProductDesc>
          Your go-to token tracking tool. Stay ahead with real-time insights on
          trending assets. Trade smarter, follow the market, and copy trends
          with ease!
        </ProductDesc>
        <FeatureBtn href={`/trades`}>Start Trading 💰</FeatureBtn>
      </div>
    </div>
  );
}

function ProductTitle({ children }: PropsWithChildren) {
  return (
    <h1
      className={cn(
        " text-primary text-[64px] font-bold leading-[120%] text-center",
        "max-md:text-[32px]"
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

function ProductDesc({ children }: PropsWithChildren) {
  return (
    <span className="text-[36px] font-normal text-center">{children}</span>
  );
}

function ProductBtn({
  children,
  href,
}: PropsWithChildren<{
  href: string;
}>) {
  const { sdk, isSDKLoaded, context } = useFrameSdk();
  return (
    <OpenLink2
      frameSdk={sdk}
      frameCtx={context}
      href={href}
      className="w-full block mx-auto"
    >
      <Button className="w-full h-[65px] px-6 py-3 rounded-[30px] gap-6 flex">
        <div className=" text-4xl font-bold max-md:text-3xl">{children}</div>
      </Button>
    </OpenLink2>
  );
}

function FeatureBtn({
  children,
  href,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <Link href={href} className="w-full block mx-auto">
      <Button className="w-full h-[65px] px-6 py-3 rounded-[30px] gap-6 flex">
        <div className=" text-4xl font-bold max-md:text-3xl">{children}</div>
      </Button>
    </Link>
  );
}
