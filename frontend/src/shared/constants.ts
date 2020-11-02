import { Session } from './models';

export const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/i;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/i;
export const UPLOAD_APP_KEY = 'uploadApp';
export const initialSession: Session = {
    auth: { isAuthenticated: false },
};

const API_BASE_URL = 'http://localhost:8001';

export const REGISTER_URL = `${API_BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
export const UPLOAD_URL = `${API_BASE_URL}/upload`;
export const LIST_URL = `${API_BASE_URL}/list`;
export const LIKE_URL = `${API_BASE_URL}/like`;
export const TYPE_ERROR = 'Failed to fetch';
