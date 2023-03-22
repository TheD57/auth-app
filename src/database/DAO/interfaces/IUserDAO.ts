import User from "../../../model/User";

interface IUserDAO {
	getUser: (email: string, password: string) => Promise<User>;
    insertUser : (user: User) => Promise<boolean>;
}

export default IUserDAO;