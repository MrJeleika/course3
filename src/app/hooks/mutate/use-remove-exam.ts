import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteOperation } from '../utils';

import { apiClient } from '@/lib/fetcher';

export const useRemoveExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const client = apiClient();

      await deleteOperation(client, `/api/exams?id=${id}`);
    },
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
  });
};
