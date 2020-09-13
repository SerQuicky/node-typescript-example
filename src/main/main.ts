import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import logger from 'morgan'
import methodOverride from 'method-override'
import { Request, Response, Application } from 'express';
import { Connector } from './connector';

export class Main {

    private app: Application;
    private connector: Connector;

    constructor() {
        this.app = express();
        this.connector = new Connector();

        this.initServer();
        this.initRoutes();
    }

    private initServer(): void {
        this.app.listen(3001, () => {
            console.log('started')
        });

        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(methodOverride());
        this.app.use(cors());
    
    }

    private initRoutes(): void {
        this.app.get('/test', (req: Request, res: Response) => {
            res.status(200);
            res.json("test1");
        });
    }
}