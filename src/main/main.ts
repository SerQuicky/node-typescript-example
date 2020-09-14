import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import logger from 'morgan'
import methodOverride from 'method-override'
import { Request, Response, Application } from 'express';
import { Connector } from './connector';
import { ManufacturerRoutes } from '../route/manufacturer.routes';
import { CarRoutes } from '../route/car.routes';

export class Main {

    // express server and database connector
    private app: Application;
    private connector: Connector;

    // entitiy routes
    private manufacturerRoutes: ManufacturerRoutes;
    private carRoutes: CarRoutes; 

    constructor() {
        this.app = express();
        this.connector = new Connector();

        this.initServer();
        this.manufacturerRoutes = new ManufacturerRoutes(this.app);
        this.carRoutes = new CarRoutes(this.app);
    }

    private initServer(): void {
        this.app.listen(3001, () => {
            console.log('Server runs on port 3001')
        });

        // express server settings
        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(methodOverride());
        this.app.use(cors());
    
    }
}