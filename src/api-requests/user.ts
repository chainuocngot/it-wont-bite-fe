import http from '@/lib/http';
import { GetMeResType } from '@/schemas/user';

const userApiRequests = {
  cGetMe: () =>
    http.get<GetMeResType>('/api/proxy/users', {
      toNextServer: true,
    }),
  sGetMe: () => http.get<GetMeResType>('/users'),
};

export default userApiRequests;
