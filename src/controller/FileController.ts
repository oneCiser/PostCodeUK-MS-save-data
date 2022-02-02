/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { HttpException } from '../exceptions';
import {csv2json} from '../utils';
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
      console.log(csv2json(fileString));
      res.json(csv2json(fileString));
    } catch (error) {
      if(error instanceof HttpException) {
        return next(new HttpException(error.status || 500, error.message));
      }
    }
  }

  

}
export default FileController;
