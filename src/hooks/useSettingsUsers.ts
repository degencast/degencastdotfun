import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecommendedUsers, getFollowingUsers, followUser } from '@/services/settings/api';
import { Web3BioProfile } from '@/services/settings/types';
import { ApiResp } from '@/services/types';
import { useAccount } from 'wagmi';

export function useRecommendedUsers() {
  const { address } = useAccount();
  return useQuery<Web3BioProfile[], Error>({
    queryKey: ['recommendedUsers', address],
    queryFn: async () => {
      const response = await getRecommendedUsers({ address: address || '' });
      return response.data.data;
    },
    // enabled: !!address,
  });
}

export function useFollowingUsers() {
  const { address } = useAccount();

  return useQuery<Web3BioProfile[], Error>({
    queryKey: ['followingUsers', address],
    queryFn: async () => {
      const response = await getFollowingUsers({ address: address || '' });
      return response.data.data;
    },
    enabled: !!address,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  return useMutation<Web3BioProfile[], Error, string>({
    mutationFn: async (targetAddress: string) => {
      const response = await followUser({ address: targetAddress });
      return response.data.data;
    },
    onSuccess: () => {
      // 更新推荐用户和关注用户的缓存
      queryClient.invalidateQueries({ queryKey: ['recommendedUsers', address] });
      queryClient.invalidateQueries({ queryKey: ['followingUsers', address] });
    },
  });
} 