import Token from "../model/Token";
import UserDAO from "../database/DAO/UserDao";
import bcrypt from 'bcrypt';
import PgDatabase, { db } from "../database/pgDatabase";
import User from "../model/User";
class UserService {
    private userDao: UserDAO;
    constructor() {
        this.userDao = new UserDAO(db);
    }
    /**
     * Register a new user
     */
    public async register(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
    ): Promise<{ token: string, user: User }> {

        const hash = await bcrypt.hash(password, 8);
        const isUserInsert = await this.userDao.insertIfNotExistUser(firstname, lastname, email, hash);
        if (isUserInsert == false) {
            throw new Error('Unable to create user something went wrong');
        }
        const user = await this.userDao.getUser(email, password);
        if (!user) {
            throw new Error('Unable to create user something went wrong');
        }

        const token = Token.createToken(user);
        return { token, user };


    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<{ token: string, user: User }> {
        const user = await this.userDao.getUser(email, password);
        if (!user) {
            return null;
        }
        const token = Token.createToken(user);

        return { token, user };
    }
}

export default UserService;
