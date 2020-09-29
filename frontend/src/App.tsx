import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { PrivateRoute } from './features/common/PrivateRoute';
import { Favs } from './features/Favs';
import { Home } from './features/Home';
import { Navbar } from './features/nav/Navbar';
import { Uploader } from './features/uploader/Uploader';
import { initialSession, UPLOAD_APP_KEY } from './shared/constants';

function App() {
    // instantiate session storage if there are no values yet
    const _sessionStorage = JSON.parse(sessionStorage.getItem(UPLOAD_APP_KEY) || '{}');
    if (!Object.keys(_sessionStorage).length) {
        sessionStorage.setItem(UPLOAD_APP_KEY, JSON.stringify(initialSession));
    }

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
