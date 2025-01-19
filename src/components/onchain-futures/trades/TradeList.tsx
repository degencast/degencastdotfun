"use client";

import { useFollowingUsers } from "@/hooks/useSettingsUsers";
import { Web3BioProfile } from "@/services/settings/types";
import { TradeData2 } from "@/services/trade/types";
import { TradeCard } from "./TradeCard";
import { usePrivy } from "@privy-io/react-auth";

export default function TradeList({
  items,
  lastItemRef,
}: {
  items: Array<TradeData2>;
  lastItemRef?: any;
}) {
  const { user } = usePrivy();
  const { data: followingUsers, isLoading: isLoadingFollowing } =
    useFollowingUsers(user?.id);
  // 检查用户是否已关注
  const isFollowing = (user: Web3BioProfile) => {
    return (
      followingUsers?.some((following) => following.address === user.address) ??
      false
    );
  };
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, idx) => (
        <div
          key={item.txHash}
          ref={idx === items.length - 1 ? lastItemRef : null}
        >
          <TradeCard
            user={item.user}
            following={isFollowing(item.user)}
            tradeInfo={item}
          />
        </div>
      ))}
    </div>
  );
}
