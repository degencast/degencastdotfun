import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import GuideText from "./GuideText";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Share2Earn() {
  const { login, authenticated } = usePrivy();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-[52px] rounded-full bg-primary-foreground hover:bg-primary-foreground text-primary text-2xl font-bold px-6"
          onClick={() => {
            if (!authenticated) {
              login();
              return;
            }
            setOpen(true);
          }}
        >
          Share2Earn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[816px] gap-8 max-md:h-screen max-md:max-h-full max-h-[90%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Share2Earn</DialogTitle>
        </DialogHeader>
        <GuideText
          guides={[
            {
              title: "Buy memes",
              description:
                "hold a few tokens to unlock the Share to Earn feature! Once you've got them, you're all set to start sharing and earning rewards!",
            },
            {
              title: "Earn by Sharing",
              description:
                'Click the "Share2Earn" button to generate your unique link and share it with friends. Once your friend completes a transaction through this link, both of you will receive a 5% token reward!',
            },
            {
              title: "Claim Tokens",
              description:
                'Go to the "Held" list in your profile to view your earned reward tokens. Once the token launches, the Claim button will be active, and you can collect your rewards!',
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
