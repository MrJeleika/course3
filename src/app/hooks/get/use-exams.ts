import { useQuery } from '@tanstack/react-query';

import { get } from '../utils';

import { Campaign } from '@/app/database/entities/campaign.entity';
import { apiClient } from '@/lib/fetcher';

export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    async queryFn() {
      const client = apiClient();

      return await get<(Campaign & { clients?: string[] })[]>(
        client,
        '/api/campaigns',
      );
    },
  });
};
