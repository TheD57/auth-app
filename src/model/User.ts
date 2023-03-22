
class User {
    public _id: string;
    public _email: string;
    public _firstName: string;
    public _lastName: string;

    constructor(id: string, email: string, firstName: string,lastName : string, password: string) {
        this._id = id;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get id(): string { return this._id; }
    get email(): string { return this._email; }
    set email(email: string) { this._email = email; }
    get firstName(): string { return this._firstName; }
    set firstName(name: string) { this._firstName = name; }
    get lastName(): string { return this._lastName; }
    set lastName(name: string) { this._lastName = name; }

}
export default User;