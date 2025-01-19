import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function AboutDialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="fill-primary-foreground stroke-primary size-16 -mx-2 cursor-pointer hover:scale-105 transition-transform max-md:size-12 max-md:mx-0" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] max-h-[90vh] gap-8 max-md:h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>How DegenCast works?</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-col justify-start items-start gap-8 inline-flex flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 text-2xl">
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary  font-bold">
                {" "}
                1. Add Your Following Address 🎯
              </div>
              <div className="self-stretch ">
                Start by adding wallet addresses, ENS names, Solana Name Serivce
                or FID to your following list. Use our recommendations or search
                for addresses manually to customize your feed.
              </div>
            </div>

            <div className=" flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary  font-bold">
                2. Track Transactions in Real Time ⌚️
              </div>
              <div className="">
                View live on-chain transactions from your following. Each
                transaction clearly displays:
              </div>
              <ul className="list-disc list-inside pl-4">
                <li>
                  Whether it’s a <b>Buy</b> or <b>Sell</b> action.
                </li>
                <li>
                  The <b>token price</b> and amount traded.
                </li>
                <li>
                  The <b>total value</b> of the transaction.
                </li>
              </ul>
            </div>

            <div className=" flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary  font-bold">
                3. Copy Trades with One Click ⚡️
              </div>
              <div className="self-stretch ">
                Spot a trade you like? Replicate it instantly with our{" "}
                <b>Copy Trade</b> feature. Set your preferred parameters like
                transaction amount, slippage tolerance, and gas fees, and
                execute with confidence.
              </div>
            </div>

            <div className=" flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-secondary  font-bold">
                4. Stay Updated (coming soon) ⬆️
              </div>
              <div className="self-stretch ">
                Enable notifications to get real-time alerts on high-value
                transactions or specific token movements. Never miss a
                profitable opportunity.
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
