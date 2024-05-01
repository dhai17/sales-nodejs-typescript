import { NextFunction, Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { creat, getAll } from '~/controller/size.controller';
import { ICreateColor } from '~/interface/request';

export const router: Router = Router();
router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const rerult = await getAll();
     next(rerult);
});
router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as ICreateColor;
     const rerult = await creat(body);
     next(rerult);
});
