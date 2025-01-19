import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./LayoutComponents";
import BgGifs, { BgGifsMask } from "@/components/layouts/BgGifs";

export default function RootLayout({ children }: { children: ReactNode }) {
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
