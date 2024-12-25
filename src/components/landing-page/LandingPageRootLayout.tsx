import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./LandingPageClientComponents";
import BgGifs, { BgGifsMask } from "../layouts/BgGifs";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background-attachment: local;
        }
      `}</style>
      <DefaultHeader />
      <DefaultMain>{children}</DefaultMain>
      <BgGifs className="max-md:mt-[64px]" />
      <BgGifsMask className="max-md:mt-[64px]" />
    </>
  );
}
