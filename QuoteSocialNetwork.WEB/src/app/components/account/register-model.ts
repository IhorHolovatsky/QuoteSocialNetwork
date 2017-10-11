import { User } from './user';

export class RegisterModel extends User {
    password: string;
    confirmPassword: string;
}