import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import HttpException from '../../middleware/exception/HttpExeption';
import ValidationMiddleware from '../../middleware/validation/ValidatorMiddleware';
import Validator from '../../middleware/validation/validator/UserValidation'
import AuthenticatedMiddleware from '../../middleware/AuthMiddleware'

import UserService from "../../service/UserService";
import IController from "../IController";
import { Logger } from '../../utils/Loggeur';

class UserController implements IController {
    public path = '/users';
    public router = Router();
    private userService = new UserService();
    private logger : Logger;
    constructor(log : Logger) {
        this.logger = log;
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            ValidationMiddleware(Validator.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            ValidationMiddleware(Validator.login),
            this.login
        );

        // this.router.get(`${this.path}/forgotPassWord`, AuthenticatedMiddleware, this.forgotPassword);

    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { firstName, email, password , lastName } = req.body;
            this.logger.info('Execute Action Register with email: ' + email + ' password: ' + password + ' last name: ' + lastName);

            const { token, user } = await this.userService.register(
                firstName,
                lastName,
                email,
                password,
            );
            res.status(201).json({ "user": user , "access_token":  token});
        } catch (error : any) {
            this.logger.error(error.message);
            next(new HttpException(500, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            this.logger.info('Execute Action Login with email: ' + email + ' password: ' + password);
            const { token, user } = await this.userService.login(email, password);
            if (!user) {
                this.logger.error('User not found with those email and password');
                next(new HttpException(401,'Invalid credentials'));
            }
            this.logger.debug("Token: "+ token);
            this.logger.debug("User: "+ user);
            res.status(200).send({ "user": user , "access_token":  token});
        } catch (error : any) {
            this.logger.error(error.message);
            next(new HttpException(500,'Unable to connect user ' + error.message));
        }
    };


    private forgotPassword = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        next(new HttpException(500,'Unable to connect user '));
    };

}
export default UserController;