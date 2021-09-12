import { apiClient } from './apiClient';
import { stringifyUrl } from 'query-string';
import { User } from 'types';

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

interface GetProfileResponse {
  user: User;
}

export class AuthService {
  public static signIn = async (params: SignInParams) => {
    const url = stringifyUrl({
      url: '/auth/login',
      query: { ...params }
    });

    const { data } = await apiClient.get<SignInResponse>(url);

    return data;
  };

  public static getProfile = async () => {
    const { data } = await apiClient.get<GetProfileResponse>('/auth/profile');

    return data;
  };
}
