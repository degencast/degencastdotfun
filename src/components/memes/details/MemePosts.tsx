import { TelegramCommentsWidget } from "@/components/telegram/TelegramWidget";
import { Card, CardContent } from "@/components/ui/card";

import { MemeData } from "@/services/meme/types";

export default function MemePosts({ meme }: { meme: MemeData }) {
  if (!meme.tgPostLink) {
    return null;
  }
  return (
    <Card className="w-full h-fit overflow-hidden">
      <CardContent className="w-full overflow-hidden p-2 bg-white">
        <TelegramCommentsWidget
          discussion={meme?.tgPostLink?.replace("https://t.me/", "") || ""}
        />
      </CardContent>
    </Card>
  );
}
