"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import compression from 'compression';
const cors_1 = __importDefault(require("cors"));
// import db from './database';
// import morgan from 'morgan';
// import ErrorMiddleware from './middleware/error.middleware';
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_docs_1 = require("./utils/swagger-docs");
const morgan_1 = __importDefault(require("morgan"));
const Loggeur_1 = require("./utils/Loggeur");
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.logger = new Loggeur_1.Logger();
        // this.initialiseDatabase();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseSwagger();
    }
    initialiseMiddleware() {
        // this.express.use(helmet());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        // this.express.use(compression());
        // mine
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({
            extended: true
        }));
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
        this.express.get('/toto', (req, res) => {
            res.send('Hello World!');
        });
    }
    listen() {
        const server = this.express.listen(this.port, () => {
            console.log(`⚡️[server] : App listening on the port ${this.port}`);
        });
    }
    initialiseSwagger() {
        // Swagger page
        this.express.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_docs_1.swaggerSpec));
        console.log(`Docs available at http://localhost:${this.port}/swagger`);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map