import { Response } from 'express';


export class CommonController {

    constructor(){}

    public findSuccess(res: Response) {
        return (result: any) => {
            res.status(200);
            res.json(result);
        }
    }

    public serverError(res: Response) {
        return (error: any) => {
            res.status(500);
            res.json(error);
        }
    }
    
}