"use client";

import { UserCard } from "@/components/onchain-futures/settings/UserCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useRecommendedUsers,
  useFollowingUsers,
} from "@/hooks/useSettingsUsers";
import { Web3BioProfile } from "@/services/settings/types";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/onchain-futures/settings/search/SearchInput";

export default function Settings() {
  const router = useRouter();

  const { data: recommendedUsers, isLoading: isLoadingRecommended } =
    useRecommendedUsers();
  const { data: followingUsers, isLoading: isLoadingFollowing } =
    useFollowingUsers();
  // 检查用户是否已关注
  const isFollowing = (user: Web3BioProfile) => {
    return (
      followingUsers?.some((following) => following.address === user.address) ??
      false
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full">
      <div className="flex flex-row justify-center items-stretch gap-6 max-md:flex-col">
        {/* Left Column - Recommended Users */}
        <Card className="p-4 w-2/3 max-md:w-full bg-white border-4 border-primary">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-primary">
              Follow Trading Address
            </h1>
            <SearchInput
              placeholder="Search wallet address, ENS name, Solana name service or Farcaster..."
              className="w-full"
            />
          </div>

          <div className="flex-1 mt-4">
            <h1 className="text-2xl font-bold mb-4 text-primary">
              Recommended Users ✨
            </h1>
            {isLoadingRecommended || isLoadingFollowing ? (
              <div>Loading...</div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                {recommendedUsers?.map((user: Web3BioProfile) => (
                  <Card
                    key={user.address}
                    className="p-4 bg-white border-4 border-primary"
                  >
                    <UserCard user={user} following={isFollowing(user)} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Right Column */}
        <div className="w-1/3 max-md:w-full flex flex-col gap-6">
          {/* Following Card */}
          <Card className="p-4 bg-white flex-1 border-4 border-primary">
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-4 text-primary">
                Following 🎯
              </h1>
              <div className="flex-1 flex flex-col gap-3">
                {isLoadingFollowing ? (
                  <div>Loading...</div>
                ) : followingUsers?.length ? (
                  followingUsers.map((user: Web3BioProfile) => (
                    <Card key={user.address} className="p-4 bg-white border-4 border-primary">
                      <UserCard user={user} following={true} />
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground mt-8">
                    <p>You haven&apos;t added any following yet.</p>
                    <p>
                      Search or select recommended users from the left column.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Done Button */}
          <Button
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            onClick={() => router.back()}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
