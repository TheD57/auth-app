import { UserFactory } from "../../model/factory/UserFactory";
import User from "../../model/User";
import PgDatabase from "../pgDatabase";
import IUserDAO from "./interfaces/IUserDAO";
import { isValidPassword } from "./utils";
// import db from """
class UserDAO implements IUserDAO {
	db: PgDatabase;

	constructor(dataBaseClient: PgDatabase) {
		this.db = dataBaseClient;
	}

	insertUser: (user: User) => Promise<boolean>;

	getAllUser = async () => {
		const query = "SELECT * FROM users";
		const result = await this.db.executeWithErrorHandling(query);
		const users = await result.rows;
		return users;
	};

	getUser = async (email: string, password: string) => {
		const query = `SELECT * FROM users WHERE user_email = $1`
		const params = [email];
		const result = await this.db.executeWithErrorHandling(query, params);
		
		let user = result.rows[0];
		if (user && await isValidPassword(password, user.user_password)) {
			return UserFactory.sqlToModel(user);
		}
		else {
			return null;
		}
	};
	getUserById = async (id: number) => {
		const query = `SELECT * FROM users WHERE id = $1`
		const params = [id];

		const result = await this.db.executeWithErrorHandling(query, params);
		let user = result.rows[0];
		if (user){
			return UserFactory.sqlToModel(user);
		}
		else {
			return null;
		}
	};

	insertIfNotExistUser = async (firstname: string, lastname: string, email: string, password: string) => {
		var querySelectUserAll = `SELECT * FROM users WHERE user_email = $1;`;

		var queryInsert = `INSERT INTO users(user_first_name, user_last_name, user_email,user_password)
			 VALUES($1,$2,$3,$4);`;

		const result = await this.db.executeWithErrorHandling(querySelectUserAll, [email]);
		if (result.rowCount > 0) {
			throw Error("error an user already exists with that user_email address" + email);
		}
		else {
			const res = await this.db.executeWithErrorHandling(queryInsert, [firstname, lastname, email, password]);
			if (res.rowCount > 0) {
				return true;
			}
		}

	}


}
export default UserDAO;