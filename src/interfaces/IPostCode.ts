import { Document } from 'mongoose';
import IPoint from './IPoint';

/**
 * Define a user interface to managament with mongoose
 * @category Interfaces
 * @interface IPostCode
 * @extends {Document}
 */
interface IPostCode extends Document{
    postcode: String,
    data: any
    points: IPoint[],
    nearestRadius: number,
    lat: number,
    lon: number
}
export default  IPostCode;
