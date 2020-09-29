import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
