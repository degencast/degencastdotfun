import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/hooks/useSettingsUsers";

interface FollowButtonProps {
  address: string;
  following: boolean;
}

export function FollowButton({ address, following }: FollowButtonProps) {
  const { mutate: followUserMutation } = useFollowUser();

  return (
    <Button
      size="sm"
      onClick={() => followUserMutation(address)}
      className="rounded-full"
    >
      {following ? 'Remove' : 'Follow'}
    </Button>
  );
} 