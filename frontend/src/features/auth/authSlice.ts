import { createSlice } from '@reduxjs/toolkit';
import { UPLOAD_APP_KEY } from '../../shared/constants';
import { RootState } from '../../shared/store/store';

interface User {
    name: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            const _sessionStorage = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');

            state.isAuthenticated = true;
            sessionStorage.setItem(
                UPLOAD_APP_KEY,
                JSON.stringify({
                    ..._sessionStorage,
                    isLoggedIn: true,
                }),
            );
        },
        //         incrementByAmount: (state, action: PayloadAction<number>) => {
        //             state.value += action.payload;
        //         },
    },
});

// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

export const { login } = authSlice.actions;
export const selectAuthLoginState = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoadingState = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
