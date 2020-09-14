import { Car } from '../model/car.interface';
import { CommonDao } from './common.dao';

export class CarDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public findAll(): Promise<any> {
        return this.commonDao.read("SELECT * FROM car;", {}).then(rows => {
            let cars: Car[] = [];

            for (const car of rows) {
                cars.push(
                    {
                        id: car.id,
                        name: car.name,
                        manufacturer: car.manufacturerID,
                        version: car.ver,
                        hp: car.hp,
                        releaseYear: car.releaseYear
                    });
            }

            return cars;
        })
    }

    public findOne(id: number): Promise<any> {
        return this.commonDao.read("SELECT * FROM car WHERE id = $id;", { $id: id }).then(row => {
            let car: Car =  {
                id: row[0].id,
                name: row[0].name,
                manufacturer: row[0].manufacturerID,
                version: row[0].version,
                hp: row[0].hp,
                releaseYear: row[0].releaseYear
            };

            return car;
        });
    }

    public addOne(car: Car): Promise<any> {
        let sqlRequest = "INSERT INTO car (name, manufacturerID, version, hp, releaseYear) VALUES (?, ?, ?, ?, ?)";
        return this.commonDao.write(sqlRequest, [car.name, car.manufacturer, car.version, car.hp, car.releaseYear]);
    }
}