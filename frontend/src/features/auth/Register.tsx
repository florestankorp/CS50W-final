import React from 'react';
import { useForm } from 'react-hook-form';
type Inputs = {
    email: string;
    password: string;
    passwordConf: string;
};
export function Register() {
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="columns is-centered">
                <div className="column is-one-quarter">
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                name="email"
                                placeholder="Email"
                                ref={register({ required: true })}
                            />
                            {errors.email && <span>This field is required</span>}
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                name="password"
                                type="password"
                                placeholder="Password"
                                ref={register({ required: true })}
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                name="passwordConf"
                                type="password"
                                placeholder="Confirm Password"
                                ref={register({ required: true })}
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input className="button is-success" type="submit" value="Register" />
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
