import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import imageReducer from './imageSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        image: imageReducer,
    },
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
