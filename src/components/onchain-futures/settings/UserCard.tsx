import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Web3BioUser } from "@/services/settings/types";
import { shortPubKey } from "@/lib/shortAddress";

interface UserCardProps {
  user: Web3BioUser;
  following: boolean;
  onAction?: () => void;
}

export function UserCard({ user, following, onAction }: UserCardProps) {
  return (
    <Card className="p-4 bg-white border-4 border-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <img src={user.avatarUrl} alt={user.name} />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user.name}</span>
            <span className="text-sm text-muted-foreground">{shortPubKey(user.address)}</span>
          </div>
        </div>
        <Button
          size="sm"
          onClick={onAction}
          className="rounded-full"
        >
          {following ? 'Remove' : 'Follow'}
        </Button>
      </div>
    </Card>
  );
} 