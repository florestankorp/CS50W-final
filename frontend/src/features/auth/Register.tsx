import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';

export function Register() {
    const dispatch = useDispatch();
    // const isAuthenticated = useSelector(selectAuthLoginState);
    // const isLoading = useSelector(selectAuthLoadingState);

    return (
        <button aria-label="Register user" onClick={() => dispatch(login())}>
            Register
        </button>
    );
}
