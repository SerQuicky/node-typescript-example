import { Request, Response } from 'express';
import { ManufacturerDao } from '../dao/manufacturer.dao';
import { Manufacturer } from '../model/manufacturer.interface';
import { CommonController } from './common.controller';

export class ManufacturerController {

    private commonController: CommonController;
    private manufacturerDao: ManufacturerDao;

    constructor() {
        this.commonController = new CommonController();
        this.manufacturerDao = new ManufacturerDao();
    }

    public getManufacturers(req: Request, res: Response): void {
        this.manufacturerDao.findAll()
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public getManufacturer(req: Request, res: Response): void {
        this.manufacturerDao.findOne(req.body.id)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }

    public addManufacturer(req: Request, res: Response): void {
        let manu: Manufacturer =
        {
            id: 0,
            name: req.body.name,
            acronym: req.body.acronym,
            foundingYear: req.body.foundingYear,
            country: req.body.country
        }

        this.manufacturerDao.addOne(manu)
            .then(this.commonController.findSuccess(res))
            .catch(this.commonController.serverError(res));
    }
}