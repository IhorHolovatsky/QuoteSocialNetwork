import * as firebase from 'firebase/app';
export class User implements firebase.UserInfo {
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
    firstName: string;
    lastName : string;
    email: string;

    getDisplayName() {
        return `${this.firstName} ${this.lastName}`;
    }
}