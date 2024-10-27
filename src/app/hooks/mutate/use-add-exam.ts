import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '../utils';

import { apiClient } from '@/lib/fetcher';

export type AddExamData = {
  subjectId: number;
  time: string;
  date: string;
};

export const useAddExam = () => {
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
