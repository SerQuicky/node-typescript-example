import { Manufacturer } from './manufacturer.interface';

export interface Car {
    name: string,
    manufacturer: Manufacturer,
    version: number,
    hp: number,
    releaseYear: number
}