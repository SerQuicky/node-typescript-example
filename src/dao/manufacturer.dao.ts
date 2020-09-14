import { Manufacturer } from '../model/manufacturer.interface';
import { CommonDao } from './common.dao';

export class ManufacturerDao {

    private commonDao: CommonDao;

    constructor() {
        this.commonDao = new CommonDao();
    }

    public findAll(): Promise<any> {
        return this.commonDao.read("SELECT * FROM manufacturer;", {}).then(rows => {
            let manufacturers: Manufacturer[] = [];

            for (const manu of rows) {
                manufacturers.push(
                    {
                        id: manu.id,
                        name: manu.name,
                        acronym: manu.acronym,
                        foundingYear: manu.foundingYear,
                        country: manu.country
                    });
            }

            return manufacturers;
        })
    }

    public findOne(id: number): Promise<any> {
        return this.commonDao.read("SELECT * FROM manufacturer WHERE id = $id;", { $id: id }).then(row => {
            let manufacturer: Manufacturer = {
                id: row[0].id,
                name: row[0].name,
                acronym: row[0].acronym,
                foundingYear: row[0].foundingYear,
                country: row[0].country
            };

            return manufacturer;
        });
    }

    public addOne(manu: Manufacturer): Promise<any> {
        let sqlRequest = "INSERT INTO manufacturer (name, acronym, foundingYear, country) VALUES (?, ?, ?, ?)";
        return this.commonDao.write(sqlRequest, [manu.name, manu.acronym, manu.foundingYear, manu.country]);
    }
}