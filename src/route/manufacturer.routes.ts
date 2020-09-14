import { Request, Response, Application } from 'express';
import { ManufacturerController } from '../controller/manufacturer.controller';

export class ManufacturerRoutes {

    private app: Application;
    private manufacturerController: ManufacturerController;

    constructor(app: Application) {
        this.app = app;
        this.manufacturerController = new ManufacturerController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/manufacturers', (req: Request, res: Response) => {
            this.manufacturerController.getManufacturers(req, res);
        });

        this.app.post('/manufacturer', (req: Request, res: Response) => {
            this.manufacturerController.getManufacturer(req, res);
        });

        this.app.post('/addManufacturer', (req: Request, res: Response) => {
            this.manufacturerController.addManufacturer(req, res);
        });
    }

    


}