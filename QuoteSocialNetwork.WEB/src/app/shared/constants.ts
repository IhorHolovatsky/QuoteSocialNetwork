export class Constants {

    static readonly TOKEN_STORAGE_NAME: string = 'auth_token';
    static readonly USER_STORAGE_NAME: string = 'user';


    static readonly FIREBASE_ERRORS: Map<string, string> = new Map<string, string>([
        ['EMAIL_NOT_FOUND', 'Невірний імейл!'],
        ['INVALID_PASSWORD', 'Невірний пароль!']
    ]);

    static readonly FIREBASE_ERRORS_CODES: Map<string, string> = new Map<string, string>([
        ['auth/user-not-found', 'Користувача з таким імейлом неіснує!'],
        ['auth/wrong-password', 'Невірний пароль!'],
        ['auth/invalid-email', 'Невірний формат імейлу!'],
        ['auth/email-already-in-use', 'Такий імейл вже використувається!']
    ]);

    // error messages
    static readonly ERROR_MESSAGE_RESOURCES = {
        email: {
            email: 'Invalid email format.',
            required: 'Email is required.',
        },
        password: {
            minlength: 'Password length should be minimum 6 characters.',
            required: 'Password is required.',
        },
        confirmPassword: {
            required: 'Confirm password is required.'
        },
        firstName: {
            required: 'First name is required.'
        },
        lastName: {
            required: 'Last name is required.'
        },
    };

}
