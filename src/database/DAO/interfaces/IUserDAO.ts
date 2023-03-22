import User from "../../../model/User";

interface IUserDAO {
	getAllUser: () => Promise<User[]>;
	getUser: (email: string, password: string) => Promise<User>;
    insertUser : (user: User) => Promise<boolean>;
}

export default IUserDAO;