import { useQuery } from '@tanstack/react-query';

import { get } from '../utils';

import { Student } from '@/app/database/entities/student.entity';
import { apiClient } from '@/lib/fetcher';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    retry: false,
    async queryFn() {
      const client = apiClient();

      return await get<Student[]>(client, '/api/students');
    },
  });
};
