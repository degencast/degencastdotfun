"use client";

import { useRouter } from "next/navigation";
import { CreateMemeFormWithApi } from "@/components/memes/create/CreateMemeFormWithApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Launch() {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-3">
      <Card className="flex-1 bg-white">
        <CardHeader className="font-bold text-3xl text-primary">
          Create Meme
        </CardHeader>
        <CardContent className="pt-0">
          {" "}
          <CreateMemeFormWithApi
            onSuccess={(meme) => {
              const baseToken = meme?.baseToken;
              const solToken = meme?.solToken;
              const tokenAddress =
                baseToken?.tokenAddress || solToken?.tokenAddress || meme.id;
              router.push(`/memes/${tokenAddress}`);
            }}
          />
        </CardContent>
      </Card>
      <Card className="w-[456px] bg-white">
        <CardHeader className="font-bold text-3xl text-primary">
          Token Launch
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4 text-2xl">
            <p className="font-medium">Launch, Grow, Cross-Chain! 🎉</p>

            <p>Create your own meme token in two ways:</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold">• On Warpcast:</h3>
                <p className="pl-4">
                  Post a cast, tag <span className="font-bold">@bot</span>, and
                  include token name, symbol, chain, and image. The bot will
                  handle the rest.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">• On Website:</h3>
                <p className="pl-4">
                  Fill in token details (name, symbol, chain, image,
                  description) and hit Create.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                💡 Launch your token on <span className="font-bold">Base</span>{" "}
                and <span className="font-bold">Solana</span> at the same time
                with <span className="font-bold">DegenCast</span>. When the
                market cap hits <span className="font-bold">$1 million</span>,
                cross-chain trading is enabled automatically.
              </p>

              <ul className="space-y-2 pl-4">
                <li>
                  <span className="font-bold">• On Base Chain:</span> Deployed
                  on <span className="font-bold">Uniswap v3</span> for trading.
                </li>
                <li>
                  <span className="font-bold">• On Solana Chain:</span> Deployed
                  on <span className="font-bold">Jupiter</span> for trading.
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
