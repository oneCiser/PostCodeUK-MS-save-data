import { IPoint } from "../interfaces";


/**
 * @description calculate the distance between two points
 * @param {IPoint} p1 
 * @param {IPoint} p2 
 * @returns {number} the distance between two points
 */
export const distance = (p1: IPoint, p2: IPoint): number => {
    const x = p2.coordinates[0] - p1.coordinates[0];
    const y = p2.coordinates[1] - p1.coordinates[1];
    return Math.sqrt(x * x + y * y);
}