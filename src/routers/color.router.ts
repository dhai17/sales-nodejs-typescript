import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import {
     creatColor,
     deleteColor,
     getAllColor,
     updateColor,
} from '~/controller/color.controller';
import { ICreateColor, IUpdateColor } from '~/interface/request/color.request';

export const router: Router = Router();

router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const rerult = await getAllColor();
     next(rerult);
});

router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as ICreateColor;
     const rerult = await creatColor(body);
     next(rerult);
});

router.put('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as IUpdateColor;
     const rerult = await updateColor(body);
     next(rerult);
});

router.delete('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as { ids: String[] };
     const rerult = await deleteColor(body);
     next(rerult);
});
