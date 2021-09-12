import {
  CreateUserParams,
  UpdateUserParams,
  UserService
} from '@services/UserService';
import useSWRInfinite from 'swr/infinite';
import { User } from 'types';

export const useUsers = (query?: string) => {
  const { data, isValidating, setSize, size, mutate } = useSWRInfinite<User[]>(
    (index, previousPageData) =>
      UserService.getUsers.getKey(index, previousPageData, query)
  );

  const loadMoreUsers = () => setSize(size + 1);

  const users = data?.flat() || [];

  const deleteUser = async (id: string) => {
    await UserService.deleteUser(id);

    mutate();
  };

  const createUser = async (params: CreateUserParams) => {
    await UserService.createUser(params);

    mutate();
  };

  const updateUser = async (id: string, params: UpdateUserParams) => {
    await UserService.updateUser(id, params);

    mutate();
  };

  return {
    users,
    isLoading: isValidating,
    loadMoreUsers,
    deleteUser,
    createUser,
    updateUser
  };
};
