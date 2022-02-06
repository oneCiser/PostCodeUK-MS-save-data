import axios from 'axios';
import {IResponseAPI, IPoint}  from '../interfaces';


/**
 * @description: This class is responsible for consuming the API
 * @category Services
 * @class APIConsumeServices
 */
class APIConsumeServices {


    /**
     * @description This method is responsible for consuming the API
     * @param {IPoint} point
     * @returns {Promise<IPostCode>} return the postcode and the nearest postcode of the first postcode
     * @memberof APIConsumeServices
     */
    async getPostCodeByPoint(point: IPoint): Promise<IResponseAPI | null> {
        return new Promise<IResponseAPI | null>(async (resolve, reject) => {
            axios.get(`${process.env.MS_CONSUME_API}${point.coordinates[0]}/${point.coordinates[1]}`)
            .then((response: any) => {
                const data: IResponseAPI = response.data;
                resolve(data);
            })
            .catch(err => reject(err));
            
        });
    }
}

export default new APIConsumeServices();