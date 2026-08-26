import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import userApiRequests from '@/api-requests/user';
import { UserType } from '@/schemas/models/user.model';
import { UpdateMeBodyType } from '@/schemas/user';

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: () => userApiRequests.cGetMe(),
  });
};

export const useUpdateMeMutation = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ userId, body }: { userId: UserType['id']; body: UpdateMeBodyType }) =>
      userApiRequests.cUpdateMe(userId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['getMe'] });
    },
  });
};
