import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '../utils';

import { apiClient } from '@/lib/fetcher';

export type CreateCampaignData = {
  managerId: number;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  clients: string;
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: CreateCampaignData) {
      const client = apiClient();

      await post(client, `/api/campaigns`, data);
    },
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};
