import { RouteProps } from 'react-router';

export type Base64EncodedImage = string | ArrayBuffer | null;
export type PrivateRouteProps = {
    component: React.ComponentType<RouteProps>;
    path: string;
};

export type Session = {
    auth: {
        isLoggedIn: boolean;
    };
};

export interface AuthState {
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    errors: string[];
    email: string;
}

export interface UserAuthInput {
    email: string;
    password: string;
    passwordConf: string;
}
