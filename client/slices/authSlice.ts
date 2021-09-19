import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@services/AuthService';
import { LocalStorageService } from '@services/LocalStorageService';
import { RootState } from 'store';
import { User } from 'types';

interface State {
  user: User | null;
  initialized: boolean;
}

const initialState: State = {
  user: null,
  initialized: false
};

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const token = await LocalStorageService.LoadObj('TOKEN');

  if (!token) return null;

  const { user } = await AuthService.getProfile();

  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.user = action.payload;

      state.initialized = true;
    });

    builder.addCase(initializeAuth.rejected, (state) => {
      state.initialized = true;
    });
  }
});

export const selectUser = (state: RootState) => state.auth.user;

export const { logout, setUser } = authSlice.actions;

export const { reducer } = authSlice;
