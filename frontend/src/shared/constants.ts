import { Session } from './models';

export const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/i;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/i;
export const UPLOAD_APP_KEY = 'uploadApp';
export const initialSession: Session = {
    auth: { isAuthenticated: false },
};
export const TAGS = {
    FAV: 'fav',
    RATE_1: 'rate:1',
    RATE_2: 'rate:2',
    RATE_3: 'rate:3',
    RATE_4: 'rate:4',
    RATE_5: 'rate:5',
};

export const COLORS = {
    GOLD: '#FF9529',
    BLUE: '#1A8CC9',
};

const API_BASE_URL = 'http://localhost:8001';

export const REGISTER_URL = `${API_BASE_URL}/api/auth/register`;
export const LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
export const UPLOAD_URL = `${API_BASE_URL}/upload`;
export const LIST_URL = `${API_BASE_URL}/list`;
export const TAG_URL = `${API_BASE_URL}/tag`;
export const DELETE_URL = `${API_BASE_URL}/delete`;
export const TYPE_ERROR = 'Failed to fetch';
