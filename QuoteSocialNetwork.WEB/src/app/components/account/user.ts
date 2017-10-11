export class User {
    firstName : string;
    lastName : string;
    email: string;

    getDisplayName(){
        return `${this.firstName} ${this.lastName}`;
    }
}