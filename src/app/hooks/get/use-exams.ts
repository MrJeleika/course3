import { useQuery } from '@tanstack/react-query';

import { get } from '../utils';

import { Exam } from '@/app/database/entities/exam.entity';
import { apiClient } from '@/lib/fetcher';

export const useExams = () => {
  return useQuery({
    queryKey: ['exams'],
    async queryFn() {
      const client = apiClient();

      return await get<Exam[]>(client, '/api/exams');
    },
  });
};
