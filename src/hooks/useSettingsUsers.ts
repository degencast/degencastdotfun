import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecommendedUsers, getFollowingUsers, followUser, unfollowUser } from '@/services/settings/api';
import { Web3BioProfile } from '@/services/settings/types';

export function useRecommendedUsers() {
  return useQuery<Web3BioProfile[], Error>({
    queryKey: ['recommendedUsers'],
    queryFn: async () => {
      const response = await getRecommendedUsers();
      return response.data.data;
    },
  });
}

export function useFollowingUsers(userId: string | undefined) {
  return useQuery<Web3BioProfile[], Error>({
    queryKey: ['followingUsers', userId],
    queryFn: async () => {
      const response = await getFollowingUsers();
      return response.data.data;
    },
    enabled: !!userId,
    initialData: [],
  });
}

export function useFollowUser(userId: string | undefined) {
  const queryClient = useQueryClient();
  const mutation = useMutation<Web3BioProfile[], Error, string>({
    mutationFn: async (targetAddress: string) => {
      const response = await followUser({ address: targetAddress });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendedUsers'] });
      queryClient.invalidateQueries({ queryKey: ['followingUsers', userId] });
    },
  });

  if (!userId) {
    return { mutate: () => {}, isLoading: false } as const;
  }

  return { mutate: mutation.mutate, isLoading: mutation.isPending } as const;
}

export function useUnfollowUser(userId: string | undefined) {
  const queryClient = useQueryClient();
  const mutation = useMutation<Web3BioProfile[], Error, string>({
    mutationFn: async (targetAddress: string) => {
      const response = await unfollowUser({ address: targetAddress });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendedUsers'] });
      queryClient.invalidateQueries({ queryKey: ['followingUsers', userId] });
    },
  });

  if (!userId) {
    return { mutate: () => {}, isLoading: false } as const;
  }

  return { mutate: mutation.mutate, isLoading: mutation.isPending } as const;
} 