import {
  NextFunction, Request, Response, Router,
} from 'express';
import multer from 'multer';
import {FileController} from '../controller';


/**
 *
 * Managament the routes of user
 * @category Routes
 * @class FileRouter
 * @implements {IRoute}
 */
class FileRouter{
  public router = Router();

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

    this.router.post('/upload',
    multer().single('file'),
    (req: Request, res: Response, next: NextFunction) => FileController.upload(req, res, next)
    );

   
  }
}
export default new FileRouter().router;
