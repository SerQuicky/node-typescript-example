import { Request, Response, Application } from 'express';
import { CarController } from '../controller/car.controller';

export class CarRoutes {

    private app: Application;
    private carController: CarController;

    constructor(app: Application) {
        this.app = app;
        this.carController = new CarController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.app.get('/cars', (req: Request, res: Response) => {
            this.carController.getCars(req, res);
        });

        this.app.post('/car', (req: Request, res: Response) => {
            this.carController.getCar(req, res);
        });

        this.app.post('/addCar', (req: Request, res: Response) => {
            this.carController.addCar(req, res);
        });
    }
}