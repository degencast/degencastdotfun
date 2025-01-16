import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Web3BioUser } from "@/services/settings/types";
import { shortPubKey } from "@/lib/shortAddress";
import CopyAddress from "@/components/CopyAddress";

interface UserCardProps {
  user: Web3BioUser;
  following: boolean;
  onAction?: () => void;
}

export function UserCard({ user, following, onAction }: UserCardProps) {
  const nameInitials = user.name.slice(0, 2).toUpperCase();

  return (
    <Card className="p-4 bg-white border-4 border-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary/60 text-primary-foreground">
              {nameInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user.name}</span>
            <CopyAddress address={user.address} size="small" />
          </div>
        </div>
        <Button 
          variant={following ? 'destructive' : 'default'} 
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