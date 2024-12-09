import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '../utils';

import { apiClient } from '@/lib/fetcher';

export type AddExamData = {
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
    async mutationFn(data: AddExamData) {
      const client = apiClient();
      console.log(data);

      await post(client, `/api/exams`, data);
    },
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
  });
};
