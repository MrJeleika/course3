import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '../utils';

import { apiClient } from '@/lib/fetcher';

export type ChangeGrade = {
  examId: number;
  studentId: number;
  gradeId?: number;
  grade: number;
};

export const useChangeGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: ChangeGrade) {
      const client = apiClient();

      await post(client, `/api/grades`, data);
    },
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};
