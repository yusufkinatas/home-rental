import { apiClient } from './apiClient';
import { User, UserRole } from 'types';
import { stringifyUrl } from 'query-string';

export interface CreateUserParams {
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
}

interface CreateUserResponse {
  token: string;
  user: User;
}

export interface UpdateUserParams {
  email?: string;
  fullName?: string;
}

export class UserService {
  public static getUsers = {
    getKey: (
      pageIndex: number,
      previousPageData: User[] | null,
      query?: string
    ) => {
      if (previousPageData && !previousPageData.length) return null;

      const limit = 10;

      return stringifyUrl(
        {
          url: '/search/user',
          query: {
            limit,
            index: pageIndex,
            query
          }
        },
        { skipEmptyString: true, skipNull: true }
      );
    }
  };

  public static createUser = async (params: CreateUserParams) => {
    const { data } = await apiClient.post<CreateUserResponse>('/user', params);

    return data;
  };

  public static updateUser = async (id: string, params: UpdateUserParams) => {
    const { data } = await apiClient.put<User>(`/user/${id}`, params);

    return data;
  };

  public static deleteUser = async (id: string) => {
    const { data } = await apiClient.delete<User>(`/user/${id}`);

    return data;
  };
}
