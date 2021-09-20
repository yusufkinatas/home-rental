import { apiClient } from './apiClient';
import { User, UserRole } from 'types';
import { stringifyUrl } from 'query-string';

export const USER_FETCH_LIMIT = 20;

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

interface SearchUserParams {
  index: number;
  query: string;
}

export class UserService {
  public static searchUsers = async ({ query, index }: SearchUserParams) => {
    const url = stringifyUrl(
      {
        url: '/search/user',
        query: {
          limit: USER_FETCH_LIMIT,
          index,
          query
        }
      },
      { skipEmptyString: true, skipNull: true }
    );

    const { data } = await apiClient.get<User[]>(url);

    return data;
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
