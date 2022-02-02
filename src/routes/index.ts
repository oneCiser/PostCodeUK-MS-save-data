import { Router } from 'express';
import UserRouter from './file.route';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/postcodes`, UserRouter);

export default router;
