/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IPoint, IPostCode, IResponseAPI } from '../interfaces';
import { HttpException } from '../exceptions';
import {csv2json, distance} from '../utils';
import { PostCodeService, APIConsumeServices } from '../services';

/**
 *
 * The File controller
 * @category Controllers
 * @class FileController
 */
class FileController {
  /**
   *
   * Upload CSV of postodes a save the points with the postcode
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
      let result: IPostCode[] = [];
      for (let index = 0; index < jsonFile.length; index++) {
        const point = jsonFile[index];
        const pointObj: IPoint = {
          type: 'Point',
          coordinates: [point.lon, point.lat]
        }
        const postcode = await PostCodeService.findNearestPostCodeByPoint(pointObj);
        if(postcode) {
          const pc = await PostCodeService.insertPointByPostCodeID(postcode._id, pointObj);
          if(pc) result.push(pc);
          
        }
        else{
          const responseAPI = await APIConsumeServices.getPostCodeByPoint(pointObj);
          if(!responseAPI) throw new HttpException(400, 'Bad request');

          const {postcode, nearest} = responseAPI;
          const postcodeLocation: IPoint = {
            type: 'Point',
            coordinates: [postcode.longitude, postcode.latitude]
          }
          postcode.location = postcodeLocation;
          if(nearest){
            const nearestLocation: IPoint = {
              type: 'Point',
              coordinates: [nearest.longitude, nearest.latitude]
            }
            const radiusDistance = distance(postcodeLocation, nearestLocation);
            postcode.nearestRadius = radiusDistance;
            nearest.nearestRadius = radiusDistance;
          }


          postcode.points = [pointObj];
          
          const pc = await PostCodeService.create(postcode);
          result.push(pc);

        
        }
      }
      res.json({
        status: 200,
        result
      });
    } catch (error: any) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  

}
export default FileController;
