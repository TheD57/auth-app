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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HttpExeption_1 = __importDefault(require("../../middleware/exception/HttpExeption"));
const ValidatorMiddleware_1 = __importDefault(require("../../middleware/validation/ValidatorMiddleware"));
const UserValidation_1 = __importDefault(require("../../middleware/validation/validator/UserValidation"));
const AuthMiddleware_1 = __importDefault(require("../../middleware/AuthMiddleware"));
const UserService_1 = __importDefault(require("../../service/UserService"));
class UserController {
    constructor(log) {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.userService = new UserService_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, email, password, lastName } = req.body;
                this.logger.info('Execute Action Register with email: ' + email + ' password: ' + password + ' last name: ' + lastName);
                const { token, user } = yield this.userService.register(firstName, lastName, email, password);
                res.status(201).json({ "user": user, "access_token": token });
            }
            catch (error) {
                this.logger.error(error.message);
                next(new HttpExeption_1.default(500, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                this.logger.info('Execute Action Login with email: ' + email + ' password: ' + password);
                const { token, user } = yield this.userService.login(email, password);
                if (!user) {
                    this.logger.error('User not found with those email and password');
                    next(new HttpExeption_1.default(401, 'Invalid credentials'));
                }
                this.logger.debug("Token: " + token);
                this.logger.debug("User: " + user);
                res.status(200).send({ "user": user, "access_token": token });
            }
            catch (error) {
                this.logger.error(error.message);
                next(new HttpExeption_1.default(500, 'Unable to connect user ' + error.message));
            }
        });
        // private getUser = (
        //     req: Request,
        //     res: Response,
        //     next: NextFunction
        // ): Response | void => {
        //     if (!req.user) {
        //         return next(new HttpException(404, 'No logged in user'));
        //     }
        //     res.status(200).send({ data: req.user });
        // };
        this.forgotPassword = (req, res, next) => {
            if (!req) {
                return next(new HttpExeption_1.default(404, 'No logged in user'));
            }
            res.status(200).send({ data: req });
        };
        this.logger = log;
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, ValidatorMiddleware_1.default)(UserValidation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, ValidatorMiddleware_1.default)(UserValidation_1.default.login), this.login);
        // this.router.get(`${this.path}/getUser`, AuthenticatedMiddleware, this.getUser);
        this.router.get(`${this.path}/forgotPassWord`, AuthMiddleware_1.default, this.forgotPassword);
    }
}
exports.default = UserController;
//# sourceMappingURL=userCtrl.js.map