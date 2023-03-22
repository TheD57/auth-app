"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const User_1 = __importDefault(require("../User"));
class UserFactory {
    static sqlToModel(sqlResp) {
        return new User_1.default(sqlResp.id, sqlResp.user_email, sqlResp.user_first_name, sqlResp.user_last_name, sqlResp.user_password);
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=UserFactory.js.map