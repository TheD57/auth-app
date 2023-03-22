import User from "../User";

export class UserFactory {

    public static sqlToModel( sqlResp :any ) : User{
        return new User(sqlResp.id,sqlResp.user_email, sqlResp.user_first_name, sqlResp.user_last_name, sqlResp.user_password);
    }
}