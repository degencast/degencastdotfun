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

export default function Footer() {
  const [windowObj, setWindowObj] = useState<Window & typeof globalThis>();
  useEffect(() => {
    setWindowObj(window);
  }, []);
  return (
    <div className="w-full h-14 py-3 justify-between items-center flex">
      <div className="justify-start items-center gap-6 flex">
        {/* <Link
          className="justify-start items-center gap-2 flex"
          href={TG_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/landing-page/images/telegram.png"
              alt="telegram"
              fill
            />
          </div>
          <span className="text-white text-2xl font-normal">Telegram</span>
        </Link> */}
        <Link
          className="justify-start items-center gap-2 flex"
          href={X_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative rounded-[10px] overflow-hidden">
            <Image src="/images/x.png" alt="telegram" fill />
          </div>
          <span className="text-white text-2xl font-normal">X</span>
        </Link>

        <Line />

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
          <span className="text-white text-2xl font-normal">Warpcast</span>
        </Link>

        <Line />

        <Link
          className="justify-start items-center gap-2 flex"
          href={PARAGRAPH_LINK}
          target="_blank"
        >
          <div className="w-8 h-8 relative">
            <Image src="/landing-page/images/logo.png" alt="paragraph" fill />
          </div>
          <span className="text-white text-2xl font-normal">Paragraph</span>
        </Link>

        <Line />

        <Link
          className="justify-start items-center gap-2 flex"
          href={`${
            windowObj && windowObj.location.origin
          }/pdf/TERMS_OF_SERVICE_OF_DEGENCAST.pdf`}
          target="_blank"
        >
          <span className="text-white text-2xl font-normal">
            Terms of Service
          </span>
        </Link>

        <Line />

        <Link
          className="justify-start items-center gap-2 flex"
          href={`${
            windowObj && windowObj.location.origin
          }/pdf/PRIVACY_POLICY_OF_DEGENCAST.pdf`}
          target="_blank"
        >
          <span className="text-white text-2xl font-normal">
            Privact Policy
          </span>
        </Link>
      </div>
      <div className="text-white text-2xl font-normal">
        Powered by degencast.ai
      </div>
    </div>
  );
}

function Line() {
  return <div className="w-[2px] h-[24px] bg-white rounded-full"></div>;
}
