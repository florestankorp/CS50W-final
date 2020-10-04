import { createSlice } from '@reduxjs/toolkit';
import { initialSession, UPLOAD_APP_KEY } from './constants';
import { AuthState, Session } from './models';
import { RootState } from './store';

const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    errors: [],
    email: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authInit: (state) => {
            const _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            if (!!Object.keys(_sessionStorage).length) {
                state.isAuthenticated = !!_sessionStorage.auth.isLoggedIn;
            } else {
                state.isAuthenticated = false;
                sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
            }
        },
        authRegister: (state) => {
            state.isLoading = true;
            // state.isAuthenticated = true;

            // let _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            // _sessionStorage.auth.isLoggedIn = true;
            // sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
        authRegisterSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = payload.token;
            console.log('authRegisterSuccess', payload);

            // let _sessionStorage: Session = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
            // _sessionStorage.auth.isLoggedIn = true;
            // sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(_sessionStorage));
        },
        authRegisterFailure: (state, { payload }) => {
            const key = Object.keys(payload)[0];
            const message = payload[key][0];
            state.errors.push(message);
        },
    },
});

export const { authInit, authRegister, authRegisterFailure, authRegisterSuccess } = authSlice.actions;
export const selectAuthLoginState = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoadingState = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthEmail = (state: RootState) => state.auth.email;
export const selectAuthErrors = (state: RootState) => state.auth.errors;

export default authSlice.reducer;

export function registerCall() {
    return async (dispatch) => {
        dispatch(authRegister());

        const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'flo@hogwarts.com', password: '123' }),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(authRegisterSuccess(data));
        } else {
            dispatch(authRegisterFailure(data));
        }
    };
}
