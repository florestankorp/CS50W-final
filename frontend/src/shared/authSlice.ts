import { createSlice } from '@reduxjs/toolkit';
import { initialSession, UPLOAD_APP_KEY } from './constants';
import { AuthState, Session } from './models';
import { RootState } from './store';

const initialState: AuthState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        init: (state) => {
            const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            if (!!Object.keys(_sessionStorage).length) {
                state.isAuthenticated = !!_sessionStorage.auth.isLoggedIn;
            } else {
                sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
                state.isAuthenticated = false;
            }
        },
        login: (state) => {
            let _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            _sessionStorage.auth.isLoggedIn = true;
            state.isAuthenticated = true;
            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
        register: (state) => {
            let _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');

            _sessionStorage.auth.isLoggedIn = true;
            state.isAuthenticated = true;
            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
    },
});

export const { login, init, register } = authSlice.actions;
export const selectAuthLoginState = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoadingState = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
