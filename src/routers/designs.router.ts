import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { creat, getAllDesigns } from '~/controller/designs.controller';
import { ICreateDesigns } from '~/interface/request';

export const router: Router = Router();

router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const rerult = await getAllDesigns();
     next(rerult);
});

router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as ICreateDesigns;
     const rerult = await creat(body);
     next(rerult);
});
