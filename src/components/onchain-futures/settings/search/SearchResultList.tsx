import { SearchError, SearchResult } from "@/services/settings/search/types";
import { UserCard } from "../UserCard";
import { useFollowingUsers } from "@/hooks/useSettingsUsers";
import { usePrivy } from "@privy-io/react-auth";

interface SearchResultListProps {
  results: SearchResult[] | SearchError;
  loading: boolean;
}

export function SearchResultList({
  results,
  loading,
}: SearchResultListProps) {
  const { user } = usePrivy();
  const { data: followingUsers, isLoading: isLoadingFollowing } = useFollowingUsers(user?.id);
  // 检查用户是否已关注
  const isFollowing = (user: SearchResult) => {
    return followingUsers?.some(following => following.address === user.address) ?? false;
  };
  
  if (loading) {
    return (
      <div className="absolute z-10 w-full mt-2 bg-white border-4 border-primary rounded-xl p-2">
        <div className="p-4 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if ((results as SearchError)?.error) {
    return (
      <div className="absolute z-10 w-full mt-2 bg-white border-4 border-primary rounded-xl p-2">
        <div className="p-4 text-center text-muted-foreground">
          No results found
        </div>
      </div>
    );
  }
  if (Array.isArray(results)) {
    if (results.length === 0) {
      return (
        <div className="absolute z-10 w-full mt-2 bg-white border-4 border-primary rounded-xl p-2">
          <div className="p-4 text-center text-muted-foreground">
            No results found
          </div>
        </div>
      );
    }
    return (
      <div className="absolute z-10 w-full mt-2 bg-white border-4 border-primary rounded-xl p-2">
        <div className="flex flex-col gap-4 p-2">
          {results.map((result) => (
            <UserCard key={result.address} user={result} following={isFollowing(result)} />
          ))}
        </div>
      </div>
    );
  }
}
