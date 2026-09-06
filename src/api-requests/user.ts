import http from '@/lib/http';
import { UserType } from '@/schemas/models/user';
import {
  GetMeResType,
  GetUserByUsernameResType,
  UpdateMeBodyType,
  UpdateMeResType,
} from '@/schemas/user';

const userApiRequests = {
  // Get Me
  cGetMe: () =>
    http.get<GetMeResType>('/api/proxy/users', {
      toNextServer: true,
    }),
  sGetMe: () => http.get<GetMeResType>('/users'),

  // Get User By Username
  sGetUserByUsername: (username: UserType['username']) =>
    http.get<GetUserByUsernameResType>(`/users/${username}`),

  // Update Me
  cUpdateMe: (userId: UserType['id'], body: UpdateMeBodyType) =>
    http.patch<UpdateMeResType>(`/api/proxy/users/${userId}`, body, {
      toNextServer: true,
    }),
};

export default userApiRequests;
