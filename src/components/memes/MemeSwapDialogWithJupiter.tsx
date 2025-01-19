import { SOLANA_ENDPOINT } from "@/constants/solana";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import MemeSwapWithJupiter from "./MemeSwapWithJupiter";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function MemeSwapDialogWithJupiter({
  token,
  className,
  btnContent,
}: {
  token: {
    address: string;
  };
  className?: string;
  btnContent?: JSX.Element;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("px-2 py-1 gap-1", className)}>
          {btnContent || (
            <>
              <div className=" relative w-6 h-6 rounded-full overflow-hidden">
                <Image src="/images/chain/solana.png" alt={"solana"} fill />
              </div>
              Swap
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] gap-8 max-md:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Trade on Jupiter</DialogTitle>
        </DialogHeader>
        <div className="h-[420px] rounded-md overflow-hidden">
          <MemeSwapWithJupiter token={token} />
        </div>
      </DialogContent>
    </Dialog>
  );
  // return (
  //   <Button
  //     onClick={() => {
  //       if (!(window as any).Jupiter) {
  //         return;
  //       }
  //       if ((window as any).Jupiter._instance) {
  //         (window as any).Jupiter.resume();
  //       }
  //       (window as any).Jupiter.init({
  //         endpoint: SOLANA_ENDPOINT,
  //         formProps: {
  //           initialInputMint: "So11111111111111111111111111111111111111112",
  //           initialOutputMint: token?.address,
  //         },
  //       });
  //     }}
  //   >
  //     Swap
  //   </Button>
  // );
}
