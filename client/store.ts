import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from '@slices/authSlice';
import { reducer as usersReducer } from '@slices/usersSlice';
import { reducer as apartmentsReducer } from '@slices/apartmentsSlice';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  level: { prevState: false, nextState: false }
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    apartments: apartmentsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
