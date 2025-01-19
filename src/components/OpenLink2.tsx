import { cn } from "@/lib/utils";
import type { FrameContext } from "@farcaster/frame-sdk";
import type { FrameSDK } from "@farcaster/frame-sdk/dist/types";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function OpenLink2({
  href,
  frameCtx,
  frameSdk,
  className,
  children,
}: PropsWithChildren<{
  href: string;
  frameCtx?: FrameContext;
  frameSdk?: FrameSDK;
  className?: string;
}>) {
  if (frameCtx?.user.fid && frameSdk) {
    return (
      <div
        className={cn("inline-block", className)}
        onClick={() => {
          frameSdk.actions.openUrl(href);
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <Link className={cn("", className)} href={href} target="_blank">
      {children}
    </Link>
  );
}
