import { useFollowingUsers } from "@/hooks/useSettingsUsers";
import { Web3BioUser } from "@/services/settings/types";
import { TradeData2 } from "@/services/trade/types";
import { TradeCard } from "./TradeCard";

export default function TradeList({ items }: { items: Array<TradeData2> }) {
  const { data: followingUsers, isLoading: isLoadingFollowing } =
    useFollowingUsers();
  // 检查用户是否已关注
  const isFollowing = (user: Web3BioUser) => {
    return (
      followingUsers?.some((following) => following.address === user.address) ??
      false
    );
  };
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, idx) => (
        <TradeCard
          key={item.txHash}
          user={item.user}
          following={isFollowing(item.user)}
          tradeInfo={item}
        />
      ))}
    </div>
  );
}
