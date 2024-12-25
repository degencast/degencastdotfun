"use client";
import {
  PARAGRAPH_LINK,
  TG_LINK,
  WARPCAST_LINK,
  X_LINK,
} from "@/constants/landing-page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CastDao() {
  const [windowObj, setWindowObj] = useState<Window & typeof globalThis>();
  useEffect(() => {
    setWindowObj(window);
  }, []);
  return (
    <div className="w-full flex flex-row gap-[48px]">
      <div className="flex-1">
        <div className="font-[400] text-[16px] max-md:text-[10px]">
          CAST DAO declares that the Token it issues is not intended for use in
          jurisdictions where its offering is unlawful, including but not
          limited to the United States, Canada, Japan, Hong Kong, South Africa,
          and Brazil. The Token is not registered with the SEC under the US
          Securities Act of 1933 or listed on any US securities exchange.
          <br />
          <br />
          CAST DAO has taken no action to facilitate a market for the Token in
          the United States. The Token may not be offered, sold, or transferred
          in the US unless exempt from or not subject to registration under the
          Securities Act and complies with applicable US securities laws.
        </div>
        <div className="flex flex-row items-center gap-6 text-2xl font-normal mt-[48px] max-md:mt-[16px] max-md:text-base">
          <Link
            href={`${
              windowObj && windowObj.location.origin
            }/pdf/TERMS_OF_SERVICE_OF_DEGENCAST.pdf`}
            target="_blank"
          >
            <span>Terms of Service</span>
          </Link>

          <Line />

          <Link
            href={`${
              windowObj && windowObj.location.origin
            }/pdf/PRIVACY_POLICY_OF_DEGENCAST.pdf`}
            target="_blank"
          >
            <span>Privact Policy</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-6 max-md:hidden">
        <Link
          className="justify-start items-center gap-2 flex"
          href={TG_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative rounded-[10px] overflow-hidden">
            <Image
              src="/landing-page/images/telegram.png"
              alt="telegram"
              fill
            />
          </div>
          <span className="text-3xl font-normal">Telegram</span>
        </Link>
        <Link
          className="justify-start items-center gap-2 flex"
          href={X_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative rounded-[10px] overflow-hidden">
            <Image src="/images/x.png" alt="telegram" fill />
          </div>
          <span className="text-3xl font-normal">X</span>
        </Link>

        <Link
          className="justify-start items-center gap-2 flex"
          href={WARPCAST_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/landing-page/images/warpcast.png"
              alt="warpcast"
              fill
            />
          </div>
          <span className="text-3xl font-normal">Warpcast</span>
        </Link>

        <Link
          className="justify-start items-center gap-2 flex"
          href={PARAGRAPH_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image src="/landing-page/images/logo.png" alt="paragraph" fill />
          </div>
          <span className="text-3xl font-normal">Paragraph</span>
        </Link>
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="w-[2px] h-[24px] bg-[#1E1E1E] rounded-full max-md:h-[18px]"></div>
  );
}
