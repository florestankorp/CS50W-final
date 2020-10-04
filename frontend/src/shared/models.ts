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
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserAuthInput | null;
}

export interface UserAuthInput {
    email: string;
    password: string;
    passwordConf: string;
}
