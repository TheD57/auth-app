import App from "./app";
import UserController from "./controler/user-controller/userCtrl";
import { Logger } from "./utils/Loggeur";
import dotenv from 'dotenv'
dotenv.config();

const app = new App(
    [new UserController(new Logger())],
    Number(process.env.REACTPORT)
);

app.listen();