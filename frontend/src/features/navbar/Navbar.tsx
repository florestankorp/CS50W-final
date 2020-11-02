import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut, selectAuthLoginState } from '../../shared/store/authSlice';
import './Navbar.scss';
export function Navbar() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthLoginState);

    const handleLogOut = (e) => {
        dispatch(logOut());
    };

    return (
        <nav className="navbar is-fixed-top is-dark">
            <div className="navbar-menu">
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
                {!isAuthenticated && (
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/login">
                            Login
                        </Link>
                        <Link className="navbar-item" to="/register">
                            Register
                        </Link>
                    </div>
                )}
                {isAuthenticated && (
                    <div className="navbar-end">
                        <Link className="navbar-item" onClick={handleLogOut} to="#">
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
