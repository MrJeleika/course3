import { useQuery } from '@tanstack/react-query';

import { get } from '../utils';

import { Subject } from '@/app/database/entities/subject.entity';
import { apiClient } from '@/lib/fetcher';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    retry: false,
    async queryFn() {
      const client = apiClient();

      return await get<Subject[]>(client, '/api/subjects');
    },
  });
};
