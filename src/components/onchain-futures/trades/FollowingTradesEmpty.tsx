import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function FollowingTradesEmpty() {
  return (
    <Card className="w-full max-md:rounded-none">
      <CardContent className="w-full p-0">
        <div className="w-full h-[300px] flex flex-col items-center justify-center gap-8">
          <span className="text-[#7E7E7E] text-2xl font-normal">
            No transactions yet
          </span>
          <Link href={"/settings"}>
            <Button className="h-[48px]">
              <div className="text-2xl font-bold max-md:text-3xl">
                {`Add more followings`}
              </div>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
