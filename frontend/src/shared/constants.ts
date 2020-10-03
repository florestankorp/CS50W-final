import { Session } from './models';

export const UPLOAD_APP_KEY = 'uploadApp';
export const initialSession: Session = {
    auth: { isLoggedIn: false },
};
