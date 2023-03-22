import bcrypt from 'bcrypt';


export const isValidPassword = async (password: string, dbPassword : string): Promise< boolean | Error> => {
    return await bcrypt.compare(password, dbPassword);
};