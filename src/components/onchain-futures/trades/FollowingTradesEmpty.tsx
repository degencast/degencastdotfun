"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function FollowingTradesEmpty() {
  const { user, login } = usePrivy();
  return (
    <Card className="w-full max-md:rounded-none">
      <CardContent className="w-full p-0">
        <div className="w-full h-[430px] flex flex-col items-center justify-center gap-8">
          {!user?.id ? (
            <>
              <span className="text-[#7E7E7E] text-2xl font-normal text-center">
                Log in to view the transaction records of followed users
              </span>
              <Button
                className="min-w-[430px] rounded-full "
                size="lg"
                onClick={login}
              >
                <div className="text-2xl font-bold max-md:text-3xl">
                  {`Login`}
                </div>
              </Button>
            </>
          ) : (
            <>
              <span className="text-[#7E7E7E] text-2xl font-normal text-center">
                No transactions yet
              </span>
              <Link href={"/settings"}>
                <Button className="min-w-[430px] rounded-full " size="lg">
                  <div>{`Add more followings`}</div>
                </Button>
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
