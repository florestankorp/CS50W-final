import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { Favs } from './features/Favs';
import { Home } from './features/Home';
import { Navbar } from './features/Navbar';
import { Uploader } from './features/uploader/Uploader';
import { init } from './shared/authSlice';
import { PrivateRoute } from './shared/PrivateRoute';

function App() {
    const dispatch = useDispatch();
    dispatch(init());

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
