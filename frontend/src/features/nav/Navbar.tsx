import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar is-dark">
            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/favs">
                        Favs
                    </Link>
                    <Link className="navbar-item" to="/upload">
                        Upload
                    </Link>
                </div>
                <div className="navbar-end">
                    <a className="navbar-item" href="/login">
                        Login
                    </a>
                    <a className="navbar-item" href="/register">
                        Register
                    </a>
                </div>
            </div>
        </nav>
    );
}
