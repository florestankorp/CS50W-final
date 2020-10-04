import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerCall, selectAuthLoadingState } from '../../shared/authSlice';
import { EMAIL_REGEX } from '../../shared/constants';
import { UserAuthInput } from '../../shared/models';
import Spinner from '../../spinner.svg';

export function Register() {
    const { register, handleSubmit, errors, watch } = useForm<UserAuthInput>({ reValidateMode: 'onSubmit' });
    const passwordRef = useRef({});
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAuthLoadingState);

    passwordRef.current = watch('password', '');

    const onSubmit: any = (data) => {
        return dispatch(registerCall());
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
                                    name="email"
                                    placeholder="Email"
                                    ref={register({
                                        required: 'Email is required',
                                        pattern: {
                                            value: EMAIL_REGEX,
                                            message: 'Please enter a valid email address.',
                                        },
                                    })}
                                />
                                {errors.email && errors.email.message}
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
                                        // minLength: {
                                        //     value: 8,
                                        //     message: 'Password has to be at least 8 characters long',
                                        // },
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
                                        // minLength: {
                                        //     value: 8,
                                        //     message: 'Password has to be at least 8 characters long',
                                        // },
                                    })}
                                />
                                {errors.passwordConf && errors.passwordConf.message}
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input className="button is-success" type="submit" value="Register" />
                            </p>
                        </div>
                        {isLoading && <img src={Spinner} alt="Loading Spinner" />}
                    </div>
                </div>
            </form>
        </section>
    );
}
