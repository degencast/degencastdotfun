import { TokenData } from "@/services/meme/types";
import { TokenCard } from "./TokenCard";
import useLoadHotTokens from "@/hooks/onchain-futures/tokens/useLoadHotTokens";

export default function HotTokens() {
  const { items } = useLoadHotTokens();

  return (
    <div className="flex flex-col gap-6">
      {items.map((item, idx) => (
        <TokenCard key={idx} token={item} />
      ))}
    </div>
  );
}
