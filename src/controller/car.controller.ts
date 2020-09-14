import { Request, Response } from 'express';
import { CarDao } from '../dao/car.dao';
import { Car } from '../model/car.interface';
import { Manufacturer } from '../model/manufacturer.interface';
import { CommonController } from './common.controller';

export class CarController {

    private commonController: CommonController;
    private carDao: CarDao;

    constructor() {
        this.commonController = new CommonController();
        this.carDao = new CarDao();
    }

    public getCars(req: Request, res: Response): void {
        this.carDao.findAll()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public getCar(req: Request, res: Response): void {
        this.carDao.findOne(req.body.id)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addCar(req: Request, res: Response): void {
        let car: Car =
        {
            id: 0,
            name: req.body.name,
            manufacturer: req.body.manufacturerID,
            version: req.body.version,
            hp: req.body.hp,
            releaseYear: req.body.releaseYear
        };


        this.carDao.addOne(car)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}