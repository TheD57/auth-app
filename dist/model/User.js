"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, email, firstName, lastName, password) {
        this._id = id;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
    }
    get id() { return this._id; }
    get email() { return this._email; }
    set email(email) { this._email = email; }
    get firstName() { return this._firstName; }
    set firstName(name) { this._firstName = name; }
    get lastName() { return this._lastName; }
    set lastName(name) { this._lastName = name; }
}
exports.default = User;
//# sourceMappingURL=User.js.map