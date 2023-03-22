import express, { Application } from 'express';
// import compression from 'compression';
import cors from 'cors';
// import db from './database';
// import morgan from 'morgan';
// import ErrorMiddleware from './middleware/error.middleware';
import bodyParser from 'body-parser';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// to secure
// import helmet from 'helmet';

import http from 'http';
import IController from './controler/IController';
import { swaggerSpec } from './utils/swagger-docs';
import morgan from 'morgan';
import { Logger } from './utils/Loggeur';

class App {
    public express: Application;
    public port: number;
    public logger: Logger;
    public server: any;

    constructor(controllers: IController[], port: number) {
        this.express = express();
        this.port = port;
        this.logger = new Logger();
        // this.initialiseDatabase();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseSwagger();

    }

    private initialiseMiddleware(): void {
        // this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        // this.express.use(compression());
        // mine
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

    }

    private initialiseControllers(controllers: IController[]): void {
        controllers.forEach((controller: IController) => {
            this.express.use('/api', controller.router);
        });
        this.express.get('/toto', (req, res) => {
            res.send('Hello World!');
        })
    }

    public listen(): void {
        const server = this.express.listen(this.port, () => {
            console.log(`⚡️[server] : App listening on the port ${this.port}`);
        });
    }

    public initialiseSwagger(): void {
        // Swagger page
        this.express.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec),);


        console.log(`Docs available at http://localhost:${this.port}/swagger`);
    }

}




export default App;