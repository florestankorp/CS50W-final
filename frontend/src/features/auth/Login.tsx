import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { authCall, clearAuthError, selectAuthError, selectAuthLoadingState } from '../../shared/authSlice';
import { EMAIL_REGEX, LOGIN_URL } from '../../shared/constants';
import { UserAuthInput } from '../../shared/models';
import Spinner from '../../spinner.svg';

export function Login() {
    const { register, handleSubmit, errors, watch, reset } = useForm<UserAuthInput>({ reValidateMode: 'onSubmit' });
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAuthLoadingState);
    const authError = useSelector(selectAuthError);

    const onSubmit: any = (data) => {
        dispatch(clearAuthError());
        dispatch(authCall(data, LOGIN_URL));
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
                                    })}
                                />
                                {errors.password && errors.password.message}
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input className="button is-success" type="submit" value="Register" />
                            </p>
                        </div>
                        {isLoading && <img src={Spinner} alt="Loading Spinner" />}
                        {authError && <span>{authError}</span>}
                    </div>
                </div>
            </form>
        </section>
    );
}
