import { MemeData } from "@/services/meme/types";
import Link from "next/link";
import JoinTelegramButton from "@/components/telegram/JoinTelegramButton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import MemePosts from "./MemePosts";
import MemeCast from "./MemeCast";
import MemeTweet from "./MemeTweet";

export default function MemeInfoMiniCard({ meme }: { meme: MemeData }) {
  const castHash = meme?.castHash;
  const tweetId = meme?.tweetId;
  return (
    <Card className="w-full border-secondary">
      <CardContent className="w-full flex flex-col gap-6 p-3">
        <MemeInfo meme={meme} />
        {castHash && <MemeCast hash={castHash} />}
      </CardContent>
    </Card>
  );
}

function MemeInfo({ meme }: { meme: MemeData }) {
  return (
    <div className="w-full flex flex-row gap-2">
      <img
        className="w-[160px] h-[160px] rounded-[20px] object-cover"
        src={meme.image}
      />
      <div className="flex-1">
        <span className="text-primary text-xl font-bold">{meme.name}</span>
        <br />
        <span className="font-normal text-base max-md:text-xs">
          {meme.description}
        </span>
      </div>
    </div>
  );
}
function LinkRow({
  label,
  href,
  iconUrl,
  icon,
  text,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-secondary font-bold">{label}</span>
      <Link
        className="flex flex-row gap-1 items-center"
        href={href}
        target={href.startsWith("http") ? "_blank" : ""}
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="w-6 h-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1">{text}</span>
      </Link>
    </div>
  );
}
