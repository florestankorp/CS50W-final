import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Favs, Home, Login, Navbar, Register, Uploader } from './features';
import { authInit, PrivateRoute } from './shared';

function App(): ReactElement {
    const dispatch = useDispatch();
    document.body.classList.add('has-navbar-fixed-top');
    dispatch(authInit());

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route component={Register} exact path="/register" />
                    <Route component={Login} exact path="/login" />
                    <PrivateRoute component={Uploader} path="/upload" />
                    <PrivateRoute component={Favs} path="/favs" />
                    <PrivateRoute component={Home} path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
