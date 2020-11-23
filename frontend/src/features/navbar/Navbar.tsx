import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOut, selectAuthLoginState } from '../../shared';
import './Navbar.scss';
export function Navbar(): ReactElement {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isActive, setisActive] = useState(false);

    const isAuthenticated = useSelector(selectAuthLoginState);

    const handleLogOut = () => {
        setisActive(!isActive);
        dispatch(logOut());
        history.push('/');
    };

    return (
        <nav className="navbar is-fixed-top">
            <div className="navbar-brand">
                <a
                    onClick={() => setisActive(!isActive)}
                    role="button"
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link onClick={() => setisActive(!isActive)} className="navbar-item" to="/">
                        Home
                    </Link>
                    <Link onClick={() => setisActive(!isActive)} className="navbar-item" to="/favs">
                        Favs
                    </Link>
                    <Link onClick={() => setisActive(!isActive)} className="navbar-item" to="/upload">
                        Upload
                    </Link>
                </div>
                {!isAuthenticated && (
                    <div className="navbar-end">
                        <Link onClick={() => setisActive(!isActive)} className="navbar-item" to="/login">
                            Login
                        </Link>
                        <Link onClick={() => setisActive(!isActive)} className="navbar-item" to="/register">
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
