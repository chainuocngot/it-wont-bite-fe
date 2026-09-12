import { useQuery } from '@tanstack/react-query';

import oauthApiRequests from '@/api-requests/oauth';

export const useGetGoogleAuthorizeUrlQuery = () => {
  return useQuery({
    queryKey: ['GetGoogleAuthorizeUrl'],
    queryFn: () => oauthApiRequests.cGetGoogleAuthorizeUrl(),
    enabled: false,
  });
};
