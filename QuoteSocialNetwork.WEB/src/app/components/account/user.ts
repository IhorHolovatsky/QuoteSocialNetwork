export class User {
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    providers: Array<string> = [];
    uid: string;
    firstName: string;
    lastName: string;
    email: string;

    getDisplayName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
