import jwt from 'jsonwebtoken';
import IToken from './IToken';
import User from './User';

export const createToken = (user: User): string => {
    return jwt.sign({ id: user.id }, "foo" as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            "foo" as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as IToken);
            }
        );
    });
};

export default { createToken, verifyToken };