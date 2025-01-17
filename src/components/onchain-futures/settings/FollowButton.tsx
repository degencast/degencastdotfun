import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/hooks/useSettingsUsers";
import { usePrivy } from "@privy-io/react-auth";

interface FollowButtonProps {
  address: string;
  following: boolean;
}

export function FollowButton({ address, following }: FollowButtonProps) {
  const { user, login } = usePrivy();
  const { mutate: followUserMutation } = useFollowUser(user?.id);

  return (
    <Button
      size="sm"
      onClick={() => {
        if (user?.id) {
          followUserMutation(address);
        }else{
          login();
        }
      }}
      className="rounded-full"
    >
      {following ? 'Remove' : 'Follow'}
    </Button>
  );
} 