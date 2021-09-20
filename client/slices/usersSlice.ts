import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  CreateUserParams,
  UpdateUserParams,
  UserService
} from '@services/UserService';
import { RootState } from 'store';
import { User } from 'types';

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user._id
});

const extraInitialState = {
  query: '',
  isLoading: false,
  pageSize: 0,
  canFetchMore: true
};

const initialState = usersAdapter.getInitialState(extraInitialState);

export const searchUsers = createAsyncThunk<User[], { query: string }>(
  'users/search',
  async ({ query }, { dispatch }) => {
    const users = await UserService.searchUsers({ query, index: 0 });

    dispatch(usersSlice.actions.setQuery(query));

    return users;
  }
);

export const loadMoreUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>('users/loadMore', async (_, { getState }) => {
  const {
    users: { query, canFetchMore, pageSize }
  } = getState();

  if (!canFetchMore) throw new Error('Cannot fetch more');

  const users = await UserService.searchUsers({ query, index: pageSize + 1 });

  return users;
});

export const deleteUser = createAsyncThunk<void, { id: string }>(
  'users/delete',
  async ({ id }) => {
    await UserService.deleteUser(id);
  }
);

export const updateUser = createAsyncThunk<
  void,
  { id: string; params: UpdateUserParams }
>('users/update', async ({ id, params }) => {
  await UserService.updateUser(id, params);
});

export const createUser = createAsyncThunk<User, CreateUserParams>(
  'users/create',
  async (params) => {
    const { user } = await UserService.createUser(params);
    return user;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clear: () => usersAdapter.getInitialState(extraInitialState)
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pageSize = 1;
      state.canFetchMore = action.payload.length === 20;

      usersAdapter.setAll(state, action.payload);
    });
    builder.addCase(searchUsers.rejected, (state) => {
      state.isLoading = false;
      state.canFetchMore = false;
    });

    builder.addCase(loadMoreUsers.pending, (state) => {
      state.isLoading = true;
      state.pageSize++;
    });

    builder.addCase(loadMoreUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.canFetchMore = action.payload.length === 20;

      usersAdapter.addMany(state, action.payload);
    });

    builder.addCase(loadMoreUsers.rejected, (state) => {
      state.isLoading = false;
      state.canFetchMore = false;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.meta.arg.id);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { id, params } = action.meta.arg;
      usersAdapter.updateOne(state, { id, changes: params });
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload);
    });
  }
});

const { selectIds, selectById } = usersAdapter.getSelectors();

export const selectUserById = (state: RootState, id: string) =>
  selectById(state.users, id);

export const selectUserIds = (state: RootState) => selectIds(state.users);

export const { clear: clearUserSlice } = usersSlice.actions;

export const { reducer } = usersSlice;
