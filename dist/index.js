"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const userCtrl_1 = __importDefault(require("./controler/user-controller/userCtrl"));
const Loggeur_1 = require("./utils/Loggeur");
const app = new app_1.default([new userCtrl_1.default(new Loggeur_1.Logger())], Number(8080));
app.listen();
//# sourceMappingURL=index.js.map