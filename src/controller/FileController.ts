/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IPoint } from 'interfaces';
import { HttpException } from '../exceptions';
import {csv2json} from '../utils';
import { PostCodeService } from '../services';

/**
 *
 * The File controller
 * @category Controllers
 * @class FileController
 */
class FileController {
  /**
   *
   * Upload CSV of postodes
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - Status of the request
   * @memberof FileController
   */
  public static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.file) throw new HttpException(400, 'No file uploaded');
      const fileString = req.file.buffer.toString();
      const jsonFile = csv2json(fileString);
      jsonFile.forEach(async (point: {lat:number, lon:number}) => {
        const pointObj: IPoint = {
          type: 'Point',
          coordinates: [point.lon, point.lat]
        }
        const postcode = await PostCodeService.findNearestPostCodeByPoint(pointObj);
        if(postcode) {
          await PostCodeService.insertPointByPostCodeID(postcode._id, pointObj);
        }
      })
      res.json({
        status: 200
      });
    } catch (error: any) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  

}
export default FileController;
