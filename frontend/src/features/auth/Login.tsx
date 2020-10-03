import React from 'react';
import { Link } from 'react-router-dom';

export function Login() {
    return (
        <form action="" method="post">
            <div className="columns is-centered">
                <div className="column is-one-quarter">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="email" placeholder="Email" />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input className="input" type="password" placeholder="Password" />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-success">Login</button>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            No account yet? <Link to="/register">Register!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
