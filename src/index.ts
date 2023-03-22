import App from "./app";
import UserController from "./controler/user-controller/userCtrl";
import { Logger } from "./utils/Loggeur";

const app = new App(
    [new UserController(new Logger())],
    Number(8080)
);

app.listen();