import http from '@/lib/http';
import { GetGoogleAuthorizeUrlResType } from '@/schemas/oauth';

const oauthApiRequests = {
  cGetGoogleAuthorizeUrl: () =>
    http.get<GetGoogleAuthorizeUrlResType>('/api/proxy/oauth/google', {
      toNextServer: true,
    }),
};

export default oauthApiRequests;
