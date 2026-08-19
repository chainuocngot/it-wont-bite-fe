import { useQuery } from '@tanstack/react-query';

import userApiRequests from '@/api-requests/user';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: () => userApiRequests.cGetMe(),
  });
};
