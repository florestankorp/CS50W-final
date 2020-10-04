import { Session } from './models';
export const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/; // tslint:disable-line:max-line-length
export const UPLOAD_APP_KEY = 'uploadApp';
export const initialSession: Session = {
    auth: { isLoggedIn: false },
};
