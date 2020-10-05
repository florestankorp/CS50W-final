import { createSlice } from '@reduxjs/toolkit';
import { initialSession, UPLOAD_APP_KEY } from './constants';
import { AuthState, Session, UserAuthInput } from './models';
import { RootState } from './store';
const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');

const initialState: AuthState = {
    token: (_sessionStorage.auth && _sessionStorage.auth.token) || '',
    isAuthenticated: (_sessionStorage.auth && _sessionStorage.auth.isAuthenticated) || false,
    username: (_sessionStorage.auth && _sessionStorage.auth.username) || '',
    isLoading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authInit: (state) => {
            const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            if (!!Object.keys(_sessionStorage).length) {
                state.token = _sessionStorage.auth.token || '';
                state.isAuthenticated = !!_sessionStorage.auth.isAuthenticated;
                state.username = _sessionStorage.auth.username || '';
            } else {
                state.isAuthenticated = false;
                sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
            }
        },
        authStart: (state) => {
            state.isLoading = true;
        },
        clearAuthError: (state) => {
            state.error = '';
        },
        authSuccess: (state: AuthState, { payload }) => {
            const {
                token,
                user: { username },
            } = payload;
            let _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');

            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = token;
            state.username = username;

            _sessionStorage.auth.isAuthenticated = true;
            _sessionStorage.auth.token = token;
            _sessionStorage.auth.username = username;

            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
        authFailure: (state, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = false;

            const key = Object.keys(payload)[0];
            const message = payload[key][0];
            state.error = message;

            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
        },
    },
});

export const { authInit, authStart, authFailure, authSuccess, clearAuthError } = authSlice.actions;
export const selectAuthLoginState = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoadingState = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUsername = (state: RootState) => state.auth.username;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

export function authCall(data: UserAuthInput, url: string) {
    const { username, password } = data;

    return async (dispatch) => {
        dispatch(authStart());

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(authSuccess(data));
        } else {
            dispatch(authFailure(data));
        }
    };
}
