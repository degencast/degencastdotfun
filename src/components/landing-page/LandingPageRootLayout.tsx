import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./LandingPageClientComponents";
import BgGifs from "../layouts/BgGifs";

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
      <BgGifs className="max-sm:hidden" />
    </>
  );
}
