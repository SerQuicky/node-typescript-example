import { Database } from 'sqlite3'

export class Connector {

    private database: Database;

    constructor() {
        this.database = new Database('./sqlite.db', async (err) => {
            if (err) {
                console.error(err.message);
            }

            await this.createTables();
            await this.addEntries();
        })
    }

    private createTables(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            await this.executeRequest("CREATE TABLE if not exists manufacturer (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " acronym TEXT," +
                " foundingYear INTEGER," +
                " country TEXT " +
                ")");

            await this.executeRequest("CREATE TABLE if not exists car (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " name TEXT," +
                " manufacturerID INTEGER," +
                " version INTEGER," +
                " hp INTEGER," +
                " releaseYear INTEGER," +
                " FOREIGN KEY(manufacturerID) REFERENCES manufacturer(id) " +
                ")");

            resolve();
        });
    }

    private addEntries(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this.executeRequest("INSERT INTO manufacturer (name, acronym, foundingYear, country) VALUES ('Volkswagen', 'VW', 1937, 'Germany'), " +
                                     "('Bayerische Motoren Werke', 'BWM', 1916, 'Germany') ");
                                
            await this.executeRequest("INSERT INTO car (name, manufacturerID, version, hp, releaseYear) VALUES ('Golf', 1, 1, 120, 1996)");

            resolve();
        });
    }

    private executeRequest(request: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.run(request, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}