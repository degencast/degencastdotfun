import { Button } from "@/components/ui/button";
import { useFollowUser, useUnfollowUser } from "@/hooks/useSettingsUsers";
import { usePrivy } from "@privy-io/react-auth";

interface FollowButtonProps {
  address: string;
  following: boolean;
}

export function FollowButton({ address, following }: FollowButtonProps) {
  const { user, login } = usePrivy();
  const { mutate: followUserMutation, isLoading: isFollowing } = useFollowUser(user?.id);
  const { mutate: unfollowUserMutation, isLoading: isUnfollowing } = useUnfollowUser(user?.id);

  const isLoading = isFollowing || isUnfollowing;

  const handleClick = () => {
    if (!user?.id) {
      login();
      return;
    }

    if (following) {
      unfollowUserMutation(address);
    } else {
      followUserMutation(address);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleClick}
      className="rounded-full min-w-[90px]"
      variant={following ? "outline" : "default"}
      disabled={isLoading}
    >
      {isLoading ? (
        following ? 'Unfollowing...' : 'Following...'
      ) : (
        following ? 'Following' : 'Follow'
      )}
    </Button>
  );
} 