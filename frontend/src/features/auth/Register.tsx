import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    authCall,
    clearAuthError,
    selectAuthError,
    selectAuthLoadingState,
    selectAuthLoginState,
} from '../../shared/authSlice';
import { EMAIL_REGEX, REGISTER_URL } from '../../shared/constants';
import { UserAuthInput } from '../../shared/models';
import Spinner from '../../spinner.svg';
import './Auth.scss';

export function Register() {
    const { register, handleSubmit, errors, watch, reset } = useForm<UserAuthInput>({ reValidateMode: 'onSubmit' });
    const passwordRef = useRef({});
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAuthLoadingState);
    const authError = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectAuthLoginState);
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    passwordRef.current = watch('password', '');

    const onSubmit: any = (data) => {
        dispatch(clearAuthError());
        dispatch(authCall(data, REGISTER_URL));
        reset();
    };

    return (
        <section className="section">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-centered">
                    <div className="column is-one-quarter">
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    name="username"
                                    placeholder="Email"
                                    ref={register({
                                        required: 'Email is required',
                                        pattern: {
                                            value: EMAIL_REGEX,
                                            message: 'Please enter a valid email address.',
                                        },
                                    })}
                                />
                                {errors.username && errors.username.message}
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    ref={register({
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password has to be at least 8 characters long',
                                        },
                                    })}
                                />
                                {errors.password && errors.password.message}
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    name="passwordConf"
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={register({
                                        validate: (value) => value === passwordRef.current || 'Passwords do not match',
                                        required: 'Password confirmation is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password has to be at least 8 characters long',
                                        },
                                    })}
                                />
                                {errors.passwordConf && errors.passwordConf.message}
                            </p>
                        </div>
                        <div className="field">
                            <p className="control button-control">
                                <input className="button is-success" type="submit" value="Register" />
                                {isLoading && <img src={Spinner} alt="Loading Spinner" />}
                            </p>
                        </div>
                        {authError && <span>{authError}</span>}
                    </div>
                </div>
            </form>
        </section>
    );
}
