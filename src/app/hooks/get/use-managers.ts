import { useQuery } from '@tanstack/react-query';

import { get } from '../utils';

import { Employee } from '@/app/database/entities/employee.entity';
import { apiClient } from '@/lib/fetcher';

export const useManagers = () => {
  return useQuery({
    queryKey: ['managers'],
    async queryFn() {
      const client = apiClient();

      return await get<Employee[]>(client, '/api/employees');
    },
  });
};
