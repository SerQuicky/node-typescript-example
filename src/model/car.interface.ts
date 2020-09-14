import { Manufacturer } from './manufacturer.interface';

export interface Car {
    id: number,
    name: string,
    manufacturer: Manufacturer,
    version: number,
    hp: number,
    releaseYear: number
}