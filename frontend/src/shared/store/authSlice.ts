import { createSlice } from '@reduxjs/toolkit';
import { initialSession, TYPE_ERROR, UPLOAD_APP_KEY } from '../constants';
import { AuthState, Session, UserAuthInput } from '../models';
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
        logOut: (state: AuthState) => {
            sessionStorage.clear();
            Object.assign(state, initialState);
            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
        },
        authInit: (state: AuthState) => {
            const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            if (Object.keys(_sessionStorage).length) {
                state.token = _sessionStorage.auth.token || '';
                state.isAuthenticated = !!_sessionStorage.auth.isAuthenticated;
                state.username = _sessionStorage.auth.username || '';
            } else {
                state.isAuthenticated = false;
                sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
            }
        },
        authStart: (state: AuthState) => {
            state.isLoading = true;
        },
        clearAuthError: (state: AuthState) => {
            state.error = '';
        },
        authSuccess: (state: AuthState, { payload }) => {
            const {
                token,
                user: { username },
            } = payload;
            const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');

            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = token;
            state.username = username;

            _sessionStorage.auth.isAuthenticated = true;
            _sessionStorage.auth.token = token;
            _sessionStorage.auth.username = username;

            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
        authFailure: (state: AuthState, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = false;

            const message = payload === TYPE_ERROR ? 'Server offline. Please try again later' : payload;
            state.error = message;

            sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
        },
    },
});

export const { authInit, authStart, authFailure, authSuccess, clearAuthError, logOut } = authSlice.actions;

export const selectAuthLoginState = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectAuthLoadingState = (state: RootState): boolean => state.auth.isLoading;
export const selectAuthToken = (state: RootState): string => state.auth.token;
export const selectAuthUsername = (state: RootState): string => state.auth.username;
export const selectAuthError = (state: RootState): string => state.auth.error;

export default authSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function authCall(data: UserAuthInput, url: string) {
    const { username, password } = data;

    return async (dispatch): Promise<void> => {
        dispatch(authStart());
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(authSuccess(data));
            } else {
                const key = Object.keys(data)[0];
                const message = data[key] ? data[key][0] : response.statusText;
                throw Error(message);
            }
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    };
}
