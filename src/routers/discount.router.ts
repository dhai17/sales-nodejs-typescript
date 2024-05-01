import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import {
     createDiscount,
     deleteDiscount,
     getAllDiscount,
     updateDiscount,
} from '~/controller/discount.controller';
import { ICreatDiscount, IUpdateDiscount } from '~/interface/request';

export const router: Router = Router();
router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const rerult = await getAllDiscount();
     next(rerult);
});
router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as ICreatDiscount;
     const rerult = await createDiscount(body);
     next(rerult);
});
router.put('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as IUpdateDiscount;
     const rerult = await updateDiscount({ ...body });
     next(rerult);
});
router.delete('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as { ids: string[] };
     const rerult = await deleteDiscount({ ...body });
     next(rerult);
});
