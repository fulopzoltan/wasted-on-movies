import { User } from './User';

export type LocalStorage = {
    user: User | null;
    token: string;
    loggedIn: boolean;
};
