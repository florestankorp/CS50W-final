import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { PrivateRouteProps } from '../../shared/models';
import Spinner from '../../spinner.svg';
import { selectAuthLoadingState, selectAuthLoginState } from '../auth/authSlice';

export function PrivateRoute(props: PrivateRouteProps): ReactElement {
    const { component: Component, ...rest } = props;
    const isAuthenticated = useSelector(selectAuthLoginState);
    const isLoading = useSelector(selectAuthLoadingState);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <img src={Spinner} alt="Loading Spinner" />;
                }

                if (!isAuthenticated) {
                    return <Redirect to="/login" />;
                }

                return <Component {...props} />;
            }}
        />
    );
}
