import { RouteProps } from 'react-router';

export type Base64EncodedImage = string | ArrayBuffer | null;
export type PrivateRouteProps = {
    component: React.ComponentType<RouteProps>;
    path: string;
};

export type Session = {
    auth: {
        isAuthenticated: boolean;
        token?: string;
        username?: string;
    };
};

export interface AuthState {
    token: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
    username: string;
}

export interface UserAuthInput {
    username: string;
    password: string;
    passwordConf: string;
}
