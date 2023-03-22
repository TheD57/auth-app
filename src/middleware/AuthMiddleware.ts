import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IToken from '../model/IToken';
import token from '../model/Token';
import HttpException from './exception/HttpExeption';
async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
        
    

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorised'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: IToken | jwt.JsonWebTokenError = await token.verifyToken(
            accessToken// JWT_KEY
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default authenticatedMiddleware;