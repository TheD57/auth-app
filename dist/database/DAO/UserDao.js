"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserFactory_1 = require("../../model/factory/UserFactory");
const utils_1 = require("./utils");
// import db from """
class UserDAO {
    constructor(dataBaseClient) {
        this.getAllUser = () => __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users";
            const result = yield this.db.executeWithErrorHandling(query);
            const users = yield result.rows;
            return users;
        });
        this.getUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE user_email = $1`;
            const params = [email];
            const result = yield this.db.executeWithErrorHandling(query, params);
            let user = result.rows[0];
            if (user && (yield (0, utils_1.isValidPassword)(password, user.user_password))) {
                return UserFactory_1.UserFactory.sqlToModel(user);
            }
            else {
                return null;
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE id = $1`;
            const params = [id];
            const result = yield this.db.executeWithErrorHandling(query, params);
            let user = result.rows[0];
            if (user) {
                return UserFactory_1.UserFactory.sqlToModel(user);
            }
            else {
                return null;
            }
        });
        this.insertIfNotExistUser = (firstname, lastname, email, password) => __awaiter(this, void 0, void 0, function* () {
            var querySelectUserAll = `SELECT * FROM users WHERE user_email = $1;`;
            var queryInsert = `INSERT INTO users(user_first_name, user_last_name, user_email,user_password)
			 VALUES($1,$2,$3,$4);`;
            const result = yield this.db.executeWithErrorHandling(querySelectUserAll, [email]);
            if (result.rowCount > 0) {
                throw Error("error an user already exists with that user_email address" + email);
            }
            else {
                const res = yield this.db.executeWithErrorHandling(queryInsert, [firstname, lastname, email, password]);
                if (res.rowCount > 0) {
                    return true;
                }
            }
        });
        this.db = dataBaseClient;
    }
}
exports.default = UserDAO;
//# sourceMappingURL=UserDao.js.map