import { Session } from './models';

export const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/i;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/i;
export const UPLOAD_APP_KEY = 'uploadApp';
export const initialSession: Session = {
    auth: { isAuthenticated: false },
};

export const REGISTER_URL = 'http://localhost:8000/api/auth/register';
export const LOGIN_URL = 'http://localhost:8000/api/auth/login';
export const LIST_URL = 'http://localhost:8000/list/';
export const TYPE_ERROR = 'Failed to fetch';
