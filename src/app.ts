import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
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
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseSwagger();

    }

    private initialiseMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

    }

    private initialiseControllers(controllers: IController[]): void {
        controllers.forEach((controller: IController) => {
            this.express.use('/api', controller.router);
        });
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