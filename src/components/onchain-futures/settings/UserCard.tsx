import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Web3BioProfile } from "@/services/settings/types";
import CopyAddress from "@/components/CopyAddress";
import { FollowButton } from "./FollowButton";

interface UserCardProps {
  user: Web3BioProfile;
  following: boolean;
}

export function UserCard({ user, following }: UserCardProps) {
  const nameInitials = user.displayName?.slice(0, 2).toUpperCase();

  return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback className="bg-primary/60 text-primary-foreground">
              {nameInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user.displayName}</span>
            <CopyAddress address={user.address} size="small" />
          </div>
        </div>
        <FollowButton address={user.address} following={following} />
      </div>
  );
} 