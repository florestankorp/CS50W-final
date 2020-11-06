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

export interface ImageState {
    images: Image[];
    isLoading: boolean;
    error: string;
}

export interface UserAuthInput {
    username: string;
    password: string;
    passwordConf: string;
}

export interface Image {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    url: string;
    secure_url: string;
    tags: string[];
}

export interface ImageProp {
    image: Image;
    key: number;
}
